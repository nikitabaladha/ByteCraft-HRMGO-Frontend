import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";

const DataTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const totalBalance = accounts
    .reduce((sum, account) => sum + account.initial_balance, 0)
    .toFixed(2);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredAccounts = accounts.filter((account) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      account.account_name.toLowerCase().includes(searchTerm) ||
      account.initial_balance.toString().toLowerCase().includes(searchTerm) ||
      totalBalance.toString().toLowerCase().includes(searchTerm)
    );
  });

  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAPI(`/getAccount-Name-Balance`, {}, true);
        console.log("API Response:", response.data);

        if (response.data.message === "Accounts fetched successfully") {
          setAccounts(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="dataTable-top">
            <div className="dataTable-dropdown d-none d-md-block">
              <label className="text-dark">
                <select
                  className="dataTable-selector"
                  value={entriesPerPage}
                  onChange={handleEntriesPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                </select>{" "}
                entries per page
              </label>
            </div>
            <div className="dataTable-search">
              <input
                className="dataTable-input"
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-container">
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th data-sortable="">
                          <Link
                            to="#"
                            className="dataTable-sorter text dark"
                            style={{ color: "black" }}
                          >
                            Account Name
                          </Link>
                        </th>
                        <th width="200px" data-sortable="">
                          <Link
                            to="#"
                            className="dataTable-sorter text dark"
                            style={{ color: "black" }}
                          >
                            Initial Balance
                          </Link>
                        </th>
                      </tr>
                    </thead>
                   
                    <tbody>
                      {paginatedAccounts.map((account, index) => (
                        <tr key={index}>
                          <td className="text-dark">{account.account_name}</td>
                          <td className="text-dark">{`₹${new Intl.NumberFormat("en-IN").format(
                            account.initial_balance
                          )}`}</td>
                        </tr>
                      ))}
                      <tr>
                        <td className="text-left text-dark">Total</td>
                        <td className="text-dark">{`₹${new Intl.NumberFormat("en-IN").format(
                          totalBalance
                        )}`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="dataTable-bottom">
              <div className="dataTable-info d-none d-md-block text-dark">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  accounts.length
                )}{" "}
                to {Math.min(currentPage * entriesPerPage, accounts.length)} of{" "}
                {accounts.length} entries
              </div>
              <nav className="dataTable-pagination">
                <ul className="dataTable-pagination-list">
                  {currentPage > 1 && (
                    <li className="page-item">
                      <button
                        className="page-link prev-button"
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        ‹
                      </button>
                    </li>
                  )}

                  {Array.from(
                    { length: Math.ceil(accounts.length / entriesPerPage) },
                    (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                          style={{
                            backgroundColor:
                              currentPage === index + 1
                                ? "#d9d9d9"
                                : "transparent",
                            color: "#6FD943",
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}

                  {currentPage <
                    Math.ceil(accounts.length / entriesPerPage) && (
                    <li className="page-item">
                      <button
                        className="page-link next-button"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        ›
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

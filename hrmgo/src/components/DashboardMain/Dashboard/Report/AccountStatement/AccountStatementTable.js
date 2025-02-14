import React, { useState } from "react";

const AccountStatementTable = ({ transactions }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTransactions = transactions
    .map((account) => ({
      ...account,
      transactions: account.transactions.filter((transaction) => {
        const searchTerm = searchQuery.toLowerCase();
        const formattedDate = new Date(transaction.date)
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
          .toLowerCase();

        return (
          transaction.account_name.toLowerCase().includes(searchTerm) ||
          transaction.amount.toString().includes(searchTerm) ||
          formattedDate.includes(searchTerm)
        );
      }),
    }))
    .filter((account) => account.transactions.length > 0);

  const paginatedTransactions = filteredTransactions
    .flatMap((account) => account.transactions)
    .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-top">
                  <div className="dataTable-dropdown">
                    <label>
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
                <div className="dataTable-container">
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>Date</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTransactions.map(
                        (transaction, transactionIndex) => (
                          <tr key={transactionIndex}>
                            <td>{transaction.account_name}</td>
                            <td>
                              {new Date(transaction.date).toLocaleDateString(
                                "en-IN",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </td>
                            <td>{`₹${transaction.amount.toLocaleString(
                              "en-IN"
                            )}`}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      filteredTransactions.length
                    )}{" "}
                    to{" "}
                    {Math.min(
                      currentPage * entriesPerPage,
                      filteredTransactions.length
                    )}{" "}
                    of {filteredTransactions.length} entries
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
                        {
                          length: Math.ceil(
                            filteredTransactions.length / entriesPerPage
                          ),
                        },
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
                        Math.ceil(
                          filteredTransactions.length / entriesPerPage
                        ) && (
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
      </div>
    </div>
  );
};

export default AccountStatementTable;

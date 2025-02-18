import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../../ConfirmationDialog.js";
// import { Link } from "react-router-dom";
// import getAPI from "../../../../api/getAPI.js";
// import { HiOutlinePencil } from "react-icons/hi";
// import { RiDeleteBinLine } from "react-icons/ri";
import AccountUpdateModal from "./AccountUpdateModal.js";

const ManageAccount = ({ accounts, setAccounts, fetchAccounts }) => {
  // const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(null);
  // const [selectedAccount, setSelectedAccount] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredAccounts = accounts.filter((account) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      account.account_name.toLowerCase().includes(searchTerm) ||
      account.account_number.toString().toLowerCase().includes(searchTerm) ||
      account.branch_code.toLowerCase().toLowerCase().includes(searchTerm) ||
      account.bank_branch.toLowerCase().includes(searchTerm) ||
      account.initial_balance.toString().toLowerCase().includes(searchTerm)
    );
  });

  const paginatedAccounts = filteredAccounts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openDeleteDialog = (accountId) => {
    setAccountToDelete(accountId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setAccountToDelete(null);
  };

  const handleDeleteSuccess = (deletedAccountId) => {
    setAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account._id !== deletedAccountId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (account) => {
    setSelectedAccount(account);
    fetchAccounts();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
                  <table className="table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Account Name</th>
                        <th>Initial Balance</th>
                        <th>Account Number</th>
                        <th>Branch Code</th>
                        <th>Bank Branch</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAccounts.map((account) => (
                        <tr key={account._id}>
                          <td>{account.account_name}</td>
                          <td>{`₹${new Intl.NumberFormat("en-IN").format(
                            account.initial_balance
                          )}`}</td>
                          <td>{account.account_number}</td>
                          <td>{account.branch_code}</td>
                          <td>{account.bank_branch}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEdit(account)}
                                    className="mx-3 btn btn-sm align-items-center"
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      {/* <HiOutlinePencil /> */}
                                      <i className="ti ti-pencil"></i>
                                    </span>
                                  </button>
                                </div>
                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() =>
                                      openDeleteDialog(account._id)
                                    }
                                    className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                  >
                                    <span className="text-white">
                                      {/* <RiDeleteBinLine /> */}
                                      <i className="ti ti-trash"></i>
                                    </span>
                                  </button>
                                </div>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      accounts.length
                    )}{" "}
                    to {Math.min(currentPage * entriesPerPage, accounts.length)}{" "}
                    of {accounts.length} entries
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
      </div>
      <AccountUpdateModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        accountData={selectedAccount}
        fetchAccounts={fetchAccounts}
      />

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={accountToDelete}
          deleteType="account"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default ManageAccount;

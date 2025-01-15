
// import React, { useEffect, useState } from "react";
// // import axios from "axios"; // Import axios
// import { Link } from "react-router-dom";
// import deleteAPI from "../../../../api/deleteAPI.js";
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
// import getAPI from "../../../../api/getAPI.js";
// import { HiOutlinePencil } from "react-icons/hi";
// import { RiDeleteBinLine } from "react-icons/ri";
// import AccountUpdateModal from "./AccountUpdateModal"; // Import the modal component

// const ManageAccount = () => {
//   const [accounts, setAccounts] = useState([]); // State to store account data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [selectedAccount, setSelectedAccount] = useState(null); // For storing the account data to edit
//   const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

//   // Fetch accounts from backend API
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await getAPI(`/AccountList-get-all`, {}, true);
//         setAccounts(response.data.data); // Assuming response format includes `data` object
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch accounts.");
//         setLoading(false);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Handle edit button click
//   const handleEdit = (account) => {
//     setSelectedAccount(account); // Set the selected account to edit
//     setIsModalOpen(true); // Open the modal
//   };

//   // Handle modal close
//   const handleCloseModal = () => {
//     setIsModalOpen(false); // Close the modal

//   };
//   const handleDelete = async (accountId) => {
//     if (window.confirm("Are you sure you want to delete this account?")) {
//       try {
//         // Make the DELETE API call
//         await deleteAPI(`/delete-AccountList/${accountId}`, {}, true); // Replace with your API endpoint

//         // Update the state to remove the deleted account
//         setAccounts((prevAccounts) =>
//           prevAccounts.filter((account) => account._id !== accountId)
//         );

//         // Show success toast
//         toast.success("Account deleted successfully!");
//       } catch (err) {
//         console.error(err);

//         // Show error toast
//         toast.error("Failed to delete account. Please try again.");
//       }
//     }
//   };


//   return (
//     <div className="dash-content">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-header card-body table-border-style">
//               <div className="table-responsive">
//                 <table className="table" id="pc-dt-simple">
//                   <thead>
//                     <tr>
//                       <th>Account Name</th>
//                       <th>Initial Balance</th>
//                       <th>Account Number</th>
//                       <th>Branch Code</th>
//                       <th>Bank Branch</th>
//                       <th width="200px">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {accounts.map((account) => (
//                       <tr key={account._id}>
//                         <td>{account.account_name}</td>
//                         <td>${account.initial_balance.toFixed(2)}</td>
//                         <td>{account.account_number}</td>
//                         <td>{account.branch_code}</td>
//                         <td>{account.bank_branch}</td>
//                         <td className="Action">
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-info me-2">
//                                 <button
//                                   onClick={() => handleEdit(account)} // Open modal for editing this account
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="Edit"
//                                 >
//                                   <span className="text-white">
//                                     <HiOutlinePencil />
//                                   </span>
//                                 </button>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <button
//                                   onClick={() => handleDelete(account._id)}
//                                   className="mx-3 btn btn-sm align-items-center bs-pass-para"
//                                   data-bs-toggle="tooltip"
//                                   title="Delete"

//                                 >
//                                   <span className="text-white">
//                                     <RiDeleteBinLine />
//                                   </span>
//                                 </button>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for updating account */}
//       <AccountUpdateModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         accountData={selectedAccount}
//       />
//        {/* ToastContainer for showing notifications */}
//     <ToastContainer />
//     </div>
//   );
// };

// export default ManageAccount;

import React, {  useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "../../ConfirmationDialog.js";
// import { Link } from "react-router-dom";
// import getAPI from "../../../../api/getAPI.js";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import AccountUpdateModal from "./AccountUpdateModal.js";

const ManageAccount = ({accounts,setAccounts,fetchAccounts}) => {
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
                          <td>{`₹${new Intl.NumberFormat('en-IN').format(account.initial_balance)}`}</td>
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
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>
                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() => openDeleteDialog(account._id)}
                                    className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                  >
                                    <span className="text-white">
                                      <RiDeleteBinLine />
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, accounts.length)}{" "}
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

                      {Array.from({ length: Math.ceil(accounts.length / entriesPerPage) }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                              backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                              color: '#6FD943',
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      {currentPage < Math.ceil(accounts.length / entriesPerPage) && (
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

      <ToastContainer />
    </div>
  );
};

export default ManageAccount;


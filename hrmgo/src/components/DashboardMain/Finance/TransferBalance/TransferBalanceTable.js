import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditTransferBalanceModal from "./EditTransferBalanceModal";
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";

const TransferBalanceTable = () => {
  const [transferBalances, setTransferBalances] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transferBalanceToDelete, setTransferBalanceToDelete] = useState(null);
  const [selectedTransferBalance, setSelectedTransferBalance] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTransferBalances = transferBalances.filter((transferBalance) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(transferBalance.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).toLowerCase();
    return (
      transferBalance.fromAccountId.toLowerCase().includes(searchTerm) ||
      transferBalance.toAccountId.toLowerCase().includes(searchTerm) ||
      transferBalance.paymentTypeId.toLowerCase().includes(searchTerm) ||
      transferBalance.amount.toString().toLowerCase().includes(searchTerm) ||
      transferBalance.referalId.toString().toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedTransferBalances = filteredTransferBalances.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const openDeleteDialog = (transferBalanceId) => {
    setTransferBalanceToDelete(transferBalanceId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTransferBalanceToDelete(null);
  };

  const handleDeleteSuccess = (deletedTransferBalanceId) => {
    setTransferBalances((prevBalances) =>
      prevBalances.filter((balance) => balance._id !== deletedTransferBalanceId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (transferBalance) => {
    setSelectedTransferBalance(transferBalance);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTransferBalances = async () => {
      try {
        const response = await getAPI("/getall_transferbalance", {}, true);
        setTransferBalances(response.data.data);
        ;
      } catch (err) {
        console.log("Failed to fetch transfer balances");

      }
    };

    fetchTransferBalances();
  }, []);



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
                        <th>From Account</th>
                        <th>To Account</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Ref#</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTransferBalances.map((transferBalance) => (
                        <tr key={transferBalance._id}>
                          <td>{transferBalance.fromAccountId}</td>
                          <td>{transferBalance.toAccountId}</td>
                          <td>
                            {new Date(transferBalance.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td>{`₹${new Intl.NumberFormat("en-IN").format(transferBalance.amount)}`}</td>
                          <td>{transferBalance.paymentTypeId}</td>
                          <td>{transferBalance.referalId}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEdit(transferBalance)}
                                    className="mx-3 btn btn-sm align-items-center"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() => openDeleteDialog(transferBalance._id)}
                                    type="submit"
                                    className="mx-3 btn btn-sm align-items-center"
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, transferBalances.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, transferBalances.length)}{" "}
                    of {transferBalances.length} entries
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

                      {Array.from({ length: Math.ceil(transferBalances.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(transferBalances.length / entriesPerPage) && (
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

      {isModalOpen && (
        <EditTransferBalanceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedTransferBalance={selectedTransferBalance}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={transferBalanceToDelete}
          deleteType="transferbalance"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default TransferBalanceTable;

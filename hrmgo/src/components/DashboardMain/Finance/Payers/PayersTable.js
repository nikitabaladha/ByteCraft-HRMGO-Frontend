import React, { useState } from "react";
import EditPayerModal from "./EditPayerModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const PayersTable = ({payers, setPayers, fetchPayers}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayer, setSelectedPayer] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payerToDelete, setPayerToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPayers = payers.filter((payer) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      payer.payer_name.toLowerCase().includes(searchTerm) ||
      payer.contact_number.toString().toLowerCase().includes(searchTerm)
    );
  });

  const paginatedPayers = filteredPayers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openModal = (payee) => {
    setSelectedPayer(payee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayer(null);
  };

  const openDeleteDialog = (payerId) => {
    setPayerToDelete(payerId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPayerToDelete(null);
  };

  const handleDeleteSuccess = (deletedPayerId) => {
    setPayers((prevPayers) =>
      prevPayers.filter((payer) => payer._id !== deletedPayerId)
    );
    closeDeleteDialog();
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
        <div className="dataTable-top">
                  <div className="dataTable-dropdown d-none d-md-block">
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
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
               
                <div className="dataTable-container">
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Payer Name</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayers.map((payer) => (
                        <tr key={payer._id}>
                          <td>{payer.payer_name}</td>
                          <td>{payer.contact_number}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => openModal(payer)}
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
                                    // onClick={() => handleDelete(payer._id)}
                                    onClick={() => openDeleteDialog(payer._id)}
                                    type="submit"
                                    className="mx-3 btn btn-sm align-items-center"
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
                
              </div>
            </div>
            <div className="dataTable-bottom">
                  <div className="dataTable-info d-none d-md-block">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      payers.length
                    )}{" "}
                    to {Math.min(currentPage * entriesPerPage, payers.length)}{" "}
                    of {payers.length} entries
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
                        { length: Math.ceil(payers.length / entriesPerPage) },
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
                        Math.ceil(payers.length / entriesPerPage) && (
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

      {isModalOpen && (
        <EditPayerModal payer={selectedPayer} closeModal={closeModal} fetchPayers={fetchPayers}/>
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={payerToDelete}
          deleteType="payer"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default PayersTable;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import EditLoanOptionModal from "./EditLoanOptionModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const LoanOptionTable = ({ loanOptions, setLoanOptions, fetchLoanOptions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanOption, setSelectedLoanOption] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loanOptionToDelete, setLoanOptionToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredLoanOptions = loanOptions.filter((loanOption) => {
    const searchTerm = searchQuery.toLowerCase();
    return loanOption.loanName.toLowerCase().includes(searchTerm);
  });

  const paginatedLoanOptions = filteredLoanOptions.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openDeleteDialog = (loanOptionId) => {
    setLoanOptionToDelete(loanOptionId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setLoanOptionToDelete(null);
  };

  const handleDeleteSuccess = (deletedLoanOptionId) => {
    setLoanOptions((prevLoanOptions) =>
      prevLoanOptions.filter(
        (loanOption) => loanOption._id !== deletedLoanOptionId
      )
    );
    closeDeleteDialog();
  };

  const handleEdit = (loanOption) => {
    setSelectedLoanOption(loanOption);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoanOption(null);
  };

  return (
    <div className="row">
       <div className="col-md-3 col-12">
  <Sidebar />
</div>


      <div className="col-md-9 col-12">
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
          <div className="card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-container">
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th data-sortable="">Loan Option</th>
                        <th width="200px" data-sortable="">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedLoanOptions.map((loanOption) => (
                        <tr key={loanOption._id}>
                          <td className="text-dark">{loanOption.loanName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(loanOption)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      {/* <HiOutlinePencil /> */}
                                      <i className="ti ti-pencil text-white"></i>
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form
                                    method="POST"
                                    
                                    acceptCharset="UTF-8"
                                    id={`delete-form`}
                                  >
                                    <input
                                      name="_method"
                                      type="hidden"
                                      value="DELETE"
                                    />
                                    <input
                                      name="_token"
                                      type="hidden"
                                      value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv"
                                    />
                                    <Link
                                      onClick={() =>
                                        openDeleteDialog(loanOption._id)
                                      }
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <span className="text-white">
                                        {/* <RiDeleteBinLine /> */}
                                        <i className="ti ti-trash text-white"></i>
                                      </span>
                                    </Link>
                                  </form>
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
              <div className="dataTable-info d-none d-md-block text-dark">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  loanOptions.length
                )}{" "}
                to {Math.min(currentPage * entriesPerPage, loanOptions.length)}{" "}
                of {loanOptions.length} entries
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
                    { length: Math.ceil(loanOptions.length / entriesPerPage) },
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
                    Math.ceil(loanOptions.length / entriesPerPage) && (
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
        <EditLoanOptionModal
          closeModal={handleCloseModal}
          loanOption={selectedLoanOption}
          fetchLoanOptions={fetchLoanOptions}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={loanOptionToDelete}
          deleteType="loanOption"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default LoanOptionTable;

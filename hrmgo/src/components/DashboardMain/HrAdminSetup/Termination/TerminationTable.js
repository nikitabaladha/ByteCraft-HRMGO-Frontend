import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateTerminationModal from "./UpdateTerminationModal";

import { FaComment } from "react-icons/fa";
import TerminationDescriptionModal from "./TerminationDescriptionModal";
import { formatDate } from "../../../../js/custom";
import ConfirmationDialog from "../../ConfirmationDialog";
const TerminationTable = ({
  terminations,
  setTerminations,
  selectedTermination,
  setSelectedTermination,
  updateTermination,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTerminations = terminations.filter((termination) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(termination.noticeDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    const Terminationdate = new Date(termination.terminationDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      termination.employeeName.toLowerCase().includes(searchTerm) ||
      termination.terminationType.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      Terminationdate.includes(searchTerm)
    );
  });

  const paginatedTerminations = filteredTerminations.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleUpdate = (termination) => {
    setSelectedTermination(termination);
    setIsUpdateModalOpen(true);
  };

  const handleDescription = (termination) => {
    setSelectedTermination(termination);
    setIsDescriptionModalOpen(true);
  };

  const openDeleteDialog = (termination) => {
    setSelectedTermination(termination);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTermination(null);
  };

  const handleDeleteConfirmed = (id) => {
    setTerminations((prevTerminations) =>
      prevTerminations.filter((terminations) => terminations.id !== id)
    );
  };

  return (
    <>
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
                          <th>Employee Name</th>
                          <th>Termination Type</th>
                          <th>Notice Date</th>
                          <th>Termination Date</th>
                          <th>Description</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTerminations.map((termination) => (
                          <tr key={termination.id}>
                            <td>{termination.employeeName}</td>
                            <td>{termination.terminationType}</td>
                            <td>{formatDate(termination.noticeDate)}</td>
                            <td>{formatDate(termination.terminationDate)}</td>

                            <div className="dt-buttons">
                              <div className="action-btn bg-warning">
                                <Link
                                  className="mx-3 btn btn-sm  align-items-center"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-title="Desciption"
                                  data-bs-original-title="Desciption"
                                  aria-label="Desciption"
                                  onClick={() => handleDescription(termination)}
                                >
                                  <span className="text-white">
                                    <FaComment className="icon_desc fa fa-comment" />
                                  </span>
                                </Link>
                              </div>
                            </div>

                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      className="mx-3 btn btn-sm  align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title=""
                                      data-title="Edit Termination"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(termination)}
                                    >
                                      <span className="text-white">
                                        <TbPencil />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <form
                                      method="POST"
                                      acceptCharset="UTF-8"
                                      id={`delete-form-${termination.id}`}
                                      onSubmit={(e) => e.preventDefault()}
                                    >
                                      <input
                                        name="_method"
                                        type="hidden"
                                        defaultValue="DELETE"
                                      />
                                      <Link
                                        href="#"
                                        className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                        data-bs-toggle="tooltip"
                                        title=""
                                        data-bs-original-title="Delete"
                                        aria-label="Delete"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          openDeleteDialog(termination);
                                        }}
                                      >
                                        <span className="text-white">
                                          <FaRegTrashAlt />
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
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing{" "}
                      {Math.min(
                        (currentPage - 1) * entriesPerPage + 1,
                        terminations.length
                      )}{" "}
                      to{" "}
                      {Math.min(
                        currentPage * entriesPerPage,
                        terminations.length
                      )}{" "}
                      of {terminations.length} entries
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
                              terminations.length / entriesPerPage
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
                          Math.ceil(terminations.length / entriesPerPage) && (
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
      {isUpdateModalOpen && setTerminations && (
        <UpdateTerminationModal
          termination={selectedTermination}
          onClose={() => setIsUpdateModalOpen(false)}
          updateTermination={updateTermination}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedTermination && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="termination"
          id={selectedTermination.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {isDescriptionModalOpen && (
        <TerminationDescriptionModal
          termination={selectedTermination}
          onClose={() => setIsDescriptionModalOpen(false)}
        />
      )}
    </>
  );
};

export default TerminationTable;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateResignationModal from "./UpdateResignationModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const ResignationTable = ({
  resignations,
  setResignations,
  selectedResignation,
  setSelectedResignation,
  updateResignation,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredResignations = resignations.filter((resignation) => {
    const searchTerm = searchQuery.toLowerCase();
    const resignationDate = new Date(resignation.resignationDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();

    const shortLastWorkingDay = new Date(resignation.lastWorkingDay)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      resignation?.employeeName?.toLowerCase().includes(searchTerm) ||
      resignation?.reason?.toLowerCase().includes(searchTerm) ||
      resignationDate.includes(searchTerm) ||
      shortLastWorkingDay.includes(searchTerm)
    );
  });

  // const filteredResignations = resignations.filter((resignation) => {
  //   const searchTerm = searchQuery.toLowerCase();

  //   const employeeName = resignation.employeeName?.toLowerCase() || "";
  //   const reason = resignation.reason?.toLowerCase() || "";
  //   const formattedDate = resignation.resignationDate
  //     ? new Date(resignation.resignationDate)
  //         .toLocaleDateString("en-US", {
  //           year: "numeric",
  //           month: "short",
  //           day: "numeric",
  //         })
  //         .toLowerCase()
  //     : "";
  //   const shortLastWorkingDay = resignation.lastWorkingDay
  //     ? new Date(resignation.lastWorkingDay)
  //         .toLocaleDateString("en-US", {
  //           year: "numeric",
  //           month: "short",
  //           day: "numeric",
  //         })
  //         .toLowerCase()
  //     : "";

  //   return (
  //     employeeName.includes(searchTerm) ||
  //     reason.includes(searchTerm) ||
  //     formattedDate.includes(searchTerm) ||
  //     shortLastWorkingDay.includes(searchTerm)
  //   );
  // });

  const paginatedResignations = filteredResignations.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const handleUpdate = (resignation) => {
    setSelectedResignation(resignation);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (resignation) => {
    setSelectedResignation(resignation);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedResignation(null);
  };

  const handleDeleteConfirmed = (id) => {
    setResignations((prevResignations) =>
      prevResignations.filter((resignation) => resignation.id !== id)
    );
  };

  return (
    <>
      {" "}
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
                          <th>Employee</th>
                          <th>Resignation Date</th>
                          <th>Last Working Day</th>
                          <th>Reason</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedResignations.map((resignation) => (
                          <tr key={resignation.id}>
                            <td>{resignation.employeeName}</td>
                            <td>{formatDate(resignation.resignationDate)}</td>
                            <td>{formatDate(resignation.lastWorkingDay)}</td>
                            <td>{resignation.reason}</td>
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
                                      data-title="Edit Resignation"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(resignation)}
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
                                      id={`delete-form-${resignation.id}`}
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
                                          openDeleteDialog(resignation);
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
                        resignations.length
                      )}{" "}
                      to{" "}
                      {Math.min(
                        currentPage * entriesPerPage,
                        resignations.length
                      )}{" "}
                      of {resignations.length} entries
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
                              resignations.length / entriesPerPage
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
                          Math.ceil(resignations.length / entriesPerPage) && (
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
      {isUpdateModalOpen && setResignations && (
        <UpdateResignationModal
          resignation={selectedResignation}
          onClose={() => setIsUpdateModalOpen(false)}
          updateResignation={updateResignation}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedResignation && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="resignation"
          id={selectedResignation.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ResignationTable;

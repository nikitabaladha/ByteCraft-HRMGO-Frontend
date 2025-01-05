import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateComplaintModal from "./UpdateComplaintModal";
import ConfirmationDialog from "../../ConfirmationDialog";

import { formatDate } from "../../../../Js/custom.js";

const ComplaintTable = ({
  complaints,
  selectedComplaint,
  setSelectedComplaint,
  setComplaints,
  updateComplaint,
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

  const filteredComplaints = complaints.filter((complaint) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(complaint.complaintDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).toLowerCase();
    return (
      complaint.complaintFrom.toLowerCase().includes(searchTerm) ||
      complaint.complaintAgainst.toLowerCase().includes(searchTerm) ||
      complaint.title.toLowerCase().includes(searchTerm) ||
      complaint.description.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );




  const handleUpdate = (complaint) => {
    setSelectedComplaint(complaint);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedComplaint(null);
  };

  const handleDeleteConfirmed = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== id)
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
                          <th>Complaint From</th>
                          <th>Complaint Against</th>
                          <th>Title</th>
                          <th>Complaint Date</th>
                          <th>Description</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedComplaints.map((complaint) => (
                          <tr key={complaint.id}>
                            <td>{complaint.complaintFrom}</td>
                            <td>{complaint.complaintAgainst}</td>
                            <td>{complaint.title}</td>
                            <td>{formatDate(complaint.complaintDate)}</td>
                            <td>{complaint.description}</td>
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
                                      data-title="Edit Complaint"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(complaint)}
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
                                      id={`delete-form-${complaint.id}`}
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
                                          openDeleteDialog(complaint);
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
                      Showing {Math.min((currentPage - 1) * entriesPerPage + 1, complaints.length)}{" "}
                      to {Math.min(currentPage * entriesPerPage, complaints.length)}{" "}
                      of {complaints.length} entries
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

                        {Array.from({ length: Math.ceil(complaints.length / entriesPerPage) }, (_, index) => (
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

                        {currentPage < Math.ceil(complaints.length / entriesPerPage) && (
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
      {isUpdateModalOpen && setComplaints && (
        <UpdateComplaintModal
          complaint={selectedComplaint}
          onClose={() => setIsUpdateModalOpen(false)}
          updateComplaint={updateComplaint}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedComplaint && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="complaint"
          id={selectedComplaint.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ComplaintTable;

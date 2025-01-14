// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\ManageLeave\ManageLeaveTable.js

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil, TbCaretRight } from "react-icons/tb";
import StatusModal from "./StatusModal";

import UpdateModal from "./UpdateModal.js";
import ConfirmationDialog from "../../ConfirmationDialog.js";

const ManageLeaveTable = ({
  leaveData,
  setLeaveData,
  selectedLeave,
  setSelectedLeave,
  updateLeave,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredLeaves = leaveData.filter((leave) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(leave.startDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    const endDate = new Date(leave.endDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    const applicationon = new Date(leave.appliedOn)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      leave.employeeName.toLowerCase().includes(searchTerm) ||
      leave.leaveType.toLowerCase().includes(searchTerm) ||
      leave.reason.toLowerCase().includes(searchTerm) ||
      leave.status.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      endDate.includes(searchTerm) ||
      applicationon.includes(searchTerm)
    );
  });

  const statusColor = [
    { status: "Rejected", statusColor: "danger" },
    { status: "Approved", statusColor: "success" },
    { status: "Pending", statusColor: "warning" },
  ];

  const handleStatusUpdate = (leaveId, newStatus) => {
    setLeaveData((prevData) =>
      prevData.map((leave) =>
        leave.id === leaveId ? { ...leave, status: newStatus } : leave
      )
    );
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function getStatusColor(status) {
    const statusObj = statusColor.find((item) => item.status === status);
    return statusObj ? statusObj.statusColor : "secondary";
  }

  const handleUpdate = (leave) => {
    setSelectedLeave(leave);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (leave) => {
    setSelectedLeave(leave);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedLeave(null);
  };

  const handleDeleteConfirmed = (id) => {
    setLeaveData((prevLeaveData) =>
      prevLeaveData.filter((leaveData) => leaveData.id !== id)
    );
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
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Leave Type</th>
                        <th>Applied On</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Total Days</th>
                        <th>Leave Reason</th>
                        <th>Status</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeaves.map((leave) => (
                        <tr key={leave.id}>
                          <td>{leave.employeeName}</td>
                          <td>{leave.leaveType}</td>
                          <td>{formatDate(leave.appliedOn)}</td>
                          <td>{formatDate(leave.startDate)}</td>
                          <td>{formatDate(leave.endDate)}</td>
                          <td>{leave.totalDays}</td>
                          <td>{leave.reason}</td>
                          <td>
                            <div
                              className={`badge bg-${getStatusColor(
                                leave.status
                              )} p-2 px-3 rounded status-badge5`}
                            >
                              {leave.status}
                            </div>
                          </td>

                          <td className="Action">
                            <span>
                              <div className="action-btn bg-success ms-2">
                                <Link
                                  onClick={() => {
                                    setSelectedLeave(leave);
                                    setIsStatusModalOpen(true);
                                    setIsUpdateModalOpen(false);
                                    setIsDeleteDialogOpen(false);
                                  }}
                                  className="mx-3 btn btn-sm align-items-center"
                                  title="Manage Leave"
                                >
                                  <TbCaretRight className="text-white" />
                                </Link>
                              </div>
                              <div className="action-btn bg-info ms-2">
                                <Link
                                  className="mx-3 btn btn-sm align-items-center"
                                  data-size="lg"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title="Edit Leave"
                                  onClick={() => handleUpdate(leave)}
                                >
                                  <TbPencil className="text-white" />
                                </Link>
                              </div>
                              <div className="action-btn bg-danger ms-2">
                                <form
                                  method="POST"
                                  onSubmit={(e) => e.preventDefault()}
                                  action={`/leave/${leave.id}`}
                                  acceptCharset="UTF-8"
                                  id={`delete-form-${leave.id}`}
                                >
                                  <input
                                    name="_method"
                                    type="hidden"
                                    value="DELETE"
                                  />
                                  <input name="_token" type="hidden" />
                                  <Link
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openDeleteDialog(leave);
                                    }}
                                    className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                    aria-label="Delete"
                                  >
                                    <HiOutlineTrash className="text-white" />
                                  </Link>
                                </form>
                              </div>
                            </span>
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
                      leaveData.length
                    )}{" "}
                    to{" "}
                    {Math.min(currentPage * entriesPerPage, leaveData.length)}{" "}
                    of {leaveData.length} entries
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
                          length: Math.ceil(leaveData.length / entriesPerPage),
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
                        Math.ceil(leaveData.length / entriesPerPage) && (
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

      {/* Render StatusModal if leave is selected */}
      {isStatusModalOpen && selectedLeave && (
        <StatusModal
          leave={{
            ...selectedLeave,
            appliedOn: formatDate(selectedLeave.appliedOn),
            startDate: formatDate(selectedLeave.startDate),
            endDate: formatDate(selectedLeave.endDate),
          }}
          onClose={() => setIsStatusModalOpen(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {/* Confirmation Dialog */}

      {isDeleteDialogOpen && selectedLeave && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="leave"
          id={selectedLeave.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && setSelectedLeave && (
        <UpdateModal
          leave={selectedLeave}
          onClose={() => setIsUpdateModalOpen(false)}
          updateLeave={updateLeave}
        />
      )}
    </div>
  );
};

export default ManageLeaveTable;

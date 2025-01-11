import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonLeaveModal from "./CommonLeaveModal";

const LeaveTable = ({ leaveData }) => {
  const [isCommonLeaveModalOpen, setIsCommonLeaveModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredLeaveData = leaveData.filter((leave) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      leave.employeeName.toLowerCase().includes(searchTerm) 
    );
  });

  const paginatedLeaveData = filteredLeaveData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const handleOpenCommonLeaveModal = (employee, status) => {
    setSelectedEmployee({ ...employee, leaveStatus: status });
    setIsCommonLeaveModalOpen(true);
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
                          <th>Employee ID</th>
                          <th>Employee</th>
                          <th>Approved Leaves</th>
                          <th>Rejected Leaves</th>
                          <th>Pending Leaves</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedLeaveData.map((employee, index) => (
                          <tr key={index}>
                            <td>
                              <Link to="#" className="btn btn-outline-primary">
                                {employee.employeeId}
                              </Link>
                            </td>
                            <td>{employee.employeeName}</td>
                            <td>
                              <div className="btn btn-sm btn-info rounded">
                                {employee.approvedLeaves}
                                <Link
                                  className="text-white"
                                  onClick={() =>
                                    handleOpenCommonLeaveModal(employee, "Approved")
                                  }
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div className="btn btn-sm btn-danger rounded">
                                {employee.rejectedLeaves}
                                <Link
                                  className="text-white"
                                  onClick={() =>
                                    handleOpenCommonLeaveModal(employee, "Reject")
                                  }
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                            <td>
                              <div className="m-view-btn btn btn-sm btn-warning rounded">
                                {employee.pendingLeaves}
                                <Link
                                  className="text-white"
                                  onClick={() =>
                                    handleOpenCommonLeaveModal(employee, "Pending")
                                  }
                                >
                                  View
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing {Math.min((currentPage - 1) * entriesPerPage + 1, leaveData.length)}{" "}
                      to {Math.min(currentPage * entriesPerPage, leaveData.length)}{" "}
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

                        {Array.from({ length: Math.ceil(leaveData.length / entriesPerPage) }, (_, index) => (
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

                        {currentPage < Math.ceil(leaveData.length / entriesPerPage) && (
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

      {/* Update Modal */}
      {isCommonLeaveModalOpen && selectedEmployee && (
        <CommonLeaveModal
          employee={selectedEmployee}
          onClose={() => setIsCommonLeaveModalOpen(false)}
        />
      )}
    </>
  );
};

export default LeaveTable;

// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Employee\EmployeeTable.js

import React, { useState } from "react";

import { Link } from "react-router-dom";

import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../../js/custom";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../ConfirmationDialog";

// from main page data is passing to the table
const EmployeeTable = ({
  employeeData,
  setEmployeeData,
  selectedEmployeeData,
  setSelectedEmployeeData,
}) => {
  const navigate = useNavigate();

  const navigateToEmployeeUpdate = (event, employee) => {
    event.preventDefault();
    navigate(`/dashboard/employee/update`, { state: { employee } });
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("");

  const openDeleteDialog = (employee) => {
    setSelectedEmployeeData(employee);
    setIsDeleteDialogOpen(true);
    setDeleteType("employee");
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedEmployeeData(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setEmployeeData((prevEmployeeData) =>
      prevEmployeeData.filter((employee) => employee._id !== _id)
    );
  };

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredEmployeeData = employeeData.filter((employee) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(employee.dateOfJoining)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      employee.name.toLowerCase().includes(searchTerm) ||
      employee.email.toLowerCase().includes(searchTerm) ||
      employee.branchName.toLowerCase().includes(searchTerm) ||
      employee.departmentName.toLowerCase().includes(searchTerm) ||
      employee.designationName.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedEmployeeData = filteredEmployeeData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

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
                          <th>Name</th>
                          <th>Email</th>
                          <th>Branch</th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Date Of Joining</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedEmployeeData.map((employee, index) => (
                          <tr key={employee._id}>
                            <td>
                              <Link className="btn btn-outline-primary" to="">
                                #{employee.id}
                              </Link>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.branchName}</td>
                            <td>{employee.departmentName}</td>
                            <td>{employee.designationName}</td>
                            <td>{formatDate(employee.dateOfJoining)}</td>
                            <td className="Action">
                              <span>
                                <div className="action-btn bg-info ms-2">
                                  <Link
                                    className="mx-3 btn btn-sm align-items-center"
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                    onClick={(event) =>
                                      navigateToEmployeeUpdate(event, employee)
                                    }
                                  >
                                    <TbPencil className="text-white" />
                                  </Link>
                                </div>
                                <div className="action-btn bg-danger ms-2">
                                  <form method="POST" acceptCharset="UTF-8">
                                    <input
                                      name="_method"
                                      type="hidden"
                                      defaultValue="DELETE"
                                      id={`delete-form-${employee._id}`}
                                      onSubmit={(e) => e.preventDefault()}
                                    />
                                    <input name="_token" type="hidden" />
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                      aria-label="Delete"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDeleteDialog(employee);
                                      }}
                                    >
                                      <FaRegTrashAlt className="text-white" />
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
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      employeeData.length
                    )}{" "}
                    to{" "}
                    {Math.min(
                      currentPage * entriesPerPage,
                      employeeData.length
                    )}{" "}
                    of {employeeData.length} entries
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
                            employeeData.length / entriesPerPage
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
                        Math.ceil(employeeData.length / entriesPerPage) && (
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType={deleteType}
          id={selectedEmployeeData._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default EmployeeTable;

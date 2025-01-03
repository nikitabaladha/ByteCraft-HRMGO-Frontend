import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditDepartmentModal from "./EditDepartmentModal";
import { toast } from 'react-toastify';
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog"


const DepartmentTable = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredDepartments = departments.filter((department) => {
    const searchTerm = searchQuery.toLowerCase();

    return (
      department.branchId.branchName.toLowerCase().includes(searchTerm) ||
      department.departmentName.toLowerCase().includes(searchTerm)

    );
  });

  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const openDeleteDialog = (departmentId) => {
    setDepartmentToDelete(departmentId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDepartmentToDelete(null);
  };

  const handleDeleteSuccess = (deletedDepartmentId) => {
    setDepartments((prevDepartments) =>
      prevDepartments.filter((department) => department._id !== deletedDepartmentId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getAPI("/department-get-all", true);
        if (!response.hasError) {
          setDepartments(response.data.data);
        } else {
          toast.error(`Failed to fetch departments: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching departments.");
      }
    };

    fetchDepartments();
  }, []);

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="row">
      <div className="col-3">
        <Sidebar />
      </div>


      <div className="col-9">
        <div className="card">
          <div className="card-body table-border-style">
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
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th>Department</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDepartments.map((department) => (
                        <tr key={department._id}>
                          <td>{department.branchId.branchName}</td>
                          <td>{department.departmentName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEditClick(department)}
                                    className="mx-3 btn btn-sm align-items-center"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form
                                    method="POST"
                                    action="/hrmgo/department"
                                    acceptCharset="UTF-8"
                                    id="delete-form"
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
                                      onClick={() => openDeleteDialog(department._id)}
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    >
                                      <span className="text-white">
                                        <RiDeleteBinLine />
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, departments.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, departments.length)}{" "}
                    of {departments.length} entries
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

                      {Array.from({ length: Math.ceil(departments.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(departments.length / entriesPerPage) && (
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

      {showEditModal && selectedDepartment && (
        <EditDepartmentModal
          department={selectedDepartment}
          closeModal={handleCloseModal}
        />
      )}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={departmentToDelete}
          deleteType="department"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default DepartmentTable;

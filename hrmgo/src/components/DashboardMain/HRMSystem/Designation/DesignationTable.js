import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditDepartmentModal from "./EditDesignationModal";
import { toast } from 'react-toastify';
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";

const DesignationTable = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [designationToDelete, setDesignationToDelete] = useState(null);

  const openDeleteDialog = (designationId) => {
    setDesignationToDelete(designationId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDesignationToDelete(null);
  };

  const handleDeleteSuccess = (deletedDesignationId) => {
    setDesignations((prevDesignations) =>
      prevDesignations.filter((designation) => designation._id !== deletedDesignationId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await getAPI("/designation-get-all", true); 
        if (!response.hasError) {
          setDesignations(response.data.data);
        } else {
          toast.error(`Failed to fetch designations: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching designations.");
      }
    };
  
    fetchDesignations();
  }, []);
  



  const handleEditClick = (designation) => {
    setSelectedDesignation(designation);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setSelectedDesignation(null);
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
                      <select className="dataTable-selector">
                        <option value="5">5</option>
                        <option value="10" selected="">
                          10
                        </option>
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
                    />
                  </div>
                </div>
                <div className="dataTable-container">
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designations.map((designation) => (
                        <tr key={designation._id}>
                          <td>{designation.branchId.branchName}</td>
                          <td>{designation.departmentId.departmentName}</td>
                          <td>{designation.designationName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEditClick(designation)}
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
                                      onClick={() => openDeleteDialog(designation._id)}
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
                    Showing 1 to 8 of 8 entries
                  </div>
                  <nav className="dataTable-pagination">
                    <ul className="dataTable-pagination-list"></ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && selectedDesignation && (
        <EditDepartmentModal
          designation={selectedDesignation}
          closeModal={handleCloseModal}
        />
      )}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={designationToDelete}  
          deleteType="designation"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default DesignationTable;

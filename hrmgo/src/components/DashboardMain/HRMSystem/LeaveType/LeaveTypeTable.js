import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditLeaveTypeModal from "./EditLeaveTypeModal"; 
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";

const LeaveTypeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [leaveTypeToDelete, setLeaveTypeToDelete] = useState(null);

  const openDeleteDialog = (leaveTypeId) => {
    console.log("Deleting leave type with ID:", leaveTypeId);
    setLeaveTypeToDelete(leaveTypeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setLeaveTypeToDelete(null);
  };

  const handleDeleteSuccess = (deletedLeaveTypeId) => {
    setLeaveTypes((prevLeaveTypes) =>
      prevLeaveTypes.filter((leaveType) => leaveType._id !== deletedLeaveTypeId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await getAPI("/leave-type-get-all", true); 
        if (!response.hasError) {
          setLeaveTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch leave types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching leave types.");
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleEdit = (leaveType) => {
    setSelectedLeaveType(leaveType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLeaveType(null);
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
                    <input className="dataTable-input" placeholder="Search..." type="text" />
                  </div>
                </div>
                <div className="dataTable-container">
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th data-sortable="">Leave Type</th>
                        <th data-sortable="">Days/Year</th>
                        <th width="200px" data-sortable="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaveTypes.map((leaveType) => (
                        <tr key={leaveType._id}>
                          <td>{leaveType.leaveTypeName}</td>
                          <td>{leaveType.daysPerYear}</td> 
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(leaveType)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form method="POST" action={`/hrmgo/leave-type`} acceptCharset="UTF-8" id={`delete-form`}>
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                                    <Link
                                     onClick={() => openDeleteDialog(leaveType._id)}
                                     className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                     data-bs-toggle="tooltip"
                                     title="Delete">
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
                    Showing 1 to {leaveTypes.length} of {leaveTypes.length} entries
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

      {isModalOpen && (
        <EditLeaveTypeModal
          closeModal={handleCloseModal}
          leaveType={selectedLeaveType}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={leaveTypeToDelete}  
          deleteType="leavetype"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default LeaveTypeTable;

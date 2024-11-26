import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil, TbCaretRight } from "react-icons/tb";
import StatusModal from "./StatusModal";
import ConfirmationDialog from "./ConfirmationDialog";
import UpdateModal from "./UpdateModal.js";

const ManageLeaveTable = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [leaveId, setLeaveId] = useState(null);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const statusColor = [
    { status: "Reject", statusColor: "danger" },
    { status: "Approved", statusColor: "success" },
    { status: "Pending", statusColor: "warning" },
  ];

  useEffect(() => {
    const fetchMangeLeaveData = async () => {
      try {
        const response = await getAPI(`/manage-leave-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setLeaveData(response.data.data);
          console.log("Leave Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching leave Data:", err);
      }
    };

    fetchMangeLeaveData();
  }, []);

  const handleStatusUpdate = (leaveId, newStatus) => {
    setLeaveData((prevData) =>
      prevData.map((leave) =>
        leave.leaveId === leaveId ? { ...leave, status: newStatus } : leave
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

  // Handle delete confirmation
  const handleDeleteConfirmation = ({ leaveId }) => {
    setLeaveId(leaveId);
    setIsDeleteDialogOpen(true);
    setIsStatusModalOpen(false);
    setIsUpdateModalOpen(false);
  };

  const handleUpdateConfirmation = (leave) => {
    setSelectedLeave(leave);
    setIsUpdateModalOpen(true);
    setIsStatusModalOpen(false);
    setIsDeleteDialogOpen(false);
  };

  const handleLeaveDeleted = (deletedLeaveId) => {
    setLeaveData((prevData) =>
      prevData.filter((leave) => leave.leaveId !== deletedLeaveId)
    );
    setIsDeleteDialogOpen(false);
  };

  // Handle cancellation of delete
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleUpdateSuccess = (updatedLeave) => {
    setLeaveData((prevData) =>
      prevData.map((leave) =>
        leave.leaveId === updatedLeave.leaveId
          ? { ...leave, ...updatedLeave }
          : leave
      )
    );

    console.log("Updated Leave Data:", leaveData);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
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
                  {leaveData.map((leave) => (
                    <tr key={leave.leaveId}>
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
                              onClick={() => handleUpdateConfirmation(leave)}
                            >
                              <TbPencil className="text-white" />
                            </Link>
                          </div>
                          <div className="action-btn bg-danger ms-2">
                            <form
                              method="POST"
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
                                onClick={() =>
                                  handleDeleteConfirmation({
                                    leaveId: leave.leaveId,
                                  })
                                }
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onCancel={handleCancelDelete}
          leaveId={leaveId}
          onLeaveDeleted={handleLeaveDeleted}
        />
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedLeave && (
        <UpdateModal
          leave={selectedLeave}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default ManageLeaveTable;

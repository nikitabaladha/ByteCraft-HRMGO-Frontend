import React from "react";
import { useEffect } from "react";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusModal = ({ leave, onClose, onStatusUpdate }) => {
  const handleUpdateStatus = async (status) => {
    try {
      const response = await putAPI(
        `/manage-leave-update-status/${leave.leaveId}`,
        {
          status,
        },
        {},
        true
      );

      console.log("status update", status);

      if (!response.hasError) {
        console.log(`Leave status updated to ${status}:`, response.data);
        onStatusUpdate(leave.leaveId, status);
        onClose();
        toast.success(`Leave status successfully updated to ${status}`);
      } else {
        console.error("Error updating leave status:", response.message);
        toast.error(`Failed to update status: ${response.message}`);
      }
    } catch (error) {
      console.error("Error while updating leave status:", error);
      toast.error(`"An error occurred while updating the status."}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-content");

      // Check if the click was outside the modal content
      if (modalContent && !modalContent.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Leave Action
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <table className="table modal-table">
                <tbody>
                  <tr>
                    <th>Employee</th>
                    <td>{leave.employeeName}</td>
                  </tr>
                  <tr>
                    <th>Leave Type</th>
                    <td>{leave.leaveType}</td>
                  </tr>
                  <tr>
                    <th>Applied On</th>
                    <td>{leave.appliedOn}</td>
                  </tr>
                  <tr>
                    <th>Start Date</th>
                    <td>{leave.startDate}</td>
                  </tr>
                  <tr>
                    <th>End Date</th>
                    <td>{leave.endDate}</td>
                  </tr>
                  <tr>
                    <th>Leave Reason</th>
                    <td>{leave.reason}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>{leave.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success rounded"
                onClick={() => handleUpdateStatus("Approved")}
              >
                Approved
              </button>
              <button
                className="btn btn-danger rounded"
                onClick={() => handleUpdateStatus("Reject")}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusModal;

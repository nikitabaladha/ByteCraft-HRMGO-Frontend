import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pass the existing leave data to be edited
const UpdateModal = ({ leave, onClose, onUpdateSuccess }) => {
  const [leaveType, setLeaveType] = useState(leave?.leaveType || "");
  const [startDate, setStartDate] = useState(new Date(leave?.startDate));
  const [endDate, setEndDate] = useState(new Date(leave?.endDate));
  const [reason, setReason] = useState(leave?.reason || "");

  console.log("Leave date from table", leave);

  useEffect(() => {
    if (leave) {
      setLeaveType(leave.leaveType);
      setStartDate(new Date(leave.startDate));
      setEndDate(new Date(leave.endDate));
      setReason(leave.reason);
    }
  }, [leave]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated leave data
    const updatedLeave = {
      leaveType,
      startDate,
      endDate,
      reason,
    };

    try {
      const response = await putAPI(
        `/manage-leave-update/${leave.leaveId}`,
        updatedLeave,
        true
      );
      console.log("Updated leave: " + JSON.stringify(response));

      if (!response.hasError) {
        toast.success("Leave updated successfully!");
        onUpdateSuccess(response.data);
      } else {
        toast.error("Failed to update leave.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the leave.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalContent = document.querySelector(".modal-content");

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
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Leave
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body ">
            <form
              method="POST"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate=""
              onSubmit={handleUpdate}
            >
              <input name="_method" type="hidden" defaultValue="PUT" />
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="leave_type_id" className="col-form-label">
                        Leave Type
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        name="leave_type_id"
                        id="leave_type_id"
                        className="form-control select"
                        required
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                      >
                        <option value="">Select Leave Type</option>
                        <option value="Casual Leave">
                          Casual Leave&nbsp;(0/6)
                        </option>
                        <option value="Medical Leave">
                          Medical Leave&nbsp;(0/10)
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date" className="col-form-label">
                        Start Date
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        {" "}
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          className="form-control datepicker-input"
                          dateFormat="yyyy-MM-dd"
                          required
                          id="start_date"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-form-label">
                        End Date
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        {" "}
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          className="form-control datepicker-input"
                          dateFormat="yyyy-MM-dd"
                          required
                          id="end_date"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="leave_reason" className="col-form-label">
                        Leave Reason
                      </label>
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        rows={3}
                        required
                        value={reason}
                        cols={50}
                        id="leave_reason"
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn  btn-light"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  defaultValue="Update"
                  className="btn  btn-primary"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;

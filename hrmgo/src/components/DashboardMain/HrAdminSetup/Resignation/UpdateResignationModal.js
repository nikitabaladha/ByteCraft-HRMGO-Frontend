import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";

const UpdateResignationModal = ({
  resignation,
  onClose,
  updateResignation,
}) => {
  const [employeeName, setEmployeeName] = useState(
    resignation?.employeeName || ""
  );

  const today = new Date().toISOString().split("T")[0];
  const [resignationDate, setResignationDate] = useState(
    resignation?.resignationDate
      ? new Date(resignation.resignationDate).toISOString().split("T")[0]
      : today
  );
  const [lastWorkingDay, setLastWorkingDay] = useState(
    resignation?.lastWorkingDay
      ? new Date(resignation.lastWorkingDay).toISOString().split("T")[0]
      : today
  );
  const [reason, setReason] = useState(resignation?.reason || "");

  useEffect(() => {
    if (resignation) {
      setResignationDate(
        new Date(resignation.resignationDate).toISOString().split("T")[0]
      );
      setLastWorkingDay(
        new Date(resignation.lastWorkingDay).toISOString().split("T")[0]
      );
      setReason(resignation.reason);
    }
  }, [resignation]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (lastWorkingDay < resignationDate) {
      toast.error("Last working day cannot be before the resignation date.");
      return;
    }

    const updatedResignation = {
      resignationDate,
      lastWorkingDay,
      reason,
    };

    try {
      const response = await putAPI(
        `/resignation/${resignation.id}`,
        updatedResignation,
        true
      );
      if (!response.hasError) {
        toast.success("Resignation updated successfully!");

        const newUpdatedResignation = {
          id: response.data.data._id,
          employeeName: employeeName,
          employeeId: response.data.data.employeeId,
          resignationDate: response.data.data.resignationDate,
          lastWorkingDay: response.data.data.lastWorkingDay,
          reason: response.data.data.reason,
        };

        updateResignation(newUpdatedResignation);

        onClose();
      } else {
        toast.error("Failed to update Resignation.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleDateChange = (e, field) => {
    const value = e.target.value;
    if (field === "resignationDate") {
      setResignationDate(value);
    } else if (field === "lastWorkingDay") {
      setLastWorkingDay(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalDialog = document.querySelector(".modal-dialog");

      if (modalDialog && !modalDialog.contains(event.target)) {
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
              Edit Resignation
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body">
            <form
              method="POST"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate=""
              onSubmit={handleUpdate}
            >
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-md-12 col-lg-12 ">
                    <label htmlFor="employee_id" className="col-form-label">
                      Employee
                    </label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      disabled
                      aria-readonly
                    >
                      <option value={employeeName}>{employeeName}</option>
                    </select>
                  </div>

                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="resignationDate" className="col-form-label">
                      Resignation Date
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      value={resignationDate}
                      onChange={(e) => handleDateChange(e, "resignationDate")}
                      className="form-control"
                      required="required"
                      name="resignationDate"
                      type="date"
                      id="resignationDate"
                    />
                  </div>

                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="lastWorkingDay" className="col-form-label">
                      Last Working Day
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      value={lastWorkingDay}
                      onChange={(e) => handleDateChange(e, "lastWorkingDay")}
                      className="form-control"
                      required="required"
                      name="lastWorkingDay"
                      type="date"
                      id="lastWorkingDay"
                    />
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="reason" className="col-form-label">
                      Reason
                    </label>
                    <span className="text-danger">*</span>
                    <textarea
                      className="form-control"
                      placeholder="Enter Reason"
                      rows={3}
                      required="required"
                      name="reason"
                      cols={50}
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateResignationModal;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";

const UpdateResignationModal = ({ resignation, onClose }) => {
  const [employeeName, setEmployeeName] = useState(
    resignation?.employeeName || ""
  );

  const [resignationDate, setResignationDate] = useState(
    new Date(resignation?.resignationDate || "")
  );
  const [lastWorkingDay, setLastWorkingDay] = useState(
    new Date(resignation?.lastWorkingDay || "")
  );
  const [reason, setReason] = useState(resignation?.reason || "");

  useEffect(() => {
    if (resignation) {
      setResignationDate(new Date(resignation.resignationDate));
      setLastWorkingDay(new Date(resignation.lastWorkingDay));
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
      resignationDate: resignationDate.toISOString().split("T")[0],
      lastWorkingDay: lastWorkingDay.toISOString().split("T")[0],
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

  const handleDateChange = (date, field) => {
    if (field === "resignationDate") {
      setResignationDate(date);
    } else if (field === "lastWorkingDay") {
      setLastWorkingDay(date);
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
                  <div className="form-group col-md-6 col-lg-6 ">
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
                    <div>
                      <DatePicker
                        selected={resignationDate}
                        onChange={(date) =>
                          handleDateChange(date, "resignationDate")
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="date"
                        type="text"
                        id="date"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="lastWorkingDay" className="col-form-label">
                      Last Working Day
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={lastWorkingDay}
                        onChange={(date) =>
                          handleDateChange(date, "lastWorkingDay")
                        }
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="lastWorkingDay"
                        type="text"
                        id="lastWorkingDay"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
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

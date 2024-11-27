import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import postAPI from "../../../../api/postAPI.js";
import getAPI from "../../../../api/getAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
  }, []);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI("/employee-get-all-name", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (err) {
        toast.error("Error fetching employee data.");
      }
    };
    fetchEmployeeData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      toast.error("Please select an employee.");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const CreatedLeave = {
      employeeId: employeeId,
      leaveType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      reason,
    };

    try {
      const response = await postAPI(`/manage-leave`, CreatedLeave, true);

      if (response?.hasError === false) {
        toast.success("Leave Created successfully!");
        onClose();
      } else {
        console.error("Unexpected response:", response);
        toast.error(response?.message || "Failed to create leave.");
      }
    } catch (error) {
      console.error("Error during leave creation:", error);
      toast.error("An error occurred while creating the leave.");
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
      aria-labelledby="exampleModalLabel"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Leave
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
              onSubmit={handleCreate}
            >
              <input
                name="_token"
                type="hidden"
                defaultValue="NxVCKXsUxKp1zILAoiOCNs6xYQOgbmDbj35S5lxD"
              />
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="employee_id" className="col-form-label">
                        Employee
                      </label>
                      <span className="text-danger">*</span>

                      <select
                        className="form-control"
                        name="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
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
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Medical Leave">Medical Leave</option>
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
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control datepicker-input"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="yyyy-MM-dd"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-form-label">
                        End Date
                      </label>
                      <span className="text-danger">*</span>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control datepicker-input"
                        dateFormat="yyyy-MM-dd"
                        required
                        placeholderText="yyyy-MM-dd"
                      />
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
                        required="required"
                        placeholder="Leave Reason"
                        rows={3}
                        name="leave_reason"
                        cols={50}
                        id="leave_reason"
                        defaultValue={""}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Below Synchronization part is remaining */}
                <div className="form-group col-md-6">
                  <label htmlFor="synchronize_type" className="form-label">
                    Synchroniz in Google Calendar ?
                  </label>
                  <div className=" form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      name="synchronize_type"
                      id="switch-shadow"
                      defaultValue="google_calender"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="switch-shadow"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  defaultValue="Create"
                  className="btn  btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;

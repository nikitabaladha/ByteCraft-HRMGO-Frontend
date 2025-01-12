import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI.js";
import getAPI from "../../../../api/getAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    leaveType: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    reason: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!formData.employeeId) {
      toast.error("Please select an employee.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    try {
      const response = await postAPI(
        `/manage-leave`,
        {
          employeeId: formData.employeeId,
          leaveType: formData.leaveType,
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Leave created successfully!");

        setFormData({
          employeeId: "",
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          leaveType: "",
          reason: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create Leave.");
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
              <input name="_token" type="hidden" />
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-md-12 col-lg-12">
                    <label htmlFor="employee_id" className="col-form-label">
                      Employee
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      disabled={employees.length === 0}
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

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="leave_type_id" className="col-form-label">
                        Leave Type
                      </label>
                      <span className="text-danger">*</span>

                      <select
                        className="form-control"
                        required="required"
                        id="leaveType"
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
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

                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
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
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
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
                        placeholder="Enter Leave Reason"
                        rows={3}
                        required
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

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

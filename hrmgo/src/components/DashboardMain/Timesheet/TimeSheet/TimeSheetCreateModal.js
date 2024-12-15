import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TimeSheetCreateModal = ({ closeModal }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    hours: "",
    remark: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI(
        "/timesheet",
        {
          employeeId: formData.employeeId,
          date: formData.date,
          remark: formData.remark,
          hours: formData.hours,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Timesheet created successfully!");
        setFormData({ employeeId: "", date: "", hours: "", remark: "" });
        closeModal();
      } else {
        toast.error(response.message || "Failed to create timesheet.");
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

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: " rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Timesheet</h5>
            <button type="button" className="btn-close" onClick={closeModal} />
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              <div className="form-group">
                <label htmlFor="employeeId" className="col-form-label">
                  Employee <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date" className="col-form-label">
                  Date <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hours" className="col-form-label">
                  Hours <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  name="hours"
                  type="number"
                  value={formData.hours}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="remark" className="col-form-label">
                  Remark
                </label>
                <textarea
                  className="form-control"
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetCreateModal;

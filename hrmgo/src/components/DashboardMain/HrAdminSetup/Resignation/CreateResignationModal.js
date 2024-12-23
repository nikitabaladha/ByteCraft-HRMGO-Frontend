import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateResignationModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    resignationDate: new Date().toISOString().split("T")[0], // Set the default resignation date to the current date
    lastWorkingDay: new Date().toISOString().split("T")[0], // Set the default last working day to the current date
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation for resignationDate and lastWorkingDay
    if (formData.resignationDate >= formData.lastWorkingDay) {
      toast.error("Resignation date must be before the last working day.");
      return;
    }

    try {
      const response = await postAPI(
        "/resignation",
        {
          employeeId: formData.employeeId,
          resignationDate: formData.resignationDate,
          lastWorkingDay: formData.lastWorkingDay,
          reason: formData.reason,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Resignation created successfully!");
        setFormData({
          employeeId: "",
          resignationDate: new Date().toISOString().split("T")[0], // Reset to current date
          lastWorkingDay: new Date().toISOString().split("T")[0], // Reset to current date
          reason: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create resignation.");
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
    <>
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
                Create New Resignation
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
                onSubmit={handleSubmit}
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

                    <div className="form-group col-md-6 col-lg-6">
                      <label
                        htmlFor="resignationDate"
                        className="col-form-label"
                      >
                        Resignation Date
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="date"
                        className="form-control"
                        name="resignationDate"
                        value={formData.resignationDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group col-md-6 col-lg-6">
                      <label
                        htmlFor="lastWorkingDay"
                        className="col-form-label"
                      >
                        Last Working Day
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="date"
                        className="form-control"
                        name="lastWorkingDay"
                        value={formData.lastWorkingDay}
                        onChange={handleChange}
                        required
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
                        required
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
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
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateResignationModal;

import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const CreateResignationModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    resignationDate: new Date(),
    lastWorkingDay: new Date(),
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

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({ ...prevData, [name]: date }));
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
          resignationDate: formData.resignationDate
            ? formData.resignationDate.toISOString()
            : null,
          lastWorkingDay: formData.lastWorkingDay
            ? formData.lastWorkingDay.toISOString()
            : null,
          reason: formData.reason,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Resignation created successfully!");
        setFormData({
          employeeId: "",
          resignationDate: new Date(),
          lastWorkingDay: new Date(),
          reason: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create resignation.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
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
                      <div>
                        <DatePicker
                          selected={formData.resignationDate}
                          onChange={(date) =>
                            handleDateChange(date, "resignationDate")
                          }
                          dateFormat="yyyy-MM-dd"
                          className="form-control d_week current_date datepicker-input"
                          autoComplete="off"
                          required="required"
                          name="resignationDate"
                          id="resignationDate"
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-group col-md-6 col-lg-6">
                      <label
                        htmlFor="lastWorkingDay"
                        className="col-form-label"
                      >
                        Last Working Day
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        <DatePicker
                          selected={formData.lastWorkingDay}
                          onChange={(date) =>
                            handleDateChange(date, "lastWorkingDay")
                          }
                          dateFormat="yyyy-MM-dd"
                          className="form-control d_week current_date datepicker-input"
                          autoComplete="off"
                          required="required"
                          name="lastWorkingDay"
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
                        value={formData.reason}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    value="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={onClose}
                  />
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary"
                  />
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

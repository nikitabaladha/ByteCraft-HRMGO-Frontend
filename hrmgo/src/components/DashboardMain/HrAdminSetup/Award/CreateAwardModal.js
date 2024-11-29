import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const CreateAwardModal = ({ onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    awardType: "",
    date: new Date(),
    gift: "",
    description: "",
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

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI(
        "/award",
        {
          employeeId: formData.employeeId,
          awardType: formData.awardType,
          date: formData.date ? formData.date.toISOString() : null,
          gift: formData.gift,
          description: formData.description,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Award created successfully!");
        setFormData({
          employeeId: "",
          awardType: "",
          date: new Date(),
          gift: "",
          description: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create award.");
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
                Create New Award
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
                onSubmit={handleSubmit}
              >
                <input name="_token" type="hidden" />
                <div className="modal-body">
                  <div className="row">
                    <div className="form-group col-md-6 col-lg-6 ">
                      <label htmlFor="employee_id" className="col-form-label">
                        Employee
                      </label>
                      <span className="text-danger">*</span>
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
                    <div className="form-group col-md-6 col-lg-6">
                      <label htmlFor="award_type" className="col-form-label">
                        Award Type
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required="required"
                        id="award_type"
                        name="awardType"
                        value={formData.awardType}
                        onChange={handleChange}
                      >
                        <option value="">Select Award</option>
                        <option value="Trophy">Trophy</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6 col-lg-6">
                      <label htmlFor="date" className="col-form-label">
                        Date
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        <DatePicker
                          selected={formData.date}
                          onChange={handleDateChange}
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
                      <label htmlFor="gift" className="col-form-label">
                        Gift
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required="required"
                        placeholder="Enter Gift"
                        name="gift"
                        type="text"
                        id="gift"
                        value={formData.gift}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="description" className="col-form-label ">
                        Description
                      </label>
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
                        rows={3}
                        required="required"
                        name="description"
                        cols={50}
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    defaultValue="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={onClose}
                  />
                  <button
                    type="submit"
                    defaultValue="Create"
                    className="btn btn-primary"
                  >
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

export default CreateAwardModal;

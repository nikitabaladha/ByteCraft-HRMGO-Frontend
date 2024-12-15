import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const CreateComplaintModal = ({ onClose, addComplaint }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    complaintFromId: "",
    complaintAgainstId: "",
    title: "",
    complaintDate: new Date(),
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
    setFormData((prevData) => ({ ...prevData, ComplaintDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI(
        "/complaint",
        {
          complaintFromId: formData.complaintFromId,
          complaintAgainstId: formData.complaintAgainstId,
          title: formData.title,
          complaintDate: formData.complaintDate
            ? formData.complaintDate.toISOString()
            : null,
          description: formData.description,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Complaint created successfully!");

        const complaintFromName = employees.find(
          (emp) => emp._id === formData.complaintFromId
        )?.name;

        const complaintAgainstName = employees.find(
          (emp) => emp._id === formData.complaintAgainstId
        )?.name;

        const newComplaint = {
          id: response.data.data._id,
          title: response.data.data.title,
          complaintDate: response.data.data.complaintDate,
          description: response.data.data.description,
          complaintAgainst: complaintAgainstName,
          complaintFrom: complaintFromName,
        };

        addComplaint(newComplaint);

        setFormData({
          complaintFromId: "",
          complaintAgainstId: "",
          title: "",
          complaintDate: new Date(),
          description: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create Complaint.");
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
                Create New Complaint
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
                      <label
                        htmlFor="complaintFrom_id"
                        className="col-form-label"
                      >
                        Complaint From
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        name="complaintFromId"
                        value={formData.complaintFromId}
                        onChange={handleChange}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                          <option key={emp._id} value={emp._id}>
                            {emp.name}
                            {/* complaint from Name will be what ever name is selected here so can you pass it in newComplaint directly */}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group col-md-6 col-lg-6 ">
                      <label
                        htmlFor="complaintAgainst_id"
                        className="col-form-label"
                      >
                        Complaint To
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        name="complaintAgainstId"
                        value={formData.complaintAgainstId}
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
                      <label
                        htmlFor="complaint_title"
                        className="col-form-label"
                      >
                        Title
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter Complaint Title"
                        required="required"
                        name="title"
                        type="text"
                        id="complaint_title"
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6 col-lg-6">
                      <label htmlFor="date" className="col-form-label">
                        Complaint Date
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        <DatePicker
                          selected={formData.complaintDate}
                          onChange={handleDateChange}
                          dateFormat="yyyy-MM-dd"
                          className="form-control d_week current_date datepicker-input"
                          autoComplete="off"
                          required="required"
                          name="complaintDate"
                          type="text"
                          id="complaintDate"
                          style={{
                            width: "100%",
                          }}
                        />
                      </div>
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

export default CreateComplaintModal;

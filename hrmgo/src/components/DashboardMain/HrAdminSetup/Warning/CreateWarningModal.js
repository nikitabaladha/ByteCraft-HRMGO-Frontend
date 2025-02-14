import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateWarningModal = ({ onClose, addWarning }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    warningById: "",
    warningToId: "",
    subject: "",
    warningDate: new Date().toISOString().split("T")[0],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI(
        "/warning",
        {
          warningById: formData.warningById,
          warningToId: formData.warningToId,
          subject: formData.subject,
          warningDate: formData.warningDate,
          description: formData.description,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Warning created successfully!");
        setFormData({
          warningById: "",
          warningToId: "",
          subject: "",
          warningDate: new Date().toISOString().split("T")[0],
          description: "",
        });

        const warningBy = employees.find(
          (emp) => emp._id === formData.warningById
        )?.name;

        const warningTo = employees.find(
          (emp) => emp._id === formData.warningToId
        )?.name;

        // i want to pass warning By and warnig to name do it for me
        const newWarning = {
          id: response.data.data._id,
          description: response.data.data.description,
          warningBy: warningBy,
          warningTo: warningTo,
          subject: response.data.data.subject,
          warningDate: response.data.data.warningDate,
        };

        addWarning(newWarning);

        onClose();
      } else {
        toast.error(response.message || "Failed to create Warning.");
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
                Create New Warning
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
                      <label htmlFor="warningBy_id" className="col-form-label">
                        Warning By
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        name="warningById"
                        value={formData.warningById}
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

                    <div className="form-group col-md-6 col-lg-6 ">
                      <label htmlFor="warningTo_id" className="col-form-label">
                        Warning To
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        name="warningToId"
                        value={formData.warningToId}
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
                        htmlFor="Warning_subject"
                        className="col-form-label"
                      >
                        Subject
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter Warning Subject"
                        required="required"
                        name="subject"
                        type="text"
                        id="Warning_subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-md-6 col-lg-6">
                      <label htmlFor="date" className="col-form-label">
                        Warning Date
                      </label>
                      <span className="text-danger">*</span>

                      <input
                        value={formData.warningDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        autoComplete="off"
                        required="required"
                        name="warningDate"
                        type="text"
                        id="warningDate"
                        style={{
                          width: "100%",
                        }}
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

export default CreateWarningModal;

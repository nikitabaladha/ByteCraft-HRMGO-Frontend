import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTerminationModal = ({ onClose, addTermination }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    terminationType: "",
    noticeDate: new Date().toISOString().split("T")[0],
    terminationDate: new Date().toISOString().split("T")[0],
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
        "/termination",
        {
          employeeId: formData.employeeId,
          terminationType: formData.terminationType,
          noticeDate: formData.noticeDate,
          terminationDate: formData.terminationDate,
          description: formData.description,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Termination created successfully!");

        const selectedEmployee = employees.find(
          (emp) => emp._id === formData.employeeId
        );
        const employeeName = selectedEmployee ? selectedEmployee.name : "";

        const newTermination = {
          id: response.data.data._id,
          employeeName,
          terminationDate: response.data.data.terminationDate,
          terminationType: response.data.data.terminationType,
          noticeDate: response.data.data.noticeDate,
          description: response.data.data.description,
        };

        addTermination(newTermination);

        setFormData({
          employeeId: "",
          terminationType: "",
          noticeDate: new Date().toISOString().split("T")[0],
          terminationDate: new Date().toISOString().split("T")[0],
          description: "",
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create Termination.");
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
                Create New Termination
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
                        Employee Name
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
                      <label
                        htmlFor="Termination_type"
                        className="col-form-label"
                      >
                        Termination Type
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required="required"
                        id="termination_type"
                        name="terminationType"
                        value={formData.terminationType}
                        onChange={handleChange}
                      >
                        <option value="">Select Termination</option>
                        <option value="Test Termination">
                          Test Termination
                        </option>
                        <option value="Voluntary Termination">
                          Voluntary Termination
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-md-6 col-lg-6">
                      <label htmlFor="noticeDate" className="col-form-label">
                        Notice Date
                      </label>
                      <span className="text-danger">*</span>

                      <input
                        value={formData.noticeDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        autoComplete="off"
                        type="date"
                        name="noticeDate"
                      />
                    </div>

                    <div className="form-group col-md-6 col-lg-6">
                      <label
                        htmlFor="terminationDate"
                        className="col-form-label"
                      >
                        Termination Date
                      </label>
                      <span className="text-danger">*</span>

                      <input
                        value={formData.terminationDate}
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        autoComplete="off"
                        type="date"
                        name="terminationDate"
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

export default CreateTerminationModal;

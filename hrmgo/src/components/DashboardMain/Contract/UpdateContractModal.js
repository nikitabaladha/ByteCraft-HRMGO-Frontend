import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../api/getAPI";
import putAPI from "../../../api/putAPI";

const UpdateContractModal = ({ contracts, onClose }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    subject: "",
    value: "",
    contractTypeId: "",
    startDate: "",
    endDate: "",
  });
  const [employees, setEmployees] = useState([]);
  const [contractTypes, setContractTypes] = useState([]);

  useEffect(() => {
    if (contracts) {
      setFormData({
        employeeId: contracts.employeeId || "",
        subject: contracts.subject || "",
        value: contracts.value || "",
        contractTypeId: contracts.contractTypeId || "",
        startDate: contracts.startDate ? contracts.startDate.split("T")[0] : "",
        endDate: contracts.endDate ? contracts.endDate.split("T")[0] : "",
      });
    }
  }, [contracts]);

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

  useEffect(() => {
    const fetchContractTypeData = async () => {
      try {
        const response = await getAPI("/contract-type", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setContractTypes(response.data.data);
        } else {
          toast.error("Failed to load Contract Types.");
        }
      } catch (err) {
        toast.error("Error fetching Contract type data.");
      }
    };
    fetchContractTypeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedContract = {
      ...formData,
    };

    try {
      const response = await putAPI(
        `/contract/${contracts.id}`,
        updatedContract,
        true
      );

      if (!response.hasError) {
        toast.success("Contract updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update Contract.");
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
              Edit Contract
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body">
            <form
              method="POST"
              className="needs-validation"
              noValidate=""
              onSubmit={handleUpdate}
            >
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <label htmlFor="employeeId" className="col-form-label">
                      Employee Name
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={formData.employeeId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 form-group">
                    <label htmlFor="subject" className="col-form-label">
                      Subject
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="value" className="col-form-label">
                      Value
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      min={1}
                      placeholder="Enter Value"
                      name="value"
                      type="number"
                      value={formData.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6 form-group">
                    <label htmlFor="contractTypeId" className="col-form-label">
                      Contract Type
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="contractTypeId"
                      value={formData.contractTypeId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Contract Type</option>
                      {contractTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.contractName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="startDate" className="col-form-label">
                      Start Date
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      name="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="endDate" className="col-form-label">
                      Due Date
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      name="endDate"
                      type="date"
                      value={formData.endDate}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateContractModal;

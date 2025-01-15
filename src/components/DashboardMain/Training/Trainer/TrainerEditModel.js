import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.js";

const TrainerEditModal = ({ onClose, fetchTrainers }
) => {
  // State for branches
  const [branches, setBranches] = useState([]);
  

  // State for form data
  const [formData, setFormData] = useState({
    branch: "", // Default branch
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    expertise: "",
    address: "",
  });

  // Fetch branches from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true); // Replace with your actual API endpoint
        if (response.data && response.data.data) {
          setBranches(response.data.data);
        } else {
          toast.error("Failed to fetch branches.");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("An error occurred while fetching branches.");
      }
    };

    fetchBranches();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI("/trainee", formData, true);
      if (!response.hasError) {
        toast.success("Trainer Created Successfully");
        onClose()
        fetchTrainers()
      } else {
        toast.error(`Failed to create Trainer: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the trainer.");
    }
  };

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Trainer
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="branch" className="col-form-label">
                      Branch
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a Branch</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch.branchName}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Other form fields remain the same */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstName" className="col-form-label">
                      First Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      placeholder="Enter First Name"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="lastName" className="col-form-label">
                      Last Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      placeholder="Enter Last Name"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      placeholder="Enter Contact Number"
                      pattern="^\+\d{1,3}\d{9,13}$"
                      name="contactNumber"
                      type="text"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="text-xs text-danger">
                      Please use with country code. (ex. +91)
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email" className="col-form-label">
                      Email
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      placeholder="Enter Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group col-lg-12">
                  <label htmlFor="expertise" className="col-form-label">
                    Expertise
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Expertise"
                    rows="3"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group col-lg-12">
                  <label htmlFor="address" className="col-form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Address"
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
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
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerEditModal;


import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const TraineeUpdateDataModel = ({ onClose, onSubmit, trainee }) => {
  const [formData, setFormData] = useState({
    branch: trainee.branch || "",
    firstName: trainee.firstName || "",
    lastName: trainee.lastName || "",
    contactNumber: trainee.contactNumber || "",
    email: trainee.email || "",
    expertise: trainee.expertise || "",
    address: trainee.address || "",
  });

  const [branches, setBranches] = useState([]);
  

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal fade show" style={{ display: "block" }} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Trainer</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                      onChange={handleChange}
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="firstName" className="col-form-label">
                      First Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      name="firstName"
                      type="text"
                      id="firstName"
                      placeholder="Enter First Name"
                      value={formData.firstName}
                      onChange={handleChange}
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
                      name="lastName"
                      type="text"
                      id="lastName"
                      placeholder="Enter Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="contactNumber" className="col-form-label">
                      Contact Number
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      name="contactNumber"
                      type="text"
                      id="contactNumber"
                      placeholder="Enter Contact Number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      pattern="^\+\d{1,3}\d{9,13}$"
                      required
                    />
                    <small className="text-danger">
                      Please use country code. (e.g., +91)
                    </small>
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
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
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
                    id="expertise"
                    name="expertise"
                    rows="3"
                    placeholder="Expertise"
                    value={formData.expertise}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="form-group col-lg-12">
                  <label htmlFor="address" className="col-form-label">
                    Address
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    rows="3"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                  ></textarea>
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

export default TraineeUpdateDataModel;

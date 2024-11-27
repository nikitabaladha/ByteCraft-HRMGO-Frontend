import React, { useState } from "react";
import postAPI from "../../../../api/postAPI.js"
import { toast } from "react-toastify";

const TrainerEditModal = () => {
  // Define state variables for form fields
  const [formData, setFormData] = useState(
    {
    branch: "", // Default branch
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    expertise: "",
    address: "",
  }
);


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
        // Send a POST request to the backend API using postAPI
        const response = await postAPI('/trainee',  formData, true);
   
        if (!response.hasError) {
          toast.success("Account Created Successfully");
         
         
        } else {
          toast.error(`Failed to create Account: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while creating account.");
      } finally {
        // setLoading(false); // Stop loading spinner
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
                    value={formData.branchId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="1">China</option>
                    <option value="3">Canada</option>
                    <option value="8">France</option>
                    <option value="4">Greece</option>
                    <option value="2">India</option>
                    <option value="5">Italy</option>
                    <option value="6">Japan</option>
                    <option value="7">Malaysia</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="firstname" className="col-form-label">
                    First Name
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    placeholder="Enter First Name"
                    name="firstname"
                    type="text"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="lastname" className="col-form-label">
                    Last Name
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    placeholder="Enter Last Name"
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="contact" className="form-label">
                    Contact Number
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    placeholder="Enter Contact Number"
                    pattern="^\+\d{1,3}\d{9,13}$"
                    name="contact"
                    type="text"
                    value={formData.contact}
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

export default TrainerEditModal;


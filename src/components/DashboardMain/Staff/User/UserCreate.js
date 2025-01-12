import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const UserCreate = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    passwordSwitch: false,
    password: "",
  });
  const [roles, setRoles] = useState([]); 

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAPI("/get-all-roles"); 
        if (response && !response.hasError) {
          setRoles(response.data.roles || []); 
        } else {
          toast.error(`Failed to fetch roles: ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error("An error occurred while fetching roles.");
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        password: formData.passwordSwitch ? formData.password : undefined,
      };

      const response = await postAPI("/signup", payload, true);
      if (!response.hasError) {
        toast.success("User Created Successfully");
        onClose();
      } else {
        toast.error(`Failed to create User: ${response.message}`);
      }
    } catch (error) {
      console.error("Error while creating user:", error);
      toast.error("An error occurred while creating the User.");
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New User
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
              <form noValidate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="name" className="col-form-label">
                      Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Your Name"
                      name="name"
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-form-label">
                      Email
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Your Email"
                      name="email"
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role" className="col-form-label">
                      User Role
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="password_switch">Enable Login</label>
                    <div className="form-check form-switch custom-switch-v1 float-end">
                      <input
                        type="checkbox"
                        name="passwordSwitch"
                        className="form-check-input input-primary pointer"
                        id="password_switch"
                        checked={formData.passwordSwitch}
                        onChange={handleInputChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="password_switch"
                      ></label>
                    </div>
                  </div>
                  {formData.passwordSwitch && (
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          placeholder="Enter Password"
                          minLength="6"
                          name="password"
                          type="password"
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
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
    </div>
  );
};

export default UserCreate;

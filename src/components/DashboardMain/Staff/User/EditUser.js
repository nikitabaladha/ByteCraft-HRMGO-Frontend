import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI";

const EditUser = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI(`/update-user/${user._id}`, formData);
      toast(response.data.message || "User updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating User:", error);
      toast(error.response?.data?.message || "Failed to update User");
    }
  };

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update User
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
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
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
                      value={formData.name}
                      onChange={handleChange}
                      id="name"
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
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
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
                      onChange={handleChange}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role._id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
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
                    Update
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

export default EditUser;

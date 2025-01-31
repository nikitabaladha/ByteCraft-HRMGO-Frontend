import React, { useState } from "react";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
 
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }
 
    try {
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
 
      const response = await putAPI("/change-password", payload, true);
 
      if (!response.hasError) {
        setMessage(response.message);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to update Holiday.");
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

  return (
    <div id="Change_Password">
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="card">
              <div className="card-header">
                <h5>Change Password</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="col-form-label text-dark">
                        Current Password
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Current Password"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        id="currentPassword"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="newPassword" className="col-form-label text-dark">
                        New Password
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter New Password"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        id="newPassword"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="col-form-label text-dark">
                        Re-type New Password
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Re-type New Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        id="confirmPassword"
                      />
                    </div>
                  </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {message && <p className="text-success">{message}</p>}
              </div>
              <div className="card-footer">
                <div className="col-sm-12">
                  <div className="text-end">
                    <button className="btn btn-xs btn-primary" type="submit">
                      Save Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

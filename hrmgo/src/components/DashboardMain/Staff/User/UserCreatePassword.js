import React, { useState } from "react";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCreatePassword = ({ user, onClose }) => {
    console.log("user", user)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const payload = {
        userId: user._id,
        newPassword: password,
      };

      // Call the createPassword API
      const response = await postAPI("/create-password", payload, true);

      // Check the API response
      if (!response.hasError) {
        toast.success("Password updated successfully!");
        setPassword(""); // Clear password fields after success
        setConfirmPassword("");
        onClose(); // Close the modal on success
      } else {
        toast.error(response.message || "Failed to create password.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              New Password
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
                  <label htmlFor="password" className="col-form-label">
                    Password
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    autoComplete="new-password"
                    placeholder="Enter Your New Password"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password-confirmation"
                    className="col-form-label"
                  >
                    Confirm Password
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="password-confirm"
                    type="password"
                    className="form-control"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    autoComplete="new-password"
                    placeholder="Enter Your Confirm Password"
                  />
                </div>
              </div>
              <input type="hidden" value="true" name="login_enable" />
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
  );
};

export default UserCreatePassword;

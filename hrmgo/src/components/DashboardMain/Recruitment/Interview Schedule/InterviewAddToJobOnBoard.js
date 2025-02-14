import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";

const InterviewAddToJobOnBoard = ({
  applicantId,
  applicantName,
  applicatAppliedFor,
  applicationCreatedAt,
  applicantPhone,
  applicantDOB,
  applicantGender,
  applicantEmail,
  applicantAddress,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    applicantId: "",
    applicantName: "",
    applicatAppliedFor: "",
    applicationCreatedAt: "",
    applicantPhone: "",
    applicantDOB: "",
    applicantGender: "",
    applicantEmail: "",
    applicantAddress: "",
    joining_date: "",
    days_of_week: "",
    salary: "",
    salary_type: "",
    salary_duration: "",
    job_type: "",
    status: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Set initial form data
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const today = `${now.getFullYear()}-${month}-${day}`;

    setFormData((prev) => ({
      ...prev,
      applicantId,
      applicantName,
      applicatAppliedFor,
      applicationCreatedAt,
      applicantPhone,
      applicantDOB,
      applicantGender,
      applicantEmail,
      applicantAddress,
      joining_date: today,
    }));
  }, [
    applicantId,
    applicantName,
    applicatAppliedFor,
    applicationCreatedAt,
    applicantPhone,
    applicantDOB,
    applicantGender,
    applicantEmail,
    applicantAddress,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI("/create-job-onBoard", formData); // Ensure data is sent here

      console.log("job onboarding created:", response.data);
      // Perform additional actions if needed
      toast("Job Onboarding created successfully!");

      // Reset the form after successful submission
      setFormData({
        applicantId: "",
        applicantName: "",
        applicatAppliedFor: "",
        applicationCreatedAt: "",
        joining_date: "",
        days_of_week: "",
        salary: "",
        salary_type: "",
        salary_duration: "",
        job_type: "",
        status: "",
      });

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Error creating job onboarding:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to create job onboarding"
      );
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
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add to Job OnBoard
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <label htmlFor="joining_date" className="col-form-label">
                    Joining Date
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control current_date"
                    required
                    name="joining_date"
                    type="date"
                    id="joining_date"
                    value={formData.joining_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="days_of_week" className="col-form-label">
                    Days Of Week
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    required
                    name="days_of_week"
                    type="number"
                    min="0"
                    placeholder="Enter Days Of Week"
                    value={formData.days_of_week}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="salary" className="col-form-label">
                    Salary
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    className="form-control"
                    required
                    name="salary"
                    type="number"
                    min="0"
                    placeholder="Enter Salary"
                    value={formData.salary}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="salary_type" className="col-form-label">
                    Salary Type
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    required
                    name="salary_type"
                    id="salary_type"
                    value={formData.salary_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Salary Type</option>
                    <option value="Monthly Payslip">Monthly Payslip</option>
                    <option value="Hourly Payslip">Hourly Payslip</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="salary_duration" className="col-form-label">
                    Salary Duration
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    required
                    name="salary_duration"
                    id="salary_duration"
                    value={formData.salary_duration}
                    onChange={handleChange}
                  >
                    <option value="">Select Salary Duration</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="job_type" className="col-form-label">
                    Job Type
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    required
                    name="job_type"
                    id="job_type"
                    value={formData.job_type}
                    onChange={handleChange}
                  >
                    <option value="">Select Job Type</option>
                    <option value="full time">Full Time</option>
                    <option value="part time">Part Time</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="status" className="col-form-label">
                    Status
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    required
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="cancel">Cancel</option>
                    <option value="confirm">Confirm</option>
                  </select>
                </div>
              </div>
              {errorMessage && (
                <div className="text-danger mt-3">{errorMessage}</div>
              )}
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
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InterviewAddToJobOnBoard;


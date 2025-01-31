import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";

const CreateNewInterviewSchedule = ({
  applicantId,
  applicantName,
  applicatAppliedFor,
  applicantEmail,
  applicantPhone,
  applicantStatus,
  applicantDOB,
  applicantGender,
  applicationCreatedAt,
  applicantAddress,
  onClose,
}) => {
  const [formValues, setFormValues] = useState({
    applicantId: "",
    candidate: applicantName || "",
    applicantEmail: "",
    applicantPhone: "",
    applicantStatus: "",
    applicantDOB: "",
    applicantGender: "",
    applicationCreatedAt: "",
    applicantAddress: "",
    applicatAppliedFor: "",
    interviewer: "",
    date: "",
    time: "",
    comment: "",
    synchronize_type: false,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [applications, setApplications] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI(`/employee-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setEmployeeData(response.data.data);
          console.log("Employee Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Employee Data:", err);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await getAPI("/get-all-job-application");
        setApplications(response.data.applications || []);
      } catch (err) {
        console.error(err);
      }
    };

    setFormValues((prev) => ({
      ...prev,
      applicantId,
      applicatAppliedFor,
     applicantEmail, applicantPhone,  applicantStatus, applicantDOB, applicantGender, applicationCreatedAt, applicantAddress,
    }));
    console.log("abc", applicantId)
    fetchApplications();
    fetchEmployeeData();
  }, [applicantId, applicatAppliedFor, applicantEmail, applicantPhone,  applicantStatus, applicantDOB, applicantGender, applicationCreatedAt, applicantAddress,]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postAPI("/create-interview-schedule", {
        applicantId: formValues.applicantId,
        candidate: formValues.candidate,
        applicatAppliedFor: formValues.applicatAppliedFor,
        applicantEmail: formValues.applicantEmail,
        applicantPhone: formValues.applicantPhone,
        applicantStatus: formValues.applicantStatus, 
        applicantDOB: formValues.applicantDOB,
        applicantGender: formValues.applicantGender,
        applicationCreatedAt: formValues.applicationCreatedAt, 
        applicantAddress: formValues.applicantAddress,
        interviewer: formValues.interviewer,
        date: formValues.date,
        time: formValues.time,
        comment: formValues.comment,
        synchronizeType: formValues.synchronize_type,
      });

      console.log("Interview schedule created:", response.data);
      toast("Interview schedule created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating interview schedule:", error);
      setErrorMessage(
        error.response?.data?.error || "Failed to create schedule"
      );
    }
  };

  return (
    <div
      class="modal fade show"
      id="commonModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{ display: "block" }}
    >
      <div class="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Interview Schedule
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  title="Generate Content With AI"
                >
                  <i className="fas fa-robot"></i> Generate With AI
                </button>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="candidate" className="col-form-label">
                    Interview To
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    id="candidate"
                    name="candidate"
                    value={formValues.candidate}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Candidate --</option>
                    {applications.map((candidate) => (
                      <option key={candidate.value} value={candidate.name}>
                        {candidate.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="interviewer" className="col-form-label">
                    Interviewer
                  </label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    id="interviewer"
                    name="interviewer"
                    value={formValues.interviewer}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Interviewer --</option>
                    {employeeData.map((interviewer) => (
                      <option key={interviewer.value} value={interviewer.name}>
                        {interviewer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="date" className="col-form-label">
                    Interview Date
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={formValues.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="time" className="col-form-label">
                    Interview Time
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    type="time"
                    className="form-control"
                    id="time"
                    name="time"
                    value={formValues.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment" className="col-form-label">
                    Comment
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter Comment"
                    name="comment"
                    id="comment"
                    value={formValues.comment}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="synchronize_type" className="form-label">
                    Synchronize in Google Calendar?
                  </label>
                  <div className="form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      name="synchronize_type"
                      id="synchronize_type"
                      checked={formValues.synchronize_type}
                      onChange={handleInputChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="synchronize_type"
                    ></label>
                  </div>
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
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewInterviewSchedule;

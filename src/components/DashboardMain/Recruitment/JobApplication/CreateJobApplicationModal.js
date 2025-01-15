import { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";

const CreateJobApplication = ({ onClose }) => {
  const [formData, setFormData] = useState({
    job: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    dob: "",
    gender: "",
    address: "",
    coverLetter: "",
  });

  const [jobs, setJobs] = useState([]);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [profile, setEmployeePhoto] = useState(null);
  const [resume, setEmployeeResume] = useState(null)

  const [imagePreview, setImagePreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];

      if (name === "profile") {
        setEmployeePhoto(file);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
      } else if (name === "resume") {
        setEmployeeResume(file);
        setResumePreview(file.name);
        setImagePreview("");
      }
    } else {
      if (name === "profile") {
        setEmployeePhoto(null);
        setImagePreview("");
      } else if (name === "resume") {
        setEmployeeResume(null);
        setResumePreview("");
      }
    }
  };

  useEffect(() => {
    // Fetch job titles on component mount
    const fetchJobs = async () => {
      try {
        const response = await getAPI("/get-all-job");
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleJobChange = async (e) => {
    const jobId = e.target.value;
    const selectedJob = jobs.find((job) => job._id === jobId);

    setFormData({
      ...formData,
      job: jobId,
      jobTitle: selectedJob?.title || "",
      branch: selectedJob?.branch || "",
    });

    if (jobId) {
      try {
        const response = await getAPI(`/get-all-jobs/${jobId}`);
        setSelectedJobDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    } else {
      setSelectedJobDetails(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append standard fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        if (key === "customQuestions") {
          // Convert custom questions to JSON string if it's an array
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    if (profile) formDataToSend.append("profile", profile);
    if (resume) formDataToSend.append("resume", resume);

    try {
      const response = await postAPI(
        "/create-job-application",
        formDataToSend,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      console.log("Job application created successfully:", response.data);
      toast("Job application created successfully");
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast("Failed to create job application. Please try again.");
    }
  };

  return (
    <div className="modal show" style={{ display: "block" }} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Job Application</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="modal-body">
              <div className="row">
                {/* Job */}
                <div className="form-group col-md-12">
                  <label htmlFor="job">Job</label>
                  <span className="text-danger">*</span>
                  <select
                    className="form-control"
                    name="job"
                    value={formData.job}
                    onChange={handleJobChange}
                    required
                  >
                    <option value="">Select Job</option>
                    {jobs.map((job) => (
                      <option key={job._id} value={job._id}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Name */}
                <div className="form-group col-md-6">
                  <label htmlFor="name">Name</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Email */}
                <div className="form-group col-md-6">
                  <label htmlFor="email">Email</label>
                  <span className="text-danger">*</span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Phone */}
                <div className="form-group col-md-6">
                  <label htmlFor="phone">Phone</label>
                  <span className="text-danger">*</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter phone number with country code (e.g., +91)"
                    pattern="^\+\d{1,3}\d{9,13}$"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Conditional Fields */}
                {selectedJobDetails?.applicant.includes("Date of Birth") && (
                  <div className="form-group col-md-6">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      className="form-control"
                      name="dob"
                      value={formData.dob || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                )}

                {selectedJobDetails?.applicant.includes("Gender") && (
                  <div className="form-group col-md-6">
                    <label>Gender</label>
                    <div className="d-flex">
                      <label className="form-check-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                        />{" "}
                        Male
                      </label>
                      <label className="form-check-label ms-3">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                        />{" "}
                        Female
                      </label>
                    </div>
                  </div>
                )}

                {selectedJobDetails?.applicant.includes("Address") && (
                  <div className="form-group col-md-12">
                    <label htmlFor="address">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      rows="3"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                    ></textarea>
                  </div>
                )}

                <div className="row mt-3">
                  {["city", "state", "country", "zipCode"].map((field) => (
                    <div className="form-group col-md-6" key={field}>
                      <label htmlFor={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Enter ${field}`}
                        name={field}
                        value={formData[field] || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}
                </div>

                {/* Visibility fields */}
                {selectedJobDetails?.visibility.includes("Profile") && (
                  <div className="form-group col-md-6">
                    <label htmlFor="profile">Profile</label>
                    <input
                      type="file"
                      className="form-control"
                      name="profile"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {selectedJobDetails?.visibility.includes("Resume") && (
                  <div className="form-group col-md-6">
                    <label htmlFor="resume">Resume</label>
                    <input
                      type="file"
                      className="form-control"
                      name="resume"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>
                )}

                {selectedJobDetails?.visibility.includes("Letter") && (
                  <div className="form-group col-md-12">
                    <label htmlFor="coverLetter">Cover Letter</label>
                    <textarea
                      className="form-control"
                      name="coverLetter"
                      rows="3"
                      value={formData.coverLetter || ""}
                      onChange={handleInputChange}
                      placeholder="Enter your cover letter"
                    ></textarea>
                  </div>
                )}

              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJobApplication;

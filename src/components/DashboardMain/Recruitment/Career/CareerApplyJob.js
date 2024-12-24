import React, { useState } from "react";
import CareerHeader from "./CareerHeader";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import { CiLocationOn } from "react-icons/ci";
import { toast } from "react-toastify";
import postAPI from "../../../../api/postAPI";

const CareerApplyJob = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//   const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    profile: null,
    resume: null,
    dob: "",
    gender: "",
    address: "",
    coverLetter: "",
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const { id } = useParams();


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
      
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add jobDetails.title to the formData state
    setFormData((prevData) => ({
      ...prevData,
      jobTitle: jobDetails.title,
      branch: jobDetails.branch,
    }));
  
    // Create a new FormData object for submission
    const formDataToSend = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        if (key === "customQuestions") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === "profile" || key === "resume") {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });
  
    // Append the job title explicitly if needed
    formDataToSend.append("jobTitle", jobDetails.title);
    formDataToSend.append("branch", jobDetails.branch);
  
    try {
      const response = await postAPI("/create-job-application", formDataToSend);
  
      console.log("Job application created successfully:", response.data);
      toast("Job application created successfully");
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast("Failed to create job application. Please try again.");
    }
  };
  

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getAPI(`/get-all-jobs/${id}`);
        setJobDetails(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load job details. Please try again.");
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  if (!jobDetails) {
    return <div>No job details found.</div>;
  }

  const handleProfileChange = (event) => {
    const file = event.target.files[0];
    setProfilePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleResumeChange = (event) => {
    const file = event.target.files[0];
    setResumePreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div>
      <CareerHeader />
      <section className="apply-job-section">
        <div className="container">
          <div className="apply-job-wrapper bg-light">
            <div className="section-title text-center">
              <h2 className="h1 mb-3">{jobDetails.title}</h2>
              <div className="d-flex flex-wrap justify-content-center gap-1 mb-4">
                {jobDetails.skill.map((skills, index) => (
                  <span key={index} className="badge rounded p-2 bg-primary">
                    {skills}
                  </span>
                ))}
              </div>
              <p>
                <CiLocationOn /> {jobDetails.branch}
              </p>
            </div>
            <div className="apply-job-form">
              <h2 className="mb-4">Apply for this job</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        // id="name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        // id="email"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter Phone Number"
                        pattern="^\+\d{1,3}\d{9,13}$"
                        id="phone"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="text"
                      />
                      <div className="text-xs text-danger">
                        Please use with country code. (ex. +91)
                      </div>
                    </div>
                  </div>

                  {jobDetails?.applicant.includes("Date of Birth") && (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="dob" className="form-label">
                          Date of Birth
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control datepicker w-100"
                          required
                          name="dob"
                          type="date"
                          value={formData.dob || ""}
                          onChange={handleInputChange}
                          // id="dob"
                        />
                      </div>
                    </div>
                  )}

                  {jobDetails?.applicant.includes("Gender") && (
                    <div className="form-group col-md-6">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <span className="text-danger">*</span>
                      <div className="d-flex radio-check">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            //   id="g_male"
                            value="Male"
                            name="gender"
                            checked={formData.gender === "Male"}
                            onChange={handleInputChange}
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="g_male"
                          >
                            Male
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            type="radio"
                            //   id="g_female"
                            value="Female"
                            name="gender"
                            checked={formData.gender === "Female"}
                            onChange={handleInputChange}
                            className="custom-control-input"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="g_female"
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  {jobDetails?.applicant.includes("Address") && (
                    <div className="form-group col-md-6">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        //   id="address"
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
                  <div className="form-group col-md-6">
                    <label htmlFor="profile" className="col-form-label">
                      Profile
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="profile"
                      id="profile"
                      onChange={handleProfileChange}
                    />
                    {profilePreview && (
                      <img
                        src={profilePreview}
                        alt="Profile Preview"
                        className="mt-3"
                        width="25%"
                      />
                    )}
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="resume" className="col-form-label">
                      CV / Resume
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      type="file"
                      className="form-control"
                      name="resume"
                      id="resume"
                      onChange={handleResumeChange}
                      required
                    />
                    {resumePreview && (
                      <img
                        src={resumePreview}
                        alt="Resume Preview"
                        className="mt-3"
                        width="25%"
                      />
                    )}
                  </div>

                  {jobDetails?.visibility.includes("Letter") && (
                    <div className="form-group col-md-12">
                      <label htmlFor="cover_letter" className="form-label">
                        Cover Letter
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="coverLetter"
                        value={formData.coverLetter || ""}
                        onChange={handleInputChange}
                        placeholder="Enter your cover letter"
                        //   id="cover_letter"
                      ></textarea>
                    </div>
                  )}
                  {jobDetails?.customQuestions &&
                    jobDetails.customQuestions.map(
                      (question, index) => (
                        <div
                          className="form-group col-md-12 question"
                          key={index}
                        >
                          <label
                            htmlFor={`customQuestion${index}`}
                            className="form-label"
                          >
                            {question}
                          </label>
                          <span className="text-danger">*</span>
                          <input
                            type="text"
                            className="form-control"
                            name={`customQuestion${index}`}
                            value={formData[`customQuestion${index}`] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [`customQuestion${index}`]: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      )
                    )}
                  {/* <div className="form-group col-md-12">
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="termsCheckbox"
                        name="terms_condition_check"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="termsCheckbox"
                      >
                        Accept
                        <a
                          href="https://demo.workdo.io/hrmgo/terms_and_condition/5"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          terms and conditions
                        </a>
                      </label>
                    </div> */}
                  {/* </div> */}
                  <div className="col-12">
                    <div className="text-center mt-4">
                      <button type="submit" className="btn btn-primary">
                        Submit your application
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareerApplyJob;

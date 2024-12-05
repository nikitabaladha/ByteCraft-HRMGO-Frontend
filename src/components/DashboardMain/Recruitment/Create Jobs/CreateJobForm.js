import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import postAPI from "../../../../api/postAPI";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    branch: "",
    category: "",
    position: "",
    status: "active",
    startDate: "",
    endDate: "",
    skill: [],
    applicant: [],
    visibility: [],
    customQuestions: [],
    description: "",
    requirement: "",
    terms: "",
  });

  const [branches, setBranches] = useState([]);
  const [jobCategory, setJobCategory] = useState([]);
  const [showTerms, setShowTerms] = useState(false);
  

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

    const fetchJobCategory = async () => {
      try {
        const response = await getAPI(`/get-all-job-categories`, {}, true); // Replace with your actual API endpoint
        if (response.data && response.data.data) {
          setJobCategory(response.data.data);
        } else {
          toast.error("Failed to fetch job categories.");
        }
      } catch (error) {
        console.error("Error fetching job category:", error);
        toast.error("An error occurred while job category.");
      }
    };

    fetchJobCategory();

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const list = formData[name] || [];
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
          ? [...list, value]
          : list.filter((item) => item !== value),
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChanged = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      const list = prevData[name] || [];
      return {
        ...prevData,
        [name]: checked
          ? [...list, value]
          : list.filter((item) => item !== value),
      };
    });
    setShowTerms(e.target.checked); // Toggle visibility
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => {
      const list = prevData[name] || [];
      return {
        ...prevData,
        [name]: checked
          ? [...list, value]
          : list.filter((item) => item !== value),
      };
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    try {
      const response = await postAPI("/create-job", formData); // Replace with your API endpoint
      if (response.data.success) {
        console.log("Job created successfully:", response.data);
        toast("Job created successfully!");
      }
    } catch (error) {
      toast.error(
        "Error creating job:",
        error.response?.data || error.message
      );
      toast(
        error.response?.data?.message ||
          "An error occurred while creating the job"
      );
    }
  };

  return (
    <div>
      <div className="row">
        <div className="text-end">
          <Link
            to="#"
            className="btn btn-sm btn-primary"
            data-size="medium"
            data-ajax-popup-over="true"
            data-url="https://demo.workdo.io/hrmgo/generate/job"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-title="Generate Content With AI"
            data-bs-original-title="Generate"
          >
            <i className="fas fa-robot"></i> Generate With AI
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="row mt-3">
            <div className="col-md-6">
              <div className="card card-fluid job-card">
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label htmlFor="title" className="col-form-label">
                        Job Title
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter job title"
                        name="title"
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
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
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch.value} value={branch.branchName}>
                            {branch.branchName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="category" className="col-form-label">
                        Job Category
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">--</option>
                        {jobCategory.map((jobcategories) => (
                          <option
                            key={jobcategories.value}
                            value={jobcategories.jobCategory}
                          >
                            {jobcategories.jobCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="position" className="col-form-label">
                        No. of Positions
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter job position"
                        name="position"
                        type="text"
                        id="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="status" className="col-form-label">
                        Status
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="in_active">In Active</option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="startDate" className="col-form-label">
                        Start Date
                      </label>
                      <input
                        className="form-control"
                        placeholder="Select start date"
                        name="startDate"
                        type="date"
                        id="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="endDate" className="col-form-label">
                        End Date
                      </label>
                      <input
                        className="form-control"
                        placeholder="Select end date"
                        name="endDate"
                        type="date"
                        id="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label className="col-form-label" htmlFor="skill">
                        Skill Box
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        name="skill"
                        placeholder="Skill"
                        value={formData.skill}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Remaining Form Sections */}
            <div className="col-md-6">
              <div
                className="card card-fluid job-card"
                style={{ height: "567px" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <h6>Need to Ask ?</h6>
                        <div className="my-4">
                          <div className="form-check custom-checkbox">
                            <label
                              className="form-check-label"
                              htmlFor="check-gender"
                            >
                             <input
                              type="checkbox"
                              className="form-check-input"
                              name="applicant"
                              value="Gender"
                              id="check-gender"
                              onChange={handleCheckboxChange}
                            />
                              Gender
                            </label>
                          </div>
                          <div className="form-check custom-checkbox">
                            
                            <label
                              className="form-check-label"
                              htmlFor="check-dob"
                            >
                                <input
                              type="checkbox"
                              className="form-check-input"
                              name="applicant"
                              value="Date of Birth"
                              id="check-dob"
                              onChange={handleCheckboxChange}
                            />
                              Date Of Birth
                            </label>
                          </div>
                          <div className="form-check custom-checkbox">
                        
                            <label
                              className="form-check-label"
                              htmlFor="check-address"
                            >
                                    <input
                              type="checkbox"
                              className="form-check-input"
                              name="applicant"
                              value="Address"
                              id="check-address"
                              onChange={handleCheckboxChange}
                            />
                              Address
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <h6>Need to show Options ?</h6>
                        <div className="my-4">
                          <div className="form-check custom-checkbox">
                           
                            <label
                              className="form-check-label"
                              htmlFor="check-profile"
                            >
                                 <input
                              type="checkbox"
                              className="form-check-input"
                              name="visibility"
                              value="Profile"
                              id="check-profile"
                              onChange={handleCheckboxChange}
                            />
                              Profile Image
                            </label>
                          </div>
                          <div className="form-check custom-checkbox">
                          
                            <label
                              className="form-check-label"
                              htmlFor="check-resume"
                            >
                                  <input
                              type="checkbox"
                              className="form-check-input"
                              name="visibility"
                              value="Resume"
                              id="check-resume"
                              onChange={handleCheckboxChange}
                            />
                              Resume
                            </label>
                          </div>
                          <div className="form-check custom-checkbox">
                            
                            <label
                              className="form-check-label"
                              htmlFor="check-letter"
                            >
                                <input
                              type="checkbox"
                              className="form-check-input"
                              name="visibility"
                              value="Letter"
                              id="check-letter"
                              onChange={handleCheckboxChange}
                            />
                              Cover Letter
                            </label>
                          </div>
                          <div className="form-check custom-checkbox">
                            
                            <label
                              className="form-check-label"
                              htmlFor="check-terms"
                            >
                                <input
                              type="checkbox"
                              className="form-check-input"
                              name="visibility"
                              value="Terms and Conditions"
                              id="check-terms"
                              onChange={handleCheckboxChanged}
                            />
                              Terms And Conditions
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <h6>Custom Questions</h6>
                      <div className="my-4">
                        <div className="form-check custom-checkbox">
                        
                          <label
                            className="form-check-label"
                            htmlFor="custom_question_1"
                          >
                              <input
                            type="checkbox"
                            className="form-check-input"
                            name="customQuestions"
                            value="What Do You Know About This Job?"
                            required
                            id="custom_question_1"
                            onChange={handleCheckboxChange}
                          />
                            What Do You Know About This Job?
                          </label>
                        </div>
                        <div className="form-check custom-checkbox">
                         
                          <label
                            className="form-check-label"
                            htmlFor="custom_question_1"
                          >
                             <input
                            type="checkbox"
                            className="form-check-input"
                            name="customQuestions"
                            value="Why do you want this job?"
                            required
                            id="custom_question_1"
                            onChange={handleCheckboxChange}
                          />
                            Why do you want this job?
                          </label>
                        </div>
                        <div className="form-check custom-checkbox">
                         
                          <label
                            className="form-check-label"
                            htmlFor="custom_question_1"
                          >
                             <input
                            type="checkbox"
                            className="form-check-input"
                            name="customQuestions"
                            value="Why do you want to work this company?"
                            required
                            id="customQuestion"
                            onChange={handleCheckboxChange}
                          />
                            Why do you want to work this company?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <CreateJobDescription /> */}
            <div className="col-md-6">
              <div className="card card-fluid job-card">
                <div className="card-body ">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label for="sescription" className="col-form-label">
                        Job Description
                      </label>
                      <span className="text-danger">*</span>
                      <ReactQuill
                        value={formData.description}
                        onChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            description: value,
                          }))
                        }
                        theme="snow"
                        style={{
                          height: "250px",
                          maxHeight: "300px",
                          minHeight: "200px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <CreateJobRecuirment /> */}

            <div className="col-md-6">
              <div className="card card-fluid job-card">
                <div className="card-body ">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label for="requirement" className="col-form-label">
                        Job Requirement
                      </label>
                      <span className="text-danger">*</span>

                      <Link
                        href="#"
                        data-size="md"
                        className="btn btn-primary btn-icon btn-sm float-end"
                        data-ajax-popup-over="true"
                        id="grammarCheck"
                        data-url="https://demo.workdo.io/hrmgo/grammar/grammar"
                        data-bs-placement="top"
                        data-title="Grammar check with AI"
                      >
                        <i className="ti ti-rotate"></i>{" "}
                        <span>Grammar check with AI</span>
                      </Link>

                      <ReactQuill
                        value={formData.requirement}
                        onChange={(value) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            requirement: value,
                          }))
                        }
                        theme="snow"
                        style={{
                          height: "250px",
                          maxHeight: "300px",
                          minHeight: "200px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <CreateJobTermsAndCondition/> */}
            {showTerms && (
        <div className="col-md-12" id="termsandcondition">
          <div className="card card-fluid job-card">
            <div className="card-body">
              <div className="row">
                <div className="form-group col-md-12">
                  <label
                    htmlFor="terms_and_conditions"
                    className="col-form-label"
                  >
                    Terms And Conditions
                  </label>
                  <span className="text-danger">*</span>
                  <ReactQuill
                    value={formData.terms}
                    onChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        terms: value,
                      }))
                    }
                    theme="snow"
                    style={{
                      height: "250px",
                      maxHeight: "300px",
                      minHeight: "200px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

          <div className="col-md-12 text-end">
            <Link className="btn btn-secondary btn-submit" to="/jobs">
              Cancel
            </Link>
            <button className="btn btn-primary btn-submit ms-1" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJobForm;

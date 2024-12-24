import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";

const EditJob = () => {
  const { id } = useParams(); // Job ID from the URL
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
    applicantDetails: [],
  });

  const [branches, setBranches] = useState([]);
  const [jobCategory, setJobCategory] = useState([]);
  const [showTerms, setShowTerms] = useState(false);

  const [inputValue, setInputValue] = useState(""); // For handling the current skill input

  // Handle input value change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press for creating new skills
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const skill = inputValue.trim(); // Remove unnecessary spaces
      if (skill && !formData.skill.includes(skill)) {
        setFormData((prevData) => ({
          ...prevData,
          skill: [...prevData.skill, skill],
        }));
      }
      setInputValue(""); // Clear the input field
    }
  };

  // Handle skill removal
  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skill: prevData.skill.filter((skill) => skill !== skillToRemove),
    }));
  };

  useEffect(() => {
    // Fetch the existing job details for pre-filling the form
    const fetchJobDetails = async () => {
      try {
        const response = await getAPI(`/get-all-jobs/${id}`, {}, true);
        if (response.data && response.data.data) {
          // const data = await response.json();
          setFormData(response.data.data);
        } else {
          toast.error("Failed to fetch job details.");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("An error occurred while fetching job details.");
      }
    };

    

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
    fetchJobDetails();
  }, [id]);

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


  const handleCheckboxChange = (e, type) => {
    setFormData((prevData) => {
      const isChecked = e.target.checked;
      const updatedApplicant = isChecked
        ? [...prevData.applicant, type] // Add if checked
        : prevData.applicant.filter((item) => item !== type); // Remove if unchecked
      return { ...prevData, applicant: updatedApplicant };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putAPI(`/update-job/${id}`, formData);
      if (!response.hasError) {
        toast("Job updated successfully!");
      } else {
        toast.error(`Error: ${response?.message || "Failed to update job."}`);
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <div class="page-header">
        <div class="page-block">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="page-header-title">
                <h4 class="m-b-10">Edit Job</h4>
              </div>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li class="breadcrumb-item">
                  <Link to="/dashboard/recruitment/jobs">Manage Job</Link>
                </li>
                <li class="breadcrumb-item">Edit Job</li>
              </ul>
            </div>
            <div class="col">
              <div class="float-end "></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="text-end">
          <Link
            to="#"
            class="btn btn-sm btn-primary"
            data-size="medium"
            data-ajax-popup-over="true"
            data-url="https://demo.workdo.io/hrmgo/generate/job"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title=""
            data-title="Generate Content With AI"
            data-bs-original-title="Generate"
          >
            <i class="fas fa-robot"></i> Generate With AI
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="needs-validation">
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
      <span className="text-danger"> *</span>
      <div
        className="form-control d-flex align-items-center flex-wrap"
        style={{
          minHeight: "50px",
          gap: "8px",
        }}
      >
        {/* Render skill badges */}
        {formData.skill.map((skill, index) => (
          <span
            key={index}
            className="badge bg-primary d-flex align-items-center"
            style={{
              padding: "0.4rem 0.6rem",
              gap: "4px",
            }}
          >
            {skill}
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              aria-label="Remove"
              style={{ fontSize: "10px" }}
              onClick={() => handleRemoveSkill(skill)}
            ></button>
          </span>
        ))}

        {/* Input field for typing new skills */}
        <input
          type="text"
          className="border-0 flex-grow-1"
          style={{ outline: "none", minWidth: "100px" }}
          placeholder="Type a skill and press Enter or comma"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
                </div>
              </div>
            </div>
          </div>
          {/* Remaining Form Sections */}
          <div class="col-md-6">
            <div
              className="card card-fluid job-card"
              style={{ height: "567px" }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div class="form-group">
                      <h6>Need to Ask ?</h6>
                      <div class="my-4">
                        <div className="form-check custom-checkbox">
                          {["Gender"].map((type) => (
                            <label
                              key={type}
                              className="form-check-label"
                              htmlFor={`check-${type}`}
                            >
                              <input
                                type="checkbox"
                                className="form-check-input"
                                name="applicant"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.applicant) &&
                                  formData.applicant.includes(type)
                                }
                                onChange={(e) => handleCheckboxChange(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>

                        <div class="form-check custom-checkbox">
                          {["Date of Birth"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-dob"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="applicant"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.applicant) &&
                                  formData.applicant.includes(type)
                                }
                                onChange={(e) => handleCheckboxChange(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                        <div class="form-check custom-checkbox">
                          {["Address"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-address"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="applicant"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.applicant) &&
                                  formData.applicant.includes(type)
                                }
                                onChange={(e) => handleCheckboxChange(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <h6>Need to show Options ?</h6>
                      <div class="my-4">
                        <div class="form-check custom-checkbox">
                          {["Profile"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-profile"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="visibility"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.visibility) &&
                                  formData.visibility.includes(type)
                                }
                                onChange={(e) => handleCheckboxChanged(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                        <div class="form-check custom-checkbox">
                          {["Resume"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-profile"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="visibility"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.visibility) &&
                                  formData.visibility.includes(type)
                                }
                                onChange={(e) => handleCheckboxChanged(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                        <div class="form-check custom-checkbox">
                          {["Letter"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-profile"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="visibility"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.visibility) &&
                                  formData.visibility.includes(type)
                                }
                                onChange={(e) => handleCheckboxChanged(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                        <div class="form-check custom-checkbox">
                          {["Terms and Conditions"].map((type) => (
                            <label
                              key={type}
                              class="form-check-label"
                              for="check-profile"
                            >
                              <input
                                type="checkbox"
                                class="form-check-input"
                                name="visibility"
                                value={type}
                                id={`check-${type}`}
                                checked={
                                  Array.isArray(formData.visibility) &&
                                  formData.visibility.includes(type)
                                }
                                onChange={(e) => handleCheckboxChanged(e, type)}
                              />
                              {type}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-12">
                    <h6>Custom Questions</h6>
                    <div class="my-4">
                      <div class="form-check custom-checkbox">
                        {["What Do You Know About This Job?"].map((type) => (
                          <label
                            key={type}
                            class="form-check-label"
                            for="custom_question_1"
                          >
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="customQuestions"
                              value={type}
                              required=""
                                id={`check-${type}`}
                              checked={
                                Array.isArray(formData.customQuestions) &&
                                formData.customQuestions.includes(type)
                              }
                              onChange={(e) => handleCheckboxChanged(e, type)}
                            />
                            {type}
                            <span class="text-danger">*</span>
                          </label>
                        ))}
                      </div>
                      <div class="form-check custom-checkbox">
                        {["Why do you want this job?"].map((type) => (
                          <label
                            key={type}
                            class="form-check-label"
                            for="custom_question_2"
                          >
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="customQuestions"
                              value={type}
                              id={`check-${type}`}
                              checked={
                                Array.isArray(formData.customQuestions) &&
                                formData.customQuestions.includes(type)
                              }
                              onChange={(e) => handleCheckboxChanged(e, type)}
                            />
                            {type}
                          </label>
                        ))}
                      </div>
                      <div class="form-check custom-checkbox">
                        {["Why do you want to work this company?"].map((type) => (
                          <label
                            key={type}
                            class="form-check-label"
                            for="custom_question_3"
                          >
                            <input
                              type="checkbox"
                              class="form-check-input"
                              name="customQuestions"
                              value={type}
                                 id={`check-${type}`}
                              checked={
                                Array.isArray(formData.customQuestions) &&
                                formData.customQuestions.includes(type)
                              }
                              onChange={(e) => handleCheckboxChanged(e, type)}
                            />
                            {type}
                          </label>
                        ))}
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;

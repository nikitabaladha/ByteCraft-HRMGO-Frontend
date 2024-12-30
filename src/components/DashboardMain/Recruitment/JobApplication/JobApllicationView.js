import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import getAPI from "../../../../api/getAPI";
import AddToJobOnboard from "./AddToJobOnboard";
import CreateNewInterviewSchedule from "./CreateNewInterviewSchedule";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const JobApplicationView = () => {
  const { id } = useParams();
  const [application, setApplication] = useState({
    status: "Applied",
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [skill, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [Notes, setNote] = useState("");
  const [applicantId, setApplicantId] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await getAPI(`/get-application/${id}`);
        setApplication(response.data.application);
        // setStatus(response.data.status)
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!application) {
    return <div>Job application not found.</div>;
  }

  const handleCreateClick = () => {
    setApplicantId(id);
    console.log("application id", id);
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim() !== "") {
      e.preventDefault();

      if (!skill.includes(skillInput.trim())) {
        setSkills([...skill, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skill.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skill.length === 0) {
      toast("Please add at least one skill before submitting.");
      return;
    }

    try {
      const response = await putAPI(`/update-skill/${id}`, { skill });
      toast("Skills added successfully!");
      console.log(response.data);
      setSkills([]);
    } catch (error) {
      console.error("Error submitting skills:", error);
      toast("Failed to add skills. Please try again.");
    }
  };

  const handleSubmitNotes = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI(`/update-notes/${id}`, { Notes });

      console.log(response.data);
      toast("Notes updated successfully!");
    } catch (error) {
      console.error("Error updating notes:", error);
      toast("An error occurred while updating notes.");
    }
  };

  const handleOpenScheduleModal = () => {
    setApplicantId(id);
    console.log("schedule id", id);
    setShowScheduleModal(true);
  };

  const handleCloseScheduleModal = () => {
    setShowScheduleModal(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); 
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  const handleArchive = async () => {
    try {
      const newStatus = application.isArchived ? false : true;
      const response = await putAPI(`/toggle-archive-status/${id}`, {
        isArchived: newStatus,
      });
      console.log(response);
      toast(
        newStatus
          ? "Application archived successfully!"
          : "Application unarchived successfully!"
      );
      setApplication({ ...application, isArchived: newStatus });
    } catch (error) {
      console.error("Error archiving application:", error);
      toast("Failed to update archive status. Please try again.");
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    setApplication((prevApp) => ({
      ...prevApp,
      status: newStatus,
    }));

    try {
      const response = await putAPI(`/update-status/${id}`, {
        status: newStatus,
      });

      console.log(response.data.message);
      toast("Status changed successfully");
    } catch (error) {
      console.error("Error updating status application:", error);
      toast("Failed to update status. Please try again.");
    }
  };

  const handleRatingClick = async (value) => {
    setRating(value);

    try {
      const response = await putAPI(`/update-status/${id}`, {
        rating: value,
      });

      console.log(response.data.message);
      toast("Rating change successfully");
    } catch (error) {
      console.error("Error updating job application rating:", error);
      toast("Failed to update rating. Please try again.");
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Job Application Details</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/dashboard/recruitment/job-candidate">
                    Archive Application
                  </Link>
                </li>
                <li className="breadcrumb-item">Job Application</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-auto">
                  <h6 className="text-muted">Basic Details</h6>
                </div>
                <div className="col text-end">
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <form>
                        <input name="_method" type="hidden" value="DELETE" />
                        <input
                          name="_token"
                          type="hidden"
                          value="E5qiQNocyOqrueCkhTiboXugSEEjqM8XqpkSMfTM"
                        />
                        <Link
                          to="/dashboard/recruitment/job-candidate"
                          onClick={handleArchive}
                          className="bs-pass-para"
                          data-bs-toggle="tooltip"
                          title="Archive"
                        >
                          <span
                            className={`badge p-2 px-3 ${
                              application.isArchived ? "bg-warning" : "bg-info"
                            }`}
                          >
                            {application.isArchived ? "Unarchive" : "Archive"}
                          </span>
                        </Link>
                      </form>
                    </li>
                    <li className="list-inline-item">
                      {application.isArchived === false && (
                        <form
                          method="POST"
                          action="https://demo.workdo.io/hrmgo/job-application/28"
                          acceptCharset="UTF-8"
                        >
                          <input name="_method" type="hidden" value="DELETE" />
                          <input
                            name="_token"
                            type="hidden"
                            value="E5qiQNocyOqrueCkhTiboXugSEEjqM8XqpkSMfTM"
                          />
                          <Link
                            to="#"
                            className="bs-pass-para"
                            data-bs-toggle="tooltip"
                            title="Delete"
                          >
                            <span className="badge bg-danger p-2 px-3">
                              Delete
                            </span>
                          </Link>
                        </form>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <h5 className="h4">
                <div
                  className="d-flex align-items-center"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="2 hrs ago"
                >
                  <div>
                    <Link
                      to="https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png"
                      target="_blank"
                      className="avatar rounded-circle avatar-sm"
                    >
                      <img
                        src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png"
                        className="img-fluid rounded border-2 border-primary"
                        alt="notFound"
                        width="55px"
                        style={{ height: "55px" }}
                      />
                    </Link>
                  </div>
                  <div className="flex-fill ms-3">
                    <div className="h6 text-sm mb-0">{application.name}</div>
                    <p className="text-sm lh-140 mb-0">{application.email}</p>
                  </div>
                </div>
              </h5>

              <div className="py-2 my-4 border-top">
                <div className="row align-items-center my-3">
                  {[
                    { value: "Applied", label: "Applied" },
                    { value: "Phone Screen", label: "Phone Screen" },
                    { value: "Interview", label: "Interview" },
                    { value: "Hired", label: "Hired" },
                    { value: "Rejected", label: "Rejected" },
                  ].map((statusOption) => (
                    <div
                      className="form-check form-check-inline form-group"
                      key={statusOption.value}
                    >
                      <input
                        type="radio"
                        id={`stage_${statusOption.value}`}
                        name="status"
                        value={statusOption.value}
                        className="form-check-input stages"
                        checked={application.status === statusOption.value}
                        // checked={application.status === statusOption.value}

                        onChange={handleStatusChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`stage_${statusOption.value}`}
                      >
                        {statusOption.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-auto">
                  <h6 className="text-muted">Basic Information</h6>
                </div>
                <div className="col text-end">
                  <div className="col-12 text-end">
                    <Link
                      to="#"
                      onClick={handleCreateClick}
                      data-url="https://demo.workdo.io/hrmgo/job-onboard/create/27"
                      data-ajax-popup="true"
                      className="btn-sm btn btn-primary"
                      data-title="Add to Job OnBoard"
                      data-bs-original-title="Add to Job OnBoard"
                    >
                      <FiPlus className="text-white" />
                      Add to Job OnBoard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-header">
              <dl className="row">
                <dt className="col-sm-3">
                  <span className="h6 text-sm mb-0">Phone</span>
                </dt>
                <dd className="col-sm-8">
                  <span className="text-sm">{application.phone}</span>
                </dd>
                {application.dob && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">DOB</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{`${formatDate(
                        application.dob
                      )}`}</span>
                    </dd>
                  </>
                )}
                {application.gender && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Gender</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.gender}</span>
                    </dd>
                  </>
                )}
                {application.branch && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Branch</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.branch}</span>
                    </dd>
                  </>
                )}
                {application.address && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Address</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.address}</span>
                    </dd>
                  </>
                )}
                {application.city && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">City</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.city}</span>
                    </dd>
                  </>
                )}
                {application.state && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">State</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.state}</span>
                    </dd>
                  </>
                )}
                {application.country && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Country</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.country}</span>
                    </dd>
                  </>
                )}
                {application.zipCode && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Zip Code</span>
                    </dt>
                    <dd className="col-sm-8">
                      <span className="text-sm">{application.zipCode}</span>
                    </dd>
                  </>
                )}
                <dt className="col-sm-3">
                  <span className="h6 text-sm mb-0">Applied For</span>
                </dt>
                <dd className="col-sm-8">
                  <span className="text-sm">{application.jobTitle}</span>
                </dd>

                <dt className="col-sm-3">
                  <span className="h6 text-sm mb-0">Applied at</span>
                </dt>
                <dd className="col-sm-8">
                  <span className="text-sm">{`${formatDate(
                    application.createdAt
                  )}`}</span>
                </dd>
                {application.resume && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">CV / Resume</span>
                    </dt>
                    <dd className="col-sm-8">
                      <div className="dt-buttons">
                        <span className="text-sm action-btn bg-primary me-2">
                          <Link
                            to="https://demo.workdo.io/hrmgo/storage/uploads/job/resume/Screenshot 2024-09-13 101919_1733890896.png"
                            data-bs-toggle="tooltip"
                            data-bs-original-title="download"
                            download=""
                          >
                            <span className="text-white">
                              <i className="ti ti-download "></i>
                            </span>
                          </Link>
                        </span>
                        <div className="action-btn bg-secondary ">
                          <Link
                            className="mx-3 btn btn-sm align-items-center"
                            to="https://demo.workdo.io/hrmgo/storage/uploads/job/resume/Screenshot 2024-09-13 101919_1733890896.png"
                            target="_blank"
                          >
                            <span className="text-white">
                              <i
                                className="ti ti-crosshair "
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Preview"
                              ></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </dd>
                  </>
                )}
                {application.coverLetter && (
                  <>
                    <dt className="col-sm-3">
                      <span className="h6 text-sm mb-0">Cover Letter:</span>
                    </dt>
                    <dd className="col-sm-9">
                      <span className="text-sm">{application.coverLetter}</span>
                    </dd>
                  </>
                )}
              </dl>
              <div className="rating-stars text-right">
                <ul id="stars">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <li
                      key={value}
                      className={`star ${
                        value <= (hoverRating || rating) ? "selected" : ""
                      }`}
                      data-bs-toggle="tooltip"
                      data-bs-original-title={
                        ["Poor", "Fair", "Good", "Excellent", "WOW!!!"][
                          value - 1
                        ]
                      }
                      data-value={value}
                      onClick={() => handleRatingClick(value)}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <i className="fa fa-star fa-fw"></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {showModal && (
            <AddToJobOnboard
              applicantId={applicantId}
              applicantName={application.name}
              applicatAppliedFor={application.jobTitle}
              applicationCreatedAt={application.createdAt}
              applicantPhone={application.phone}
              applicantDOB={application.dob}
              applicantGender={application.gender}
              applicantEmail={application.email}
              applicantAddress={application.adderss}
              jobBranch={application.branch}
              onClose={handleCloseModal}
            />
          )}
        </div>

        <div className="col-md-12">
          <div className="card card-fluid">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h6 className="text-muted">Additional Details</h6>
                </div>
                <div className="col text-end">
                  <Link
                    data-url="https://demo.workdo.io/hrmgo/interview-schedule/create/28"
                    onClick={handleOpenScheduleModal}
                    data-size="lg"
                    className="btn-sm btn btn-primary"
                    data-ajax-popup="true"
                    data-title="Create New Interview Schedule"
                    style={{ color: "white" }}
                  >
                    <FiPlus className="text-white" /> Create New Interview
                    Schedule
                  </Link>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush mb-4">
                <div className="list-group-item px-0">
                  <div className="row align-items-center">
                    {/* <div className="col">
                      <Link to="#!" className="d-block h6 text-sm mb-0">
                        What Do You Consider to Be Your Weaknesses?
                      </Link>
                      <p className="card-text text-sm text-muted mb-0">
                        nbvvhnmnnm
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Skill Box</label>
                  <div className="d-flex flex-wrap align-items-center border p-2 rounded">
                    {skill.map((skills, index) => (
                      <span
                        key={index}
                        className="badge bg-primary text-white me-2 mb-2"
                      >
                        {skills}
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          aria-label="Close"
                          onClick={() => handleRemoveSkill(index)}
                        ></button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a skill and press Enter or Comma"
                      className="border-0 flex-grow-1"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  Add Skills
                </button>
              </form>

              <form onSubmit={handleSubmitNotes}>
                <div className="form-group">
                  <label className="form-label">Applicant Notes</label>
                  <textarea
                    name="note"
                    className="form-control"
                    rows="3"
                    value={Notes}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Add Notes"
                    className="btn-sm btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        {showScheduleModal && (
          <CreateNewInterviewSchedule onClose={handleCloseScheduleModal}
               applicantId={applicantId}
              applicantName={application.name}
              applicatAppliedFor={application.jobTitle}
              applicantEmail={application.email}
               applicantPhone={application.phone}
              applicantStatus={application.status}
              applicantDOB={application.dob}
               applicantGender={application.gender}
                applicationCreatedAt={application.createdAt} 
                applicantAddress={application.adderss} />
        )}
      </div>
    </div>
  );
};

export default JobApplicationView;

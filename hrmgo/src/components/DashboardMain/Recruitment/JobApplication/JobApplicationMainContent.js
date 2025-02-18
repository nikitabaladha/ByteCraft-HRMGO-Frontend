import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { TbSearch, TbRefresh } from "react-icons/tb";
// import { FaRegTrashAlt } from "react-icons/fa";
// import { TbPencil } from "react-icons/tb";
import { PiDotsThreeOutlineVerticalThin } from "react-icons/pi";
// import { AiOutlineClockCircle } from "react-icons/ai";
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";

const JobApplicationMainContent = ({ applications, setApplications }) => {
  const [jobs, setJobs] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedJob, setSelectedJob] = useState("");
  const [filteredApplications, setFilteredApplications] =
    useState(applications);

  useEffect(() => {
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let filtered = applications;

    if (startDate) {
      filtered = filtered.filter(
        (app) => new Date(app.createdAt) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (app) => new Date(app.createdAt) <= new Date(endDate)
      );
    }

    if (selectedJob) {
      filtered = filtered.filter((app) => app.jobTitle === selectedJob);
    }

    setFilteredApplications(filtered);
  };

  const openDeleteDialog = (appId) => {
    setAppToDelete(appId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setAppToDelete(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setApplications((prevApp) => prevApp.filter((app) => app._id !== _id));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensures 2 digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2 digits for the month
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setSelectedJob("");
    setFilteredApplications(applications);
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <div className="mt-2" id="multiCollapseExample1">
            <div className="card">
              <div className="card-body">
                <form
                  onSubmit={handleFormSubmit}
                  acceptCharset="UTF-8"
                  id="application_filter"
                >
                  <div className="d-flex align-items-center justify-content-end">
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                      <div className="btn-box">
                        <label htmlFor="start_date" className="form-label">
                          Start Date
                        </label>
                        <input
                          className="month-btn form-control current_date"
                          name="start_date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          id="start_date"
                        />
                      </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                      <div className="btn-box ">
                        <label htmlFor="end_date" className="form-label">
                          End Date
                        </label>
                      </div>

                      <input
                        className="month-btn form-control current_date"
                        autoComplete="off"
                        name="end_date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        id="end_date"
                      />
                    </div>
                    <div className="col-xl-4 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                      <div className="btn-box">
                        <label htmlFor="job" className="form-label">
                          Job
                        </label>
                        <select
                          className="form-control select"
                          id="job_id"
                          name="job"
                          value={selectedJob}
                          onChange={(e) => setSelectedJob(e.target.value)}
                        >
                          <option value="" disabled>
                            All
                          </option>
                          {jobs.map((job) => (
                            <option key={job._id} value={job.title}>
                              {job.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-auto float-end ms-2 mt-4">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary mx-2"
                        data-bs-toggle="tooltip"
                        title="Apply"
                      >
                        {/* <TbSearch /> */}
                        <i className="ti ti-search"></i>
                      </button>
                      <Link
                        href="#"
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="tooltip"
                        title="Reset"
                        onClick={handleReset}
                      >
                        {/* <TbRefresh /> */}
                        <i className="ti ti-refresh"></i>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="card overflow-hidden mt-0">
          <div className="container-kanban">
            <div
              className="row kanban-wrapper horizontal-scroll-cards"
              data-plugin="dragula"
              data-containers='["kanban-blacklist-1","kanban-blacklist-2","kanban-blacklist-3","kanban-blacklist-4","kanban-blacklist-5"]'
            >
              {[
                "Applied",
                "Phone Screen",
                "Interview",
                "Hired",
                "Rejected",
              ].map((status, index) => (
                <div className="col" key={index}>
                  <div className="card">
                    <div className="card-header">
                      <div className="float-end">
                        <span className="btn btn-sm btn-primary btn-icon count">
                          {
                            filteredApplications.filter(
                              (app) => (app.status || "Applied") === status
                            ).length
                          }
                        </span>
                      </div>
                      <h4 className="mb-0">{status}</h4>
                    </div>
                    <div
                      className="card-body kanban-box"
                      id={`kanban-blacklist-${index + 1}`}
                      data-id={index + 1}
                    >
                      {filteredApplications
                        .filter((app) => (app.status || "Applied") === status)
                        .map((app) => (
                          <div className="card" key={app._id}>
                            <div className="pt-3 ps-3"></div>
                            <div className="card-header border-0 pb-0 position-relative">
                              <h5>
                                <Link to="#">{app.name}</Link>
                              </h5>
                              <div className="card-header-right">
                                <div className="btn-group card-option">
                                  <button
                                    type="button"
                                    className="btn dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <PiDotsThreeOutlineVerticalThin />
                                  </button>
                                  <div className="dropdown-menu dropdown-menu-end">
                                    <Link
                                      to={`/dashboard/recruitment/job-application-view/${app._id}`}
                                      className="dropdown-item"
                                    >
                                      {/* <TbPencil /> */}
                                      <i className="ti ti-pencil"></i>
                                      <span className="ms-2">Edit</span>
                                    </Link>
                                    <Link
                                      to="#"
                                      className="dropdown-item"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDeleteDialog(app);
                                      }}
                                    >
                                      {/* <FaRegTrashAlt /> */}
                                      <i className="ti ti-trash"></i>
                                      <span className="ms-2">Delete</span>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="d-flex align-items-center justify-content-between">
                                <ul className="list-inline mb-0 mt-0">
                                  <li className="list-inline-item">
                                    <span className="static-rating static-rating-sm d-block">
                                      {[...Array(5)].map((_, index) => (
                                        <i
                                          key={index}
                                          className={`star fas fa-star ${
                                            index < app.rating ? "voted" : ""
                                          }`}
                                        ></i>
                                      ))}
                                    </span>
                                  </li>

                                  <li className="list-inline-item text-md ">
                                    {app.jobTitle}
                                  </li>
                                  <li className="list-inline-item">
                                    {/* <AiOutlineClockCircle /> */}
                                    <i className="ti ti-clock"></i>
                                    {`${formatDate(app.createdAt)}`}
                                  </li>
                                </ul>
                                <Link to="#" className="user-group">
                                  <img
                                    src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png"
                                    alt="Avatar"
                                    className="img-fluid rounded border-2 border border-primary"
                                    width="30px"
                                    style={{ height: "30px" }}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <span
                      className="empty-container"
                      data-placeholder="Empty"
                    ></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="app"
          id={appToDelete._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default JobApplicationMainContent;

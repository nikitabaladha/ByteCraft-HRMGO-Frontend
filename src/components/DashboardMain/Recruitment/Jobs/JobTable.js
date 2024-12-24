import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";


const JobTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAPI("/get-all-job"); // Replace with your API endpoint
        setJobs(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load jobs. Please try again.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const openDeleteDialog = (job) => { 
    console.log("Training form open delete function", job)
  setSelectedTraining(job);
  setIsDeleteDialogOpen(true);
};

const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTraining(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setJobs((prevApp) => prevApp.filter((job) => job._id !== _id));
  };


  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mb-3 mb-sm-0">
                  <div className="d-flex align-items-center">
                    <div className="badge theme-avtar bg-primary">
                      <i className="ti ti-briefcase"></i>
                    </div>
                    <div className="ms-3">
                      <small className="text-muted">Total</small>
                      <h6 className="m-0">Jobs</h6>
                    </div>
                  </div>
                </div>
                <div className="col-auto text-end">
                  <h4 className="m-0">{jobs.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active and Inactive Job Summary */}
        <div className="col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mb-3 mb-sm-0">
                  <div className="d-flex align-items-center">
                    <div className="badge theme-avtar bg-info">
                    <svg
                        xmlns="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/active.svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                      >
                        <rect width="20" height="20" fill="none"></rect>
                        <image
                          href="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/active.svg"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                        ></image>
                      </svg>
                    </div>
                    <div className="ms-3">
                      <small className="text-muted">Active</small>
                      <h6 className="m-0">Jobs</h6>
                    </div>
                  </div>
                </div>
                <div className="col-auto text-end">
                  <h4 className="m-0">
                    {jobs.filter((job) => job.status === "active").length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto mb-3 mb-sm-0">
                  <div className="d-flex align-items-center">
                    <div className="badge theme-avtar bg-warning">
                    <svg
                        xmlns="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/inactive.svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                      >
                        <rect width="20" height="20" fill="none"></rect>
                        <image
                          href="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/inactive.svg"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                        ></image>
                      </svg>
                    </div>
                    <div className="ms-3">
                      <small className="text-muted">Inactive</small>
                      <h6 className="m-0">Jobs</h6>
                    </div>
                  </div>
                </div>
                <div className="col-auto text-end">
                  <h4 className="m-0">
                    {jobs.filter((job) => job.status !== "active").length}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                  <div className="dataTable-top d-flex justify-content-between align-items-center">
                    <div className="dataTable-dropdown">
                      <label>
                        <select className="dataTable-selector">
                          <option value="5">5</option>
                          <option value="10" selected>
                            10
                          </option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                          <option value="25">25</option>
                        </select>{" "}
                        entries per page
                      </label>
                    </div>
                    <div className="dataTable-search">
                      <input
                        className="dataTable-input"
                        placeholder="Search..."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="dataTable-container">
                <table className="table dataTable-table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>Title</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id}>
                        <td>{job.branch}</td>
                        <td>{job.title}</td>
                        <td>{`${formatDate(job.startDate)}`}</td>
                        <td>{`${formatDate(job.endDate)}`}</td>
                        <td>
                          <span
                            className={`badge p-2 px-3 ${
                              job.status === "active"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="d-flex">
                            <Link
                              to={`/dashboard/recruitment/jobs/${job._id}`}
                              className="btn btn-sm bg-warning text-white mx-1"
                              title="View Job"
                              
                            >
                              <FaEye />
                            </Link>
                            <Link
                              to={`/dashboard/recruitment/job-edit/${job._id}`}
                              className="btn btn-sm bg-info text-white mx-1"
                              title="Edit Job"
                            >
                              <TbPencil />
                            </Link>
                            <button
                              className="btn btn-sm bg-danger text-white mx-1"
                              title="Delete Job"
                              onClick={() =>
                                openDeleteDialog(job)
                              }
                            >
                              <FaRegTrashAlt />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="dataTable-bottom d-flex justify-content-between align-items-center">
                  <div className="dataTable-info">
                    Showing 1 to {jobs.length} of {jobs.length} entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="job"
          id={selectedTraining._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
    
  );
};

export default JobTable;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import getAPI from '../../../../api/getAPI';

const JobCandidateTable = () => {
  const [applications, setApplications] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getAPI('/get-all-archive-application'); 
        setApplications(response.data.applications); 
      } catch (err) {
        setError('Failed to fetch job applications'); 
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <div className="dataTable-wrapper">
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
                        </select>{' '}
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
                          <th>Name</th>
                          <th>Applied For</th>
                          <th>Rating</th>
                          <th>Applied At</th>
                          <th>Resume</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applications.length > 0 ? (
                          applications.map((application) => (
                            <tr key={application._id}>
                              <td>
                                <Link className="btn btn-outline-primary" to="#">
                                  {application.name}
                                </Link>
                              </td>
                              <td>{application.jobTitle}</td>
                              <td>
                                <span className="static-rating static-rating-sm d-block">
                                {[...Array(5)].map((_, index) => (
                                          <i
                                            key={index}
                                            className={`star fas fa-star ${
                                              index < application.rating ? "voted" : ""
                                            }`}
                                          ></i>
                                        ))}
                                </span>
                              </td>
                              <td>{new Date(application.createdAt).toLocaleDateString()}</td>
                              <td>{application.resume ? <a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a> : '-'}</td>
                              <td>
                                <div className="dt-buttons">
                                  <div className="action-btn bg-warning">
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-bs-toggle="tooltip"
                                      title="Details"
                                      to={`/dashboard/recruitment/job-application-view/${application._id}`}
                                    >
                                      <span className="text-white">
                                        <FaEye />
                                      </span>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No archived job applications found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">Showing 1 to {applications.length} of {applications.length} entries</div>
                    <nav className="dataTable-pagination">
                      <ul className="dataTable-pagination-list"></ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCandidateTable;

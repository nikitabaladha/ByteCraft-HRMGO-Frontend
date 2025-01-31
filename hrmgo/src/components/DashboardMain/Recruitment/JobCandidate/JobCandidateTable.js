import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import getAPI from '../../../../api/getAPI';

const JobCandidateTable = () => {
  const [applications, setApplications] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainers = applications.filter((app) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = formatDate(app.createdAt).toLowerCase();
    
    return (
      app.name.toLowerCase().includes(searchTerm) ||
      app.jobTitle.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  
  

  return (
    <div className="row">
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header card-body table-border-style">
          <div className="table-responsive">
            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
              <div className="dataTable-top">
                <div className="dataTable-dropdown">
                  <label>
                    <select
                      className="dataTable-selector"
                      value={entriesPerPage}
                      onChange={handleEntriesPerPageChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      {paginatedTrainers.length > 0 ? (
                    paginatedTrainers.map((application) => (
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
                              <td>{`${formatDate(application.createdAt)}`}</td>
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
                      <div className="dataTable-info">
                        Showing{" "}
                        {Math.min(
                          (currentPage - 1) * entriesPerPage + 1,
                          applications.length
                        )}{" "}
                        to{" "}
                        {Math.min(
                          currentPage * entriesPerPage,
                          applications.length
                        )}{" "}
                        of {applications.length} entries
                      </div>
                      <nav className="dataTable-pagination">
                        <ul className="dataTable-pagination-list">
                          {currentPage > 1 && (
                            <li className="page-item">
                              <button
                                className="page-link prev-button"
                                onClick={() => setCurrentPage(currentPage - 1)}
                              >
                                ‹
                              </button>
                            </li>
                          )}

                          {Array.from(
                            {
                              length: Math.ceil(
                                applications.length / entriesPerPage
                              ),
                            },
                            (_, index) => (
                              <li
                                key={index + 1}
                                className={`page-item ${
                                  currentPage === index + 1 ? "active" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => setCurrentPage(index + 1)}
                                  style={{
                                    backgroundColor:
                                      currentPage === index + 1
                                        ? "#d9d9d9"
                                        : "transparent",
                                    color: "#6FD943",
                                  }}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            )
                          )}

                          {currentPage <
                            Math.ceil(applications.length / entriesPerPage) && (
                            <li className="page-item">
                              <button
                                className="page-link next-button"
                                onClick={() => setCurrentPage(currentPage + 1)}
                              >
                                ›
                              </button>
                            </li>
                          )}
                        </ul>
                      </nav>
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

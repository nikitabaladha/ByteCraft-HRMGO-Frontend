import { useState, useEffect } from "react";
import { TbPencil } from "react-icons/tb";
import {  FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import JobOnBoardingEdit from "./JobOnBoardingEdit";
import ConfirmationDialog from "../../ConfirmationDialog";
import { PiArrowsLeftRight } from "react-icons/pi";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const JobOnBoardingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState(null);
  const navigate = useNavigate();
  
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainers = data.filter((row) => {
    const searchTerm = searchQuery.toLowerCase();
    
    return (
      row.applicantName.toLowerCase().includes(searchTerm) ||
      row.applicatAppliedFor.toLowerCase().includes(searchTerm) ||
      row.jobBranch.toLowerCase().includes(searchTerm) ||
      formatDate(row.applicationCreatedAt).toLowerCase().includes(searchTerm) ||
      (row.joining_date && formatDate(row.joining_date).toLowerCase().includes(searchTerm)) ||
      row.status.toLowerCase().includes(searchTerm)
    );
  });

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {
    const fetchJobOnboardingData = async () => {
      try {
        const response = await getAPI("/get-all-job-boards");
        setData(response.data.jobOnboardings);
      } catch (error) {
        console.error("Error fetching job onboardings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobOnboardingData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (row) => {
    setSelectedTraining(row);
    setIsModalOpen(true);
  };

  const openDeleteDialog = (rowId) => {
    console.log("row Id", rowId);
    setAppToDelete(rowId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setAppToDelete(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setData((prevApp) => prevApp.filter((row) => row._id !== _id));
  };

  const handleConvertToEmployee = (row) => {
    navigate(`/dashboard/recruitment/convert-to-emoloyee/${row._id}`, {
      state: {
        name: row.applicantName,
        phone: row.applicantPhone,
        email: row.applicantEmail,
        address: row.applicantAddress,
        gender: row.applicantGender,
        dateOfBirth: row.applicantDOB,
        branch: row.jobBranch,
        applicationCreatedAt: row.applicationCreatedAt,
        dateOfJoining: row.joining_date,
      },
    });
  };

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
                        <th>Job</th>
                        <th>Branch</th>
                        <th>Applied At</th>
                        <th>Joining At</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {paginatedTrainers.length > 0 ? (
                    paginatedTrainers.map((row) => (
                        <tr key={row._id}>
                          <td>{row.applicantName}</td>
                          <td>{row.applicatAppliedFor}</td>
                          <td>{row.jobBranch}</td>
                          <td>
                            {`${formatDate(
                              row.applicationCreatedAt
                            )}`}
                          </td>
                          <td>
                            {`${formatDate(row.joining_date)}`}
                          </td>
                          <td>
                            <span
                              className={`badge p-2 px-3 ${
                                row.status === "cancel"
                                  ? "bg-danger"
                                  : row.status === "pending"
                                  ? "bg-warning"
                                  : row.status === "confirm"
                                  ? "bg-success"
                                  : "bg-success"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex">
                            {row.status === "confirm" && (
                              <button
                                className="btn bg-dark btn-sm me-2"
                                title="Convert to Employee"
                                onClick={() => handleConvertToEmployee(row)}
                              >
                                <span className="text-white">
                                  <PiArrowsLeftRight />
                                </span>
                              </button>
                            )}
                              <button
                                className="btn btn-info btn-sm me-2"
                                title="Edit"
                                onClick={() => handleEdit(row)}
                              >
                                <TbPencil />
                              </button>
                              <button
                                className="btn btn-danger btn-sm me-2"
                                title="Delete"
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(row);
                                }}
                              >
                                <FaRegTrashAlt />
                              </button>
                              {row.status === "confirm" && (
                                <>
                                <div>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                title="OfferLetter PDF"
                              >
                                <FiDownload />
                              </button>
                              </div>
                              <button
                                className="btn btn-primary btn-sm me-2"
                                title="OfferLetter DOC"
                              >
                              <FiDownload />
                              </button>
                              </>
                              )}
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
                  <div className="dataTable-bottom">
                      <div className="dataTable-info">
                        Showing{" "}
                        {Math.min(
                          (currentPage - 1) * entriesPerPage + 1,
                          data.length
                        )}{" "}
                        to{" "}
                        {Math.min(
                          currentPage * entriesPerPage,
                          data.length
                        )}{" "}
                        of {data.length} entries
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
                                data.length / entriesPerPage
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
                            Math.ceil(data.length / entriesPerPage) && (
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
      {isModalOpen && selectedTraining && (
        <JobOnBoardingEdit
          row={selectedTraining}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="row"
          id={appToDelete._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default JobOnBoardingTable;

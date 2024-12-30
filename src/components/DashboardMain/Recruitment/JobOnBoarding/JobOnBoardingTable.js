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
    const day = String(date.getDate()).padStart(2, "0"); // Ensures 2 digits for the day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensures 2 digits for the month
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body table-border-style">
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
                      {data.map((row) => (
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
                      ))}
                    </tbody>
                  </table>
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

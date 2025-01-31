import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import TrainingListUpdateModel from "./TrainingListUpdateModel";
import ConfirmationDialog from "../../ConfirmationDialog";
import { toast } from "react-toastify";
import { formatDate } from "../../../../js/custom";


const TrainingListTable = ({trainings, setTrainings, fetchTrainings}) => {
  // const [trainings, setTrainings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState(null); 
  const [siteCurrencySymbol, setCurrencySymbol] = useState("₹");
  const navigate = useNavigate(); 

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainers = trainings.filter((training) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedStartDate = formatDate(training.startDate).toLowerCase();
    const formattedEndDate = formatDate(training.endDate).toLowerCase();
    return (
      training.branch.toLowerCase().includes(searchTerm) || // Search in branch
      training.trainingType.toLowerCase().includes(searchTerm) || // Search in trainingType
      training.status.toLowerCase().includes(searchTerm) || // Search in status
      training.employee.toLowerCase().includes(searchTerm) || // Search in employee
      training.trainer.toLowerCase().includes(searchTerm) || // Search in trainer
      formattedStartDate.includes(searchTerm) || // Search in startDate
      formattedEndDate.includes(searchTerm) // Search in endDate
    );
  });

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  useEffect(() => {

    const fetchSystemSettings = async () => {
      try {
        const response = await getAPI("/get-system-setting");
        console.log("System settings", response.data.data);
        const fetchedSymbol = response.data.data.siteCurrencySymbol || "₹";
        setCurrencySymbol(fetchedSymbol); 
      } catch (error) {
        toast.error("Error fetching system settings: " + (error.response?.data?.message || error.message));
      }
    };

    fetchSystemSettings();
  }, []);

  const formatCost = (cost) => {
    return `${siteCurrencySymbol}${new Intl.NumberFormat("en-IN").format(cost)}`;
  };
  

const openDeleteDialog = (training) => { 
    console.log("Training form open delete function", training)
  setSelectedTraining(training);
  setIsDeleteDialogOpen(true);
};

  const handleEdit = (training) => {
    setSelectedTraining(training);
    setIsModalOpen(true); 
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTraining(null);
  };

  const handleView = (training) => {
    console.log("Navigating to view training:", training);
    navigate(`/dashboard/trainingList-View/${training._id}`, { state: training }); 
  };

 

  const handleDeleteConfirmed = (_id) => {
    setTrainings((prevApp) => prevApp.filter((training) => training._id !== _id));
  };

  const ActionButtons = ({ training }) => (
    <div className="d-flex gap-2">
      <div className="action-btn bg-warning">
        <button
          className="btn btn-sm align-items-center text-white"
          title="View"
          onClick={() => handleView(training)}
        >
          <FaEye />
        </button>
      </div>
      <div className="action-btn bg-info">
        <button
          className="btn btn-sm align-items-center text-white"
          title="Edit"
          onClick={() => handleEdit(training)}
        >
          <TbPencil />
        </button>
      </div>
      <div className="action-btn bg-danger">
        <button
         onClick={(e) => {
          e.preventDefault();
          openDeleteDialog(training);
        }}
          className=" btn btn-sm text-white"
          data-bs-toggle="tooltip"
          title="Delete"
        >
         
            <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );

  return (
    <>
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
                      <th>Branch</th>
                      <th>Training Type</th>
                      <th>Status</th>
                      <th>Employee</th>
                      <th>Trainer</th>
                      <th>Training Duration</th>
                      <th>Cost</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {paginatedTrainers.length > 0 ? (
                    paginatedTrainers.map((training) => (
                      <tr key={training._id}>
                        <td>{training.branch}</td>
                        <td>{training.trainingType}</td>
                        <td>
                          <span
                            className={`badge ${
                              training.status === "Pending"
                                ? "bg-warning"
                                : training.status === "Started"
                                ? "bg-primary"
                                : training.status === "Terminated"
                                ? "bg-danger"
                                : "bg-danger"
                            } p-2 px-3 mt-1`}
                          >
                            {training.status}
                          </span>
                        </td>
                        <td>{training.employee}</td>
                        <td>{training.trainer}</td>
                        <td>{`${formatDate(training.startDate)} to ${formatDate(
                          training.endDate
                        )}`}</td>
                        <td>{formatCost(training.trainingCost)}</td>
                        <td className="Action">
                          <ActionButtons training={training} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No trainers available.
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
                          trainings.length
                        )}{" "}
                        to{" "}
                        {Math.min(
                          currentPage * entriesPerPage,
                          trainings.length
                        )}{" "}
                        of {trainings.length} entries
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
                                trainings.length / entriesPerPage
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
                            Math.ceil(trainings.length / entriesPerPage) && (
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
      </div>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="training"
          id={selectedTraining._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
      {/* Modal for editing training */}
      {isModalOpen && selectedTraining && (
        <TrainingListUpdateModel
          training={selectedTraining}
          onClose={() => setIsModalOpen(false)}
          fetchTrainings={fetchTrainings()} 
        />
      )}
    </>
  );
};

export default TrainingListTable;


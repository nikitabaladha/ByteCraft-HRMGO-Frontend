import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
// import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";
// import deleteAPI from "../../../../api/deleteAPI";
import TrainingListUpdateModel from "./TrainingListUpdateModel";
import ConfirmationDialog from "./deleteConfirmation";

const TrainingListTable = () => {
  const [trainings, setTrainings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);// Modal visibility
  const [selectedTraining, setSelectedTraining] = useState(null); // Data of the selected training
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch training data from backend
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await getAPI("/training-list-get-all"); // Replace with your actual API endpoint
        setTrainings(response.data.data);
        console.log("TrainingList", response.data.data); // Assuming the data is in the 'trainings' field
      } catch (error) {
        console.error("Error fetching trainings:", error);
      }
    };
    fetchTrainings();
  }, []);

const openDeleteDialog = (training) => { 
    console.log("Training form open delete function", training)
  setSelectedTraining(training);
  setIsDeleteDialogOpen(true);
};

  const handleEdit = (training) => {
    setSelectedTraining(training);
    // Set the selected training
    setIsModalOpen(true); // Open the modal
  };

  const handleView = (training) => {
    console.log("Navigating to view training:", training);
    navigate(`/dashboard/trainingList-View/${training._id}`, { state: training }); 
    
    // Navigate to TrainingListView
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTraining(null);
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
          // onClick={() => openDeleteDialog(training._id)}
          onClick={() =>
            openDeleteDialog(training)
          }
          className=" btn btn-sm text-white"
          data-bs-toggle="tooltip"
          title="Delete"
        >
         
            <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const formatCost = (cost) => {
    return new Intl.NumberFormat("en-IN").format(cost);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
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
                <table className="table" id="pc-dt-simple">
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
                    {trainings.map((training) => (
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
                        <td>₹{formatCost(training.trainingCost)}</td>
                        <td className="Action">
                          <ActionButtons training={training} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="dataTable-bottom d-flex justify-content-between align-items-center">
                  <div className="dataTable-info">
                    Showing 1 to {trainings.length} of {trainings.length} entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {isDeleteDialogOpen && selectedTraining &&(
        <ConfirmationDialog training={selectedTraining}   onCancel={handleDeleteCancel}/>
      )}

      {/* Modal for editing training */}
      {isModalOpen && selectedTraining && (
        <TrainingListUpdateModel
          training={selectedTraining}
          onClose={() => setIsModalOpen(false)} // Close the modal
        />
      )}
    </>
  );
};

export default TrainingListTable;


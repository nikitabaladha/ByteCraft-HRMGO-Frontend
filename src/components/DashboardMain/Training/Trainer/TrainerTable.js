import React, { useState, useEffect } from "react";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import deleteAPI from "../../../../api/deleteAPI";
import { toast } from "react-toastify";
import TraineeViewModel from "./TraineeViewModel";
import TraineeUpdateDataModel from "./TraineeUpdateDataModel";
import putAPI from "../../../../api/putAPI";

const TrainerTable = () => {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal

  // Fetch trainers data from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAPI("/trainee-get-all", {}, true);
        if (response.data && response.data.data) {
          setTrainers(response.data.data);
        } else {
          toast.error("Failed to fetch trainers.");
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
        toast.error("An error occurred while fetching trainers.");
      }
    };

    fetchTrainers();
  }, []);

  // Handle view trainee
  const handleViewTrainee = async (id) => {
    try {
      const response = await getAPI(`/trainee-get-all/${id}`, {}, true);
      if (response.data && response.data.data) {
        setSelectedTrainee(response.data.data);
        setShowModal(true);
      } else {
        toast.error("Failed to fetch trainee details.");
      }
    } catch (error) {
      console.error("Error fetching trainee details:", error);
      toast.error("An error occurred while fetching trainee details.");
    }
  };

  // Delete Trainer Handler
  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid trainer ID.");
      return;
    }

    try {
      const response = await deleteAPI(`/traineeDelete/${id}`, {}, true, "DELETE");
      if (!response.hasError) {
        setTrainers((prev) => prev.filter((trainer) => trainer.id !== id));
        toast.success("Trainer deleted successfully.");
      } else {
        toast.error(response.error || "Failed to delete trainer.");
      }
    } catch (error) {
      console.error("Error deleting trainer:", error);
      toast.error("An error occurred while deleting the trainer.");
    }
  };

  // Handle Edit Trainer
  const handleEditTrainee = (trainee) => {
    setSelectedTrainee(trainee);
    setShowUpdateModal(true); // Open update modal
  };

  // Handle Update Trainer
  const handleUpdateTrainee = async (updatedData) => {
  try {
    // Construct the payload to send to the backend
    const payload = {
      branch: updatedData.branch,
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      contactNumber: updatedData.contactNumber,
      email: updatedData.email,
      expertise: updatedData.expertise,
      address: updatedData.address,
    };

    const response = await putAPI(`/trainee-update/${selectedTrainee.id}`, payload, true);

    if (response.data && response.data.success) {
      toast.success(response.data.message); // Show success message
      setShowUpdateModal(false); // Close the modal after updating
      // Update the local trainers list with the updated trainee data
      setTrainers((prevTrainers) =>
        prevTrainers.map((trainer) =>
          trainer.id === selectedTrainee.id ? { ...trainer, ...updatedData } : trainer
        )
      );
    } else {
      toast.error(response.data.error || "Failed to update trainee.");
    }
  } catch (error) {
    console.error("Error updating trainee:", error);
    toast.error("An error occurred while updating the trainee.");
  }
};

  // Action Buttons Component
  const ActionButtons = ({ trainer }) => (
    <div className="d-flex gap-2">
      <div className="action-btn bg-warning">
        <button
          className="btn btn-sm align-items-center text-white"
          title="View"
          onClick={() => handleViewTrainee(trainer.id)} // Fetch and show trainee details
        >
          <FaEye />
        </button>
      </div>
      <div className="action-btn bg-info">
        <button
          className="btn btn-sm align-items-center text-white"
          title="Edit"
          onClick={() => handleEditTrainee(trainer)} // Open the update modal
        >
          <TbPencil />
        </button>
      </div>
      <div className="action-btn bg-danger">
        <button
          className="btn btn-sm text-white"
          title="Delete"
          onClick={() => handleDelete(trainer.id)}
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
                  <table className="table dataTable-table">
                    <thead>
                      <tr>
                        <th>Branch</th>
                        <th>Full Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trainers.length > 0 ? (
                        trainers.map((trainer) => (
                          <tr key={trainer.id}>
                            <td>{trainer.branch}</td>
                            <td>{`${trainer.firstName} ${trainer.lastName}`}</td>
                            <td>{trainer.contactNumber}</td>
                            <td>{trainer.email}</td>
                            <td>
                              <ActionButtons trainer={trainer} />
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
                  <div className="dataTable-bottom d-flex justify-content-between align-items-center">
                  <div className="dataTable-info">
                    Showing 1 to {trainers.length} of {trainers.length} entries
                  </div>
                </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    

      {/* Trainee View Modal */}
      {showModal && selectedTrainee && (
        <TraineeViewModel
          trainee={selectedTrainee}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Trainee Update Modal */}
      {showUpdateModal && selectedTrainee && (
        <TraineeUpdateDataModel
          trainee={selectedTrainee}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateTrainee}
        />
      )}
    </>
  );
};

export default TrainerTable;

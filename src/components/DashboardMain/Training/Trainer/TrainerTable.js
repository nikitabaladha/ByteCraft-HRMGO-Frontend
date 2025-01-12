import React, { useState, useEffect } from "react";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
// import deleteAPI from "../../../../api/deleteAPI";
import { toast } from "react-toastify";
import TraineeViewModel from "./TraineeViewModel";
import TraineeUpdateDataModel from "./TraineeUpdateDataModel";
import putAPI from "../../../../api/putAPI";
import ConfirmationDialog from "../../ConfirmationDialog";

const TrainerTable = () => {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for update modal
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainers = trainers.filter((trainer) => {
    const searchTerm = searchQuery.toLowerCase();
    const fullName = `${trainer.firstName} ${trainer.lastName}`.toLowerCase();
    return (
      trainer.branch.toLowerCase().includes(searchTerm) ||
      trainer.email.toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm) ||
      trainer.contactNumber.includes(searchTerm)
    );
  });

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

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

  // Handle Edit Trainer
  const handleEditTrainee = (trainee) => {
    setSelectedTrainee(trainee);
    setShowUpdateModal(true); // Open update modal
  };

  const openDeleteDialog = (trainer) => {
    console.log("Training form open delete function", trainer);
    setSelectedTrainee(trainer);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTrainee(null);
  };

  const handleDeleteConfirmed = (id) => {
    setTrainers((prevApp) => prevApp.filter((trainer) => trainer.id !== id));
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

      const response = await putAPI(
        `/trainee-update/${selectedTrainee.id}`,
        payload,
        true
      );

      if (response.data && response.data.success) {
        toast.success(response.data.message); // Show success message
        setShowUpdateModal(false); // Close the modal after updating
        // Update the local trainers list with the updated trainee data
        setTrainers((prevTrainers) =>
          prevTrainers.map((trainer) =>
            trainer.id === selectedTrainee.id
              ? { ...trainer, ...updatedData }
              : trainer
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
          onClick={(e) => {
            e.preventDefault();
            openDeleteDialog(trainer);
          }}
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
                          <th>Full Name</th>
                          <th>Contact</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedTrainers.length > 0 ? (
                          paginatedTrainers.map((trainer) => (
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
                    <div className="dataTable-bottom">
                      <div className="dataTable-info">
                        Showing{" "}
                        {Math.min(
                          (currentPage - 1) * entriesPerPage + 1,
                          trainers.length
                        )}{" "}
                        to{" "}
                        {Math.min(
                          currentPage * entriesPerPage,
                          trainers.length
                        )}{" "}
                        of {trainers.length} entries
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
                                trainers.length / entriesPerPage
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
                            Math.ceil(trainers.length / entriesPerPage) && (
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
          deleteType="trainer"
          id={selectedTrainee.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

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

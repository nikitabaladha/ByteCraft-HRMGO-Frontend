import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import getAPI from "../../../../api/getAPI"; // Import your API utility
import { toast } from "react-toastify";

const TrainerTable = () => {
  // State for trainers data
  const [trainers, setTrainers] = useState([]);

  // Fetch trainers data from API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAPI("/trainee-get-all", {}, true); // Adjust endpoint if needed
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

  const ActionButtons = ({ trainerId }) => (
    <div className="d-flex gap-2">
      <div className="action-btn bg-warning">
        <Link
          to={`/trainer/${trainerId}`}
          className="btn btn-sm align-items-center"
          data-bs-toggle="tooltip"
          title="View"
        >
          <FaEye className="text-white" />
        </Link>
      </div>
      <div className="action-btn bg-info">
        <Link
          to={`/trainer/edit/${trainerId}`}
          className="btn btn-sm align-items-center"
          data-bs-toggle="tooltip"
          title="Edit"
        >
          <TbPencil className="text-white" />
        </Link>
      </div>
      <div className="action-btn bg-danger">
        <button
          type="button"
          className="btn btn-sm text-white"
          title="Delete"
          onClick={() => handleDelete(trainerId)}
        >
          <FaRegTrashAlt className="text-white" />
        </button>
      </div>
    </div>
  );

  const handleDelete = (trainerId) => {
    console.log("Deleting trainer with ID:", trainerId);
    // Implement delete functionality here
  };

  return (
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
                    {trainers.length > 0 ? (
                      trainers.map((trainer) => (
                        <tr key={trainer._id}>
                          <td>{trainer.branch}</td>
                          <td>{`${trainer.firstName} ${trainer.lastName}`}</td>
                          <td>{trainer.contactNumber}</td>
                          <td>{trainer.email}</td>
                          <td>
                            <ActionButtons trainerId={trainer._id} />
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
                    Showing {trainers.length} entries
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

export default TrainerTable;


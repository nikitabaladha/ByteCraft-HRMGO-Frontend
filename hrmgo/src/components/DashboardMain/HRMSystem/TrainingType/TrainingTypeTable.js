import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import EditTrainingTypeModal from "./EditTrainingTypeModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const TrainingTypeTable = ({
  trainingTypes,
  setTrainingTypes,
  fetchTrainingTypes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainingType, setSelectedTrainingType] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [trainingTypeToDelete, setTrainingTypeToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainingTypes = trainingTypes.filter((trainingType) => {
    const searchTerm = searchQuery.toLowerCase();
    return trainingType.trainingName.toLowerCase().includes(searchTerm);
  });

  const paginatedTrainingTypes = filteredTrainingTypes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openDeleteDialog = (trainingTypeId) => {
    setTrainingTypeToDelete(trainingTypeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTrainingTypeToDelete(null);
  };

  const handleDeleteSuccess = (deletedTrainingTypeId) => {
    setTrainingTypes((prevTrainingTypes) =>
      prevTrainingTypes.filter(
        (trainingType) => trainingType._id !== deletedTrainingTypeId
      )
    );
    closeDeleteDialog();
  };

  const handleEdit = (trainingType) => {
    setSelectedTrainingType(trainingType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrainingType(null);
  };

  return (
    <div className="row">
     <div className="col-12 col-md-3">
  <Sidebar />
</div>

      <div className="col-12 col-md-9">
        <div className="card">
          <div className="dataTable-top">
            <div className="dataTable-dropdown d-none d-md-block">
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
          <div className="card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-container">
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th data-sortable="">Training Type</th>
                        <th width="200px" data-sortable="">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTrainingTypes.map((trainingType) => (
                        <tr key={trainingType._id}>
                          <td>{trainingType.trainingName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(trainingType)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      {/* <HiOutlinePencil /> */}
                                      <i className="ti ti-pencil text-white"></i>
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form
                                    method="POST"
                                    
                                    acceptCharset="UTF-8"
                                    id={`delete-form`}
                                  >
                                    <input
                                      name="_method"
                                      type="hidden"
                                      value="DELETE"
                                    />
                                    <input
                                      name="_token"
                                      type="hidden"
                                      value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv"
                                    />
                                    <Link
                                      onClick={() =>
                                        openDeleteDialog(trainingType._id)
                                      }
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <span className="text-white">
                                        {/* <RiDeleteBinLine /> */}
                                        <i className="ti ti-trash text-white"></i>
                                      </span>
                                    </Link>
                                  </form>
                                </div>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="dataTable-bottom">
              <div className="dataTable-info d-none d-md-block">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  trainingTypes.length
                )}{" "}
                to{" "}
                {Math.min(currentPage * entriesPerPage, trainingTypes.length)}{" "}
                of {trainingTypes.length} entries
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
                      length: Math.ceil(trainingTypes.length / entriesPerPage),
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
                    Math.ceil(trainingTypes.length / entriesPerPage) && (
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

      {isModalOpen && (
        <EditTrainingTypeModal
          closeModal={handleCloseModal}
          trainingType={selectedTrainingType}
          fetchTrainingTypes={fetchTrainingTypes}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={trainingTypeToDelete}
          deleteType="trainingType"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default TrainingTypeTable;

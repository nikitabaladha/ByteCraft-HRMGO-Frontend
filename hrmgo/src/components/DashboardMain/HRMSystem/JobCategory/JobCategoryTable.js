import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import EditJobCategoryModal from "./EditJobCategoryModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const JobCategoryTable = ({
  jobCategories,
  setJobCategories,
  fetchJobCategories,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobCategory, setSelectedJobCategory] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [jobCategoryToDelete, setJobCategoryToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredJobCategories = jobCategories.filter((jobCategory) => {
    const searchTerm = searchQuery.toLowerCase();
    return jobCategory.jobCategory.toLowerCase().includes(searchTerm);
  });

  const paginatedJobCategories = filteredJobCategories.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openDeleteDialog = (jobCategoryId) => {
    setJobCategoryToDelete(jobCategoryId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setJobCategoryToDelete(null);
  };

  const handleDeleteSuccess = (deletedJobCategoryId) => {
    setJobCategories((prevJobCategories) =>
      prevJobCategories.filter(
        (jobCategory) => jobCategory._id !== deletedJobCategoryId
      )
    );
    closeDeleteDialog();
  };

  const handleEdit = (jobCategory) => {
    setSelectedJobCategory(jobCategory);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobCategory(null);
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
              <label className="text-dark">
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
                        <th data-sortable="">Job Category</th>
                        <th width="200px" data-sortable="">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedJobCategories.map((jobCategory) => (
                        <tr key={jobCategory._id}>
                          <td className="text-dark">{jobCategory.jobCategory}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(jobCategory)}
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
                                        openDeleteDialog(jobCategory._id)
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
              <div className="dataTable-info d-none d-md-block text-dark">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  jobCategories.length
                )}{" "}
                to{" "}
                {Math.min(currentPage * entriesPerPage, jobCategories.length)}{" "}
                of {jobCategories.length} entries
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
                      length: Math.ceil(jobCategories.length / entriesPerPage),
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
                    Math.ceil(jobCategories.length / entriesPerPage) && (
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
        <EditJobCategoryModal
          closeModal={handleCloseModal}
          jobCategory={selectedJobCategory}
          fetchJobCategories={fetchJobCategories}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={jobCategoryToDelete}
          deleteType="jobCategory"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default JobCategoryTable;

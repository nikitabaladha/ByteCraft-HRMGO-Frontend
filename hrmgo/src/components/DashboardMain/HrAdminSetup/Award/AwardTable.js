import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../../../Js/custom";

import UpdateAwardModal from "./UpdateAwardModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const AwardTable = ({
  awards,
  setAwards,
  selectedAward,
  setSelectedAward,
  updateAward,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredAwards = awards.filter((award) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(award.date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      award.employeeName.toLowerCase().includes(searchTerm) ||
      award.awardType.toLowerCase().includes(searchTerm) ||
      award.gift.toLowerCase().includes(searchTerm) ||
      award.description.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedAwards = filteredAwards.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleUpdate = (award) => {
    setSelectedAward(award);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (award) => {
    setSelectedAward(award);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAward(null);
  };

  const handleDeleteConfirmed = (id) => {
    setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
  };

  return (
    <>
      {" "}
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
                          <th>Employee</th>
                          <th>Award Type</th>
                          <th>Date</th>
                          <th>Gift</th>
                          <th>Description</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedAwards.map((award) => (
                          <tr key={award.id}>
                            <td>{award.employeeName}</td>
                            <td>{award.awardType}</td>
                            <td>{formatDate(award.date)}</td>
                            <td>{award.gift}</td>
                            <td>{award.description}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      className="mx-3 btn btn-sm  align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title=""
                                      data-title="Edit award"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(award)}
                                    >
                                      <span className="text-white">
                                        <TbPencil />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <form
                                      method="POST"
                                      acceptCharset="UTF-8"
                                      id={`delete-form-${award.id}`}
                                      onSubmit={(e) => e.preventDefault()}
                                    >
                                      <input
                                        name="_method"
                                        type="hidden"
                                        defaultValue="DELETE"
                                      />
                                      <Link
                                        href="#"
                                        className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                        data-bs-toggle="tooltip"
                                        title=""
                                        data-bs-original-title="Delete"
                                        aria-label="Delete"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          openDeleteDialog(award);
                                        }}
                                      >
                                        <span className="text-white">
                                          <FaRegTrashAlt />
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
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing{" "}
                      {Math.min(
                        (currentPage - 1) * entriesPerPage + 1,
                        awards.length
                      )}{" "}
                      to {Math.min(currentPage * entriesPerPage, awards.length)}{" "}
                      of {awards.length} entries
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
                          { length: Math.ceil(awards.length / entriesPerPage) },
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
                          Math.ceil(awards.length / entriesPerPage) && (
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
      {isUpdateModalOpen && setAwards && (
        <UpdateAwardModal
          award={selectedAward}
          onClose={() => setIsUpdateModalOpen(false)}
          updateAward={updateAward}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedAward && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="award"
          id={selectedAward.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default AwardTable;

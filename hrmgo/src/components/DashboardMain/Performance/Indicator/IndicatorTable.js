import { Link } from "react-router-dom";
import { TiEyeOutline } from "react-icons/ti";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import React, { useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import IndicatorDetailModal from "./IndicatorDetailModal.js";
import IndicatorUpdateModal from "./IndicatorUpdateModal.js";
import ConfirmationDialog from "../../ConfirmationDialog";
import { formatDate } from "../../../../Js/custom.js";

const IndicatorTable = ({
  indicators,
  setIndicators,
  selectedIndicator,
  setSelectedIndicator,
  updateIndicator,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isIndicatorUpdateModalOpen, setIsIndicatorUpdateModalOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredIndicators = indicators.filter((indicator) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(indicator.createdAt)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      indicator.branch.toLowerCase().includes(searchTerm) ||
      indicator.department.toLowerCase().includes(searchTerm) ||
      indicator.designation.toLowerCase().includes(searchTerm) ||
      indicator.addedBy.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });

  const paginatedIndicators = filteredIndicators.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openModal = async (indicator) => {
    try {
      const response = await getAPI(`/indicator/${indicator.id}`, {}, true);

      if (!response.hasError && response.data.data) {
        console.log("Indicator by ID: ", response.data.data);
        setSelectedIndicator(response.data.data);
        setIsDetailModalOpen(true);
      } else {
        console.error("Error fetching indicator detail");
      }
    } catch (err) {
      console.error("Error fetching Indicator Detail:", err);
    }
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsIndicatorUpdateModalOpen(false);
  };

  const openDeleteDialog = (indicator) => {
    setSelectedIndicator(indicator);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedIndicator(null);
  };

  const handleDeleteConfirmed = (id) => {
    setIndicators((prevIndicators) =>
      prevIndicators.filter((indicator) => indicator.id !== id)
    );
    setIsDeleteDialogOpen(false);
  };

  const handleUpdate = (indicator) => {
    setSelectedIndicator(indicator);
    setIsIndicatorUpdateModalOpen(true);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="text-warning fas fa-star" />);
    }
    if (halfStar) {
      stars.push(
        <i key="half" className="text-warning fas fa-star-half-alt" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fas fa-star" />);
    }

    return (
      <>
        {stars}
        <span className="theme-text-color">({rating})</span>
      </>
    );
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
                          <th>Branch</th>
                          <th>Department</th>
                          <th>Designation</th>
                          <th>Overall Rating</th>
                          <th>Added By</th>
                          <th>Created At</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedIndicators.map((indicator) => (
                          <tr key={indicator.id}>
                            <td>{indicator.branch}</td>
                            <td>{indicator.department}</td>
                            <td>{indicator.designation}</td>
                            <td>{renderStars(indicator.overAllRating)}</td>
                            <td>{indicator.addedBy}</td>
                            <td>{formatDate(indicator.createdAt)}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-warning me-2">
                                    <Link
                                      onClick={() => openModal(indicator)}
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title="Indicator Detail"
                                      data-bs-original-title="View"
                                    >
                                      <span className="text-white">
                                        <TiEyeOutline />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title="Edit Indicator"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(indicator)}
                                    >
                                      <span className="text-white">
                                        <LuPencil />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <form
                                      method="POST"
                                      acceptCharset="UTF-8"
                                      id={`delete-form-${indicator.id}`}
                                    >
                                      <input
                                        name="_method"
                                        type="hidden"
                                        defaultValue="DELETE"
                                      />
                                      <input
                                        name="_token"
                                        type="hidden"
                                        defaultValue="bv9JuUGnlZvo4e2tk0j8suLlMwPqxJ5lEkHaMTor"
                                      />
                                      <Link
                                        to="#"
                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                        data-bs-toggle="tooltip"
                                        title="Delete"
                                        data-bs-original-title="Delete"
                                        aria-label="Delete"
                                        onClick={() =>
                                          openDeleteDialog(indicator)
                                        }
                                      >
                                        <span className="text-white">
                                          <LuTrash2 />
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
                        indicators.length
                      )}{" "}
                      to{" "}
                      {Math.min(
                        currentPage * entriesPerPage,
                        indicators.length
                      )}{" "}
                      of {indicators.length} entries
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
                              indicators.length / entriesPerPage
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
                          Math.ceil(indicators.length / entriesPerPage) && (
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
      {/* Detail Dialog */}
      {isDetailModalOpen && (
        <IndicatorDetailModal
          closeModal={closeModal}
          indicator={selectedIndicator}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="indicator"
          id={selectedIndicator.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
      {/* Update Modal */}
      {isIndicatorUpdateModalOpen && (
        <IndicatorUpdateModal
          indicator={selectedIndicator}
          onClose={() => setIsIndicatorUpdateModalOpen(false)}
          updateIndicator={updateIndicator}
        />
      )}
    </>
  );
};

export default IndicatorTable;

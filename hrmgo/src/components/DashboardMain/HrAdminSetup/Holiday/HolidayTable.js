import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateHolidayModal from "./UpdateHolidayModal";
import ConfirmationDialog from "../../ConfirmationDialog";
import { formatDate } from "../../../../Js/custom";

const HolidayTable = ({
  holidays,
  setHolidays,
  selectedHoliday,
  setSelectedHoliday,
  updateHoliday,
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

  const filteredHolidays = holidays.filter((holiday) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(holiday.startDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    const endDate = new Date(holiday.endDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      holiday.occasion.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      endDate.includes(searchTerm)
    );
  });

  const handleUpdate = (holiday) => {
    setSelectedHoliday(holiday);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (holiday) => {
    setSelectedHoliday(holiday);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedHoliday(null);
  };

  const handleDeleteConfirmed = (id) => {
    setHolidays((prevHolidays) =>
      prevHolidays.filter((holiday) => holiday.id !== id)
    );
  };

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
                          <th>Occasion</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredHolidays.map((holiday) => (
                          <tr key={holiday.id}>
                            <td>{holiday.occasion}</td>
                            <td>{formatDate(holiday.startDate)}</td>
                            <td>{formatDate(holiday.endDate)}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center"
                                      onClick={() => handleUpdate(holiday)}
                                    >
                                      <span className="text-white">
                                        <TbPencil />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDeleteDialog(holiday);
                                      }}
                                    >
                                      <span className="text-white">
                                        <FaRegTrashAlt />
                                      </span>
                                    </Link>
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
                        holidays.length
                      )}{" "}
                      to{" "}
                      {Math.min(currentPage * entriesPerPage, holidays.length)}{" "}
                      of {holidays.length} entries
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
                            length: Math.ceil(holidays.length / entriesPerPage),
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
                          Math.ceil(holidays.length / entriesPerPage) && (
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

      {isUpdateModalOpen && selectedHoliday && (
        <UpdateHolidayModal
          holiday={selectedHoliday}
          onClose={() => setIsUpdateModalOpen(false)}
          updateHoliday={updateHoliday}
        />
      )}
      {isDeleteDialogOpen && selectedHoliday && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="holiday"
          id={selectedHoliday.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default HolidayTable;

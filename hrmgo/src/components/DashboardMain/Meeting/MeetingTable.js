import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import getAPI from "../../../api/getAPI";
import ConfirmationDialog from "./ConfirmationDialog";
import EditMeetingModal from "./EditMeetingmodal";

const MeetingTable = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

        /* entries pagination */

  const [entriesPerPage, setEntriesPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = (meeting) => {
    setSelectedMeeting(meeting);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMeeting(null);
  };

  const openDeleteDialog = (meetingId) => {
    setMeetingToDelete(meetingId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setMeetingToDelete(null);
  };

  const handleDeleteSuccess = (deletedMeetingId) => {
    setMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== deletedMeetingId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAPI("/meeting-getall", {}, true);
        setMeetings(response.data.meetings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Meetings");
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const searchTerm = searchQuery.toLowerCase();
  
    const formattedDate = new Date(meeting.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).toLowerCase();
    
    const formattedTime = new Date("1970-01-01T" + meeting.time).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase();
  
    return (
      meeting.title.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      formattedTime.includes(searchTerm)
    );
  });
  
  

  const paginatedMeetings = filteredMeetings.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dash-content">
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
                      <th>Meeting Title</th>
                      <th>Meeting Date</th>
                      <th>Meeting Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMeetings.map((meeting) => (
                      <tr key={meeting._id}>
                        <td>{meeting.title}</td>
                        <td>
                          {new Date(meeting.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>
                          {new Date("1970-01-01T" + meeting.time)
                            .toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .toUpperCase()}
                        </td>
                        <td className="Action">
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-info me-2">
                                <Link
                                  className="mx-3 btn btn-sm align-items-center"
                                  data-bs-toggle="tooltip"
                                  data-bs-original-title="Edit"
                                  onClick={() => openModal(meeting)}
                                >
                                  <span className="text-white">
                                    <HiOutlinePencil />
                                  </span>
                                </Link>
                              </div>
                              <div className="action-btn bg-danger">
                                <button
                                  type="button"
                                  className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  data-bs-original-title="Delete"
                                  onClick={() => openDeleteDialog(meeting._id)}
                                >
                                  <span className="text-white">
                                    <RiDeleteBinLine />
                                  </span>
                                </button>
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
                  Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredMeetings.length)}{" "}
                  to {Math.min(currentPage * entriesPerPage, filteredMeetings.length)}{" "}
                  of {filteredMeetings.length} entries
                </div>
                <nav className="dataTable-pagination">
                  <ul
                    className="dataTable-pagination-list"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      listStyleType: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  >

                    {currentPage > 1 && (
                      <li
                        className="page-item"
                        style={{
                          margin: '0 5px',
                        }}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          style={{
                            cursor: 'pointer',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#6FD943',
                          }}
                        >
                          ‹
                        </button>
                      </li>
                    )}

                    {Array.from({ length: Math.ceil(filteredMeetings.length / entriesPerPage) }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        style={{
                          margin: '0 5px',
                        }}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                          style={{
                            cursor: 'pointer',
                            padding: '6px 12px',
                            backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                            border: 'none',
                            color: '#6FD943',
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    {currentPage < Math.ceil(filteredMeetings.length / entriesPerPage) && (
                      <li
                        className="page-item"
                        style={{
                          margin: '0 5px',
                        }}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          style={{
                            cursor: 'pointer',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#6FD943',
                          }}
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          meetingId={meetingToDelete}
          deleteType="meeting"
          onDeleted={handleDeleteSuccess}
        />
      )}
      {showModal && selectedMeeting && (
        <EditMeetingModal closeModal={closeModal} meeting={selectedMeeting} />
      )}
    </div>
  );
};

export default MeetingTable;

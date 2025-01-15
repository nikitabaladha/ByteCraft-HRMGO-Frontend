import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiEyeOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import ViewModal from "./Viewmodal";
import getAPI from "../../../api/getAPI";
import ConfirmationDialog from "../ConfirmationDialog";
import dayjs from 'dayjs';
import { HiExternalLink } from "react-icons/hi";
import putAPI from "../../../api/putAPI";
import { toast } from 'react-toastify';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);


const ZoomMeetingTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateQuery, setDateQuery] = useState(""); // Add state for date filter
  const [statusQuery, setStatusQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredMeetings = meetings.filter((meeting) =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())||
    meeting.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedMeetings = filteredMeetings.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedMeeting(null);
  };

  const handleDeleteConfirmed = (id) => {
    setMeetings((prevMeetings) =>
      prevMeetings.filter((meeting) => meeting._id !== id)
    );
  };

  const openDeleteDialog = (meeting) => {
    setSelectedMeeting(meeting);
    setIsDeleteDialogOpen(true);
  };

  const toggleModal = (meeting) => {
    setSelectedMeeting(meeting);
    setModalOpen(!isModalOpen);
  };

  const handleStartMeeting = async (meetingId) => {
    try {
      const response = await putAPI(`/update_meeting_status/${meetingId}`, { status: "Starting" }, true);

      if (!response.hasError) {
        setMeetings((prevMeetings) =>
          prevMeetings.map((meeting) =>
            meeting._id === meetingId ? { ...meeting, status: "Starting" } : meeting
          )
        );
      } else {
        toast.error(`Failed to start meeting: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while starting the meeting.");
      console.error("Error starting meeting:", error);
    }
  };

  const updateMeetingStatus = async () => {
    const now = dayjs();
    setMeetings((prevMeetings) => {
      return prevMeetings.map((meeting) => {
        const meetingEnd = dayjs(meeting.start_date).add(meeting.duration, "minute");

        if (meeting.status === "Starting" && now.isAfter(meetingEnd)) {
          const updatedMeeting = { ...meeting, status: "Ended" };
          putAPI(`/update_meeting_status/${meeting._id}`, { status: "Ended" }, true)
            .catch((err) => console.error("Error updating meeting status on server:", err));
          return updatedMeeting;
        }
        return meeting;
      });
    });
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAPI("/getall_zoommeeting", {}, true);
        const updatedMeetings = response.data.meetings.map(meeting => ({
          ...meeting,
          status: meeting.status || "Waiting"
        }));
        setMeetings(updatedMeetings);
      } catch (err) {
        console.Error("Failed to fetch Meetings");
      }
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateMeetingStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const isMeetingScheduled = (startDate, duration) => {
    const meetingStart = dayjs(startDate);
    const meetingEnd = meetingStart.add(duration, "minute");
    const now = dayjs();

    return now.isBetween(meetingStart, meetingEnd, null, '[)');
  };


  return (
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
                      <th style={{ width: '33.37%' }}>Title</th>
                      <th style={{ width: '28.14%' }}>Meeting Time</th>
                      <th style={{ width: '16.23%' }}>Duration</th>
                      <th style={{ width: '13.34%' }}>User</th>
                      <th style={{ width: '24.17%' }}>Join URL</th>
                      <th style={{ width: '16.96%' }}>Status</th>
                      <th width="200px" style={{ width: '19.30%' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMeetings.map((meeting) => (
                      <tr key={meeting._id}>
                        <td>{meeting.title}</td>
                        <td>{dayjs(meeting.start_date).format("YYYY-MM-DD HH:mm")}</td>
                        <td>{meeting.duration} Minute</td>
                        <td>
                          <div className="user-group"></div>
                        </td>
                        <td>
                          {meeting.status !== "Ended" && isMeetingScheduled(meeting.start_date, meeting.duration) ? (
                            <a
                              href={meeting.join_url}
                              className="text-secondary"
                              onClick={() => handleStartMeeting(meeting._id)}
                            >
                              <p className="mb-0">
                                <b>Start meeting</b> <HiExternalLink />
                              </p>
                            </a>
                          ) : meeting.status === "Ended" ? (
                            <span className="text-secondary">Meeting has ended</span>
                          ) : (
                            <span className="text-secondary">Meeting not start</span>
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${meeting.status === "Ended"
                                ? "bg-danger"
                                : meeting.status === "Starting"
                                  ? "bg-success"
                                  : "bg-info"
                              } p-2 px-3`}
                          >
                            {meeting.status === "Ended" ? "Ended" : meeting.status === "Starting" ? "Starting" : "Waiting"}
                          </span>
                        </td>
                        <td>
                          <div className="dt-buttons">
                            <div className="action-btn bg-warning me-2">
                              <Link
                                className="mx-3 btn btn-sm align-items-center"
                                data-bs-toggle="tooltip"
                                title="View"
                                onClick={() => toggleModal(meeting)}
                              >
                                <span className="text-white">
                                  <TiEyeOutline className="text-white" />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-danger">
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  openDeleteDialog(meeting);
                                }}
                                className="mx-3 btn btn-sm align-items-center"
                                data-bs-toggle="tooltip"
                                title="Delete"
                              >
                                <span className="text-white">
                                  <RiDeleteBinLine />
                                </span>
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="dataTable-bottom">
                <div className="dataTable-info">
                  Showing {Math.min((currentPage - 1) * entriesPerPage + 1, meetings.length)}{" "}
                  to {Math.min(currentPage * entriesPerPage, meetings.length)}{" "}
                  of {meetings.length} entries
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

                    {Array.from({ length: Math.ceil(meetings.length / entriesPerPage) }, (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                          style={{
                            backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                            color: '#6FD943',
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}

                    {currentPage < Math.ceil(meetings.length / entriesPerPage) && (
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="zoommeeting"
          id={selectedMeeting._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
      {isModalOpen && (
        <ViewModal meeting={selectedMeeting} onClose={toggleModal} />
      )}
    </div>
  );
};

export default ZoomMeetingTable;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { TiEyeOutline } from "react-icons/ti";
// import { RiDeleteBinLine } from "react-icons/ri";
// import ViewModal from "./Viewmodal";
// import getAPI from "../../../api/getAPI";  
// import ConfirmationDialog from "../ConfirmationDialog";
// import dayjs from 'dayjs';  
// import { HiExternalLink } from "react-icons/hi";
// import putAPI from "../../../api/putAPI"; 
// import { toast } from 'react-toastify'; 

// const ZoomMeetingTable = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [meetings, setMeetings] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(""); 
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedMeeting, setSelectedMeeting] = useState(null);

//     /* entries pagination */

//     const [entriesPerPage, setEntriesPerPage] = useState(10); 
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");

    
//   const handleEntriesPerPageChange = (event) => {
//     setEntriesPerPage(Number(event.target.value));
//     setCurrentPage(1); // Reset to the first page
//   };

//   const filteredMeetings = meetings.filter((meeting) =>
//     meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedMeetings = filteredMeetings.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );


// const handleDeleteCancel = () => {
//   setIsDeleteDialogOpen(false);
//   setSelectedMeeting(null);
// };

// const handleDeleteConfirmed = (id) => {
//   setMeetings((prevMeetings) =>
//     prevMeetings.filter((meeting) => meeting._id !== id)
//   );
// };

// const openDeleteDialog = (meeting) => {
//   setSelectedMeeting(meeting);
//   setIsDeleteDialogOpen(true);
// };


//   const toggleModal = (meeting) => {
//     setSelectedMeeting(meeting);
//     setModalOpen(!isModalOpen);
//   };

//   // Function to handle meeting start click and update status
//   const handleStartMeeting = async (meetingId) => {
//     try {
//       const response = await putAPI(`/update_meeting_status/${meetingId}`, { status: "Starting" }, true);

//       if (!response.hasError) {
//         setMeetings((prevMeetings) =>
//           prevMeetings.map((meeting) =>
//             meeting._id === meetingId ? { ...meeting, status: "Starting" } : meeting
//           )
//         );
//       } else {
//         toast.error(`Failed to start meeting: ${response.message}`);
//       }
//     } catch (error) {
//       toast.error("An error occurred while starting the meeting.");
//       console.error("Error starting meeting:", error);
//     }
//   };

//   // Function to check if the meeting is over and update status to "Ended"
//   const updateMeetingStatus = async () => {
//     const now = dayjs();
//     setMeetings((prevMeetings) => {
//       return prevMeetings.map((meeting) => {
//         const meetingEnd = dayjs(meeting.start_date).add(meeting.duration, "minute");

//         if (meeting.status === "Starting" && now.isAfter(meetingEnd)) {
//           // If the meeting is over, update status to "Ended"
//           const updatedMeeting = { ...meeting, status: "Ended" };

//           // Send a PUT request to update the status on the server
//           putAPI(`/update_meeting_status/${meeting._id}`, { status: "Ended" }, true)
//             .catch((err) => console.error("Error updating meeting status on server:", err));

//           return updatedMeeting;
//         }
//         return meeting;
//       });
//     });
//   };

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const response = await getAPI("/getall_zoommeeting", {}, true);
//         const updatedMeetings = response.data.meetings.map(meeting => ({
//           ...meeting,
//           status: meeting.status || "Waiting" // Default status to "Waiting"
//         }));
//         setMeetings(updatedMeetings);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch Meetings");
//         setLoading(false);
//       }
//     };

//     fetchMeetings();
//   }, []);

//   useEffect(() => {
//     // Periodically check for meetings that need to be updated to "Ended"
//     const intervalId = setInterval(updateMeetingStatus, 60000); // Check every minute

//     return () => clearInterval(intervalId); // Cleanup interval on component unmount
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="dash-content">
//     <div className="card">
//       <div className="card-header card-body table-border-style">
//         <div className="table-responsive">
//           <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
//             <div className="dataTable-top">
//               <div className="dataTable-dropdown">
//                 <label>
//                   <select
//                     className="dataTable-selector"
//                     value={entriesPerPage}
//                     onChange={handleEntriesPerPageChange}
//                   >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="15">15</option>
//                     <option value="20">20</option>
//                     <option value="25">25</option>
//                   </select>{" "}
//                   entries per page
//                 </label>
//               </div>
//               <div className="dataTable-search">
//                 <input
//                   className="dataTable-input"
//                   placeholder="Search..."
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="dataTable-container">
//                 <table className="table dataTable-table" id="pc-dt-simple">
//                   <thead>
//                     <tr>
//                       <th style={{ width: '33.37%' }}>Title</th>
//                       <th style={{ width: '28.14%' }}>Meeting Time</th>
//                       <th style={{ width: '16.23%' }}>Duration</th>
//                       <th style={{ width: '13.34%' }}>User</th>
//                       <th style={{ width: '24.17%' }}>Join URL</th>
//                       <th style={{ width: '16.96%' }}>Status</th>
//                       <th width="200px" style={{ width: '19.30%' }}>
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {paginatedMeetings.map((meeting) => (
//                       <tr key={meeting._id}>
//                         <td>{meeting.title}</td>
//                         <td>{dayjs(meeting.start_date).format("YYYY-MM-DD HH:mm:ss")}</td>
//                         <td>{meeting.duration} Minute</td>
//                         <td>
//                           <div className="user-group">
//                             {/* Add images or avatars here */}
//                           </div>
//                         </td>
//                         <td>
//                           {meeting.status !== "Ended" ? (
//                             <a
//                               href={meeting.join_url}
//                               className="text-secondary"
//                               onClick={() => handleStartMeeting(meeting._id)}  // Call handleStartMeeting here
//                             >
//                               <p className="mb-0">
//                                 <b>Start meeting</b> <HiExternalLink />
//                               </p>
//                             </a>
//                           ) : (
//                             <span className="text-secondary">-</span>
//                           )}
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               meeting.status === "Ended"
//                                 ? "bg-danger"
//                                 : meeting.status === "Starting"
//                                 ? "bg-success"
//                                 : "bg-info"
//                             } p-2 px-3`}
//                           >
//                             {meeting.status === "Ended" ? "Ended" : meeting.status === "Starting" ? "Starting" : "Waiting"}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="dt-buttons">
//                             <div className="action-btn bg-warning me-2">
//                               <Link
//                                 className="mx-3 btn btn-sm align-items-center"
//                                 data-bs-toggle="tooltip"
//                                 title="View"
//                                 onClick={() => toggleModal(meeting)}
//                               >
//                                 <span className="text-white">
//                                   <TiEyeOutline className="text-white" />
//                                 </span>
//                               </Link>
//                             </div>
//                             <div className="action-btn bg-danger">
//                               <button
//                              onClick={(e) => {
//                               e.preventDefault();
//                               openDeleteDialog(meeting);
//                             }}
//                                 className="mx-3 btn btn-sm align-items-center"
//                                 data-bs-toggle="tooltip"
//                                 title="Delete"
//                               >
//                                 <span className="text-white">
//                                   <RiDeleteBinLine />
//                                 </span>
//                               </button>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="dataTable-bottom">
//                 <div className="dataTable-info">
//                   Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredMeetings.length)}{" "}
//                   to {Math.min(currentPage * entriesPerPage, filteredMeetings.length)}{" "}
//                   of {filteredMeetings.length} entries
//                 </div>
//                 <nav className="dataTable-pagination">
//                   <ul
//                     className="dataTable-pagination-list"
//                     style={{
//                       display: 'flex',
//                       justifyContent: 'center',
//                       listStyleType: 'none',
//                       padding: 0,
//                       margin: 0,
//                     }}
//                   >

//                     {currentPage > 1 && (
//                       <li
//                         className="page-item"
//                         style={{
//                           margin: '0 5px',
//                         }}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage - 1)}
//                           style={{
//                             cursor: 'pointer',
//                             padding: '8px 16px',
//                             borderRadius: '4px',
//                             backgroundColor: 'transparent',
//                             border: 'none',
//                             color: '#6FD943',
//                           }}
//                         >
//                           ‹
//                         </button>
//                       </li>
//                     )}

//                     {Array.from({ length: Math.ceil(filteredMeetings.length / entriesPerPage) }, (_, index) => (
//                       <li
//                         key={index + 1}
//                         className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
//                         style={{
//                           margin: '0 5px',
//                         }}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(index + 1)}
//                           style={{
//                             cursor: 'pointer',
//                             padding: '6px 12px',
//                             backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
//                             border: 'none',
//                             color: '#6FD943',
//                           }}
//                         >
//                           {index + 1}
//                         </button>
//                       </li>
//                     ))}

//                     {currentPage < Math.ceil(filteredMeetings.length / entriesPerPage) && (
//                       <li
//                         className="page-item"
//                         style={{
//                           margin: '0 5px',
//                         }}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage + 1)}
//                           style={{
//                             cursor: 'pointer',
//                             padding: '8px 16px',
//                             borderRadius: '4px',
//                             backgroundColor: 'transparent',
//                             border: 'none',
//                             color: '#6FD943',
//                           }}
//                         >
//                           ›
//                         </button>
//                       </li>
//                     )}
//                   </ul>
//                 </nav>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isDeleteDialogOpen && (
//   <ConfirmationDialog
//     onClose={handleDeleteCancel}
//     deleteType="zoommeeting"
//     id={selectedMeeting._id}
//     onDeleted={handleDeleteConfirmed}
//   />
// )}

//       {isModalOpen && (
//         <ViewModal meeting={selectedMeeting} onClose={toggleModal} />
//       )}
//     </div>
//   );
// };

// export default ZoomMeetingTable;



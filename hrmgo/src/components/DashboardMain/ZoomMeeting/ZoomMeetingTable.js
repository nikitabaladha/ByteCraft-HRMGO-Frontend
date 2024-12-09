import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TiEyeOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import ViewModal from "./Viewmodal";
import getAPI from "../../../api/getAPI";  
import ConfirmationDialog from "./ConfirmationDialog";
import dayjs from 'dayjs';  
import { HiExternalLink } from "react-icons/hi";

const ZoomMeetingTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [meetings, setMeetings] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);
  // const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAPI("/getall_zoommeeting", {}, true);
        setMeetings(response.data.meetings);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch Meetings");
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dash-content">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                  <div className="dataTable-top">
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
                        </select>{' '}
                        entries per page
                      </label>
                    </div>
                    <div className="dataTable-search">
                      <input className="dataTable-input" placeholder="Search..." type="text" />
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
                          <th width="200px" style={{ width: '19.30%' }}>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {meetings.map((meeting) => (
                          <tr key={meeting._id}>
                            <td>{meeting.title}</td>
                            <td>{dayjs(meeting.start_date).format("YYYY-MM-DD HH:mm:ss")}</td> 
                            <td>{meeting.duration} Minute</td>
                            <td>
                              <div className="user-group">
                                {/* Add images or avatars here */}
                              </div>
                            </td>
                            <td>
                              <a href={meeting.join_url} className="text-secondary">
                                <p className="mb-0">
                                  <b>Start meeting</b> <HiExternalLink /> 
                                </p>
                              </a>
                            </td>
                            <td>
                              <span className={`badge ${meeting.status === "End" ? "bg-danger" : "bg-info"} p-2 px-3`}>
                                {meeting.status}
                              </span>
                            </td>
                            <td>
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-warning me-2">
                                    <Link
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-bs-toggle="tooltip"
                                      title="View"
                                      onClick={toggleModal}
                                    >
                                      <span className="text-white">
                                        <TiEyeOutline className="text-white" />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <button
                                      onClick={() => openDeleteDialog(meeting._id)}
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
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
                </div>
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
      {isModalOpen && <ViewModal onClose={toggleModal} />}
    </div>
  );
};

export default ZoomMeetingTable;


// import React,{ useState } from 'react';
// import { Link } from 'react-router-dom';
// import { TiEyeOutline } from "react-icons/ti";
// import { RiDeleteBinLine } from "react-icons/ri";
// import ViewModal from "./Viewmodal";


// const ZoomMeetingTable = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
  

//   const toggleModal = () => {
//     setModalOpen(!isModalOpen);
//   };
//   return (
//     <div className="dash-content">
//     <div className="row">
//       <div className="col-xl-12">
//         <div className="card">
//           <div className="card-header card-body table-border-style">
//             <div className="table-responsive">
//               <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
//                 <div className="dataTable-top">
//                   <div className="dataTable-dropdown">
//                     <label>
//                       <select className="dataTable-selector">
//                         <option value="5">5</option>
//                         <option value="10" selected>
//                           10
//                         </option>
//                         <option value="15">15</option>
//                         <option value="20">20</option>
//                         <option value="25">25</option>
//                       </select>{' '}
//                       entries per page
//                     </label>
//                   </div>
//                   <div className="dataTable-search">
//                     <input className="dataTable-input" placeholder="Search..." type="text" />
//                   </div>
//                 </div>
//                 <div className="dataTable-container">
//                   <table className="table dataTable-table" id="pc-dt-simple">
//                     <thead>
//                       <tr>
//                         <th style={{ width: '33.37%' }}>Title</th>
//                         <th style={{ width: '28.14%' }}>Meeting Time</th>
//                         <th style={{ width: '16.23%' }}>Duration</th>
//                         <th style={{ width: '13.34%' }}>User</th>
//                         <th style={{ width: '24.17%' }}>Join URL</th>
//                         <th style={{ width: '16.96%' }}>Status</th>
//                         <th width="200px" style={{ width: '19.30%' }}>
//                           Action
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Reprehenderit quo er</td>
//                         <td>2024-11-17 17:00:00</td>
//                         <td>4 Minute</td>
//                         <td>
//                           <div className="user-group">
//                             <img
//                               alt="image"
//                               src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg"
//                               className="rounded-circle"
//                               width="25"
//                               height="25"
//                               title="Julie Lynn"
//                             />
//                           </div>
//                         </td>
//                         <td>-</td>
//                         <td>
//                           <span className="badge bg-danger p-2 px-3">End</span>
//                         </td>
//                         <td>
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-warning me-2">
//                                 <Link
//                                   // to="https://demo.workdo.io/hrmgo/zoom-meeting/1"
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="View"
//                                   onClick={toggleModal}
//                                 >
//                                   <span className="text-white">
//                                   <TiEyeOutline className="text-white" />
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <button
//                                   onClick={() => {
                                
//                                     alert('Delete');
//                                   }}
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="Delete"
//                                 >
//                                   <span className="text-white">
//                                   <RiDeleteBinLine />
//                                   </span>
//                                 </button>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>

//                       <tr>
//                         <td>Vero officiis tempor</td>
//                         <td>2024-12-01 13:49:00</td>
//                         <td>15 Minute</td>
//                         <td>
//                           <div className="user-group">
//                             <img
//                               alt="image"
//                               src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-2.jpg"
//                               className="rounded-circle"
//                               width="25"
//                               height="25"
//                               title="Lunea Todd"
//                             />
//                             <img
//                               alt="image"
//                               src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-3.jpg"
//                               className="rounded-circle"
//                               width="25"
//                               height="25"
//                               title="Ida F. Mullen"
//                             />
//                           </div>
//                         </td>
//                         <td>-</td>
//                         <td>
//                           <span className="badge bg-danger p-2 px-3">End</span>
//                         </td>
//                         <td>
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-warning me-2">
//                                 <Link
//                                   // to="https://demo.workdo.io/hrmgo/zoom-meeting/2"
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="View"
//                                   onClick={toggleModal}
//                                 >
//                                   <span className="text-white">
//                                   <TiEyeOutline className="text-white" />
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <button
//                                   onClick={() => {
                                    
//                                     alert('Delete');
//                                   }}
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="Delete"
//                                 >
//                                   <span className="text-white">
//                                   <RiDeleteBinLine />
//                                   </span>
//                                 </button>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>

//                       <tr>
//                         <td>General information</td>
//                         <td>2025-01-25 11:36:16</td>
//                         <td>20 Minute</td>
//                         <td>
//                           <div className="user-group">
//                             <img
//                               alt="image"
//                               src="https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-9.jpg"
//                               className="rounded-circle"
//                               width="25"
//                               height="25"
//                               title="Nyssa Sloan"
//                             />
//                           </div>
//                         </td>
//                         <td>
//                           <a
//                             href="https://us05web.zoom.us/s/81493773234?zak=..."
//                             className="text-secondary"
//                           >
//                             <p className="mb-0">
//                               <b>Start meeting</b> <i className="ti ti-external-link"></i>
//                             </p>
//                           </a>
//                         </td>
//                         <td>
//                           <span className="badge bg-info p-2 px-3">Waiting</span>
//                         </td>
//                         <td>
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-warning me-2">
//                                 <Link
//                                   // to="https://demo.workdo.io/hrmgo/zoom-meeting/3"
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="View"
//                                   onClick={toggleModal}
//                                 >
//                                   <span className="text-white">
//                                   <TiEyeOutline className="text-white" />
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <button
//                                   onClick={() => {
//                                     // Handle delete logic here
//                                     alert('Delete');
//                                   }}
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-bs-toggle="tooltip"
//                                   title="Delete"
//                                 >
//                                   <span className="text-white">
//                                   <RiDeleteBinLine />
//                                   </span>
//                                 </button>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     {isModalOpen && <ViewModal onClose={toggleModal} />}
//     </div>
//   );
// };

// export default ZoomMeetingTable;

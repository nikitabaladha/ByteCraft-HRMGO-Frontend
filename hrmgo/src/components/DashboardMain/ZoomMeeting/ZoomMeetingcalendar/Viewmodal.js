import React, { useState } from 'react';
import { HiExternalLink } from "react-icons/hi";
import putAPI from "../../../../api/putAPI"; 
import { toast } from 'react-toastify'; 

const ZoomMeetingModal = ({ meeting, onClose }) => {
  const [ setMeetings] = useState([]); 
  if (!meeting) {
    return null; 
  }
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

  return (
    <div
      className="modal fade show modal-overlay"
      id="commonModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Show Zoom Meeting Details</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="table-responsive">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td className="text-dark fw-bold">Name</td>
                    <td>{meeting.title}</td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">Meeting Id</td>
                    <td>{meeting.meeting_code}</td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">User</td>
                    <td>{meeting.employeeNames.join(' ')}</td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">Start Date</td>
                    <td>{new Date(meeting.start_date).toLocaleDateString('en-CA')}</td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">Duration</td>
                    <td>{meeting.duration}</td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">Start URL</td>
                    <td>
                          {meeting.status !== "Ended" ? (
                            <a
                              href={meeting.join_url}
                              className="text-secondary"
                              onClick={() => handleStartMeeting(meeting._id)}  
                            >
                              <p className="mb-0">
                                <b>Start meeting</b> <HiExternalLink />
                              </p>
                            </a>
                          ) : (
                            <span className="text-secondary">-</span>
                          )}
                        </td>
                  </tr>
                  <tr>
                    <td className="text-dark fw-bold">Status</td>
                    <td>
                          <span
                            className={`badge ${
                              meeting.status === "Ended"
                                ? "bg-danger"
                                : meeting.status === "Starting"
                                ? "bg-success"
                                : "bg-info"
                            } p-2 px-3`}
                          >
                            {meeting.status === "Ended" ? "Ended" : meeting.status === "Starting" ? "Starting" : "Waiting"}
                          </span>
                        </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeetingModal;

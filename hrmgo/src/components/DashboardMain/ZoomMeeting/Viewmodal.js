
import React, { useState, useEffect } from 'react';
import getAPI from "../../../api/getAPI";

const ZoomMeetingModal = ({ onClose }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const meeting = meetings[0];

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "block" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Show Zoom Meeting Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    {meeting ? (
                      <>
                        <tr>
                          <td className="text-dark fw-bold">Name</td>
                          <td>{meeting.title}</td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-bold">Meeting Id</td>
                          <td>{meeting.meetingId}</td>
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
                          <td>{meeting.startUrl || '-'}</td>
                        </tr>
                        <tr>
                          <td className="text-dark fw-bold">Status</td>
                          <td>
                            <span className={`badge bg-${meeting.status === 'End' ? 'danger' : 'success'} p-2 px-3`}>
                              {meeting.status}
                            </span>
                          </td>
                        </tr>
                      </>
                    ) : (
                      <tr>
                        <td colSpan="2">No meetings available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeetingModal;

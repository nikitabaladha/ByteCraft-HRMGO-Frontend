import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import putAPI from '../../../api/putAPI';
import 'react-toastify/dist/ReactToastify.css';

const EditMeetingModal = ({ closeModal, meeting }) => {
  const [formData, setFormData] = useState({
    title: meeting?.title || '',
    date: '', 
    time: meeting?.time || '',
    note: meeting?.note || ''
  });

  useEffect(() => {
    if (meeting?.date) {
      const formattedDate = new Date(meeting.date).toISOString().split('T')[0];
      setFormData((prevData) => ({
        ...prevData,
        date: formattedDate
      }));
    }
  }, [meeting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedMeeting = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      note: formData.note
    };
    
    try {
      const response = await putAPI(`/update_meeting/${meeting._id}`, updatedMeeting,true);

      if (!response.hasError) {
        toast.success("Ticket updated successfully!");
        closeModal();
      } else {
        toast.error(`Failed to update ticket: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating ticket.");
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="meetingModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: "0px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040,
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Meeting</h5>
            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">Meeting Title</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Meeting Title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      id="title"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="date" className="form-label">Meeting Date</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      id="date"
                    />
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="time" className="form-label">Meeting Time</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      name="time"
                      type="time"
                      value={formData.time}
                      onChange={handleChange}
                      id="time"
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="note" className="form-label">Meeting Note</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter Note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      id="note"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMeetingModal;

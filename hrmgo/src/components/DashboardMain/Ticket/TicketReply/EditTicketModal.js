import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import putAPI from "../../../../api/putAPI"; 
import getAPI from "../../../../api/getAPI";  

const EditTicketModal = ({ closeModal, ticketId }) => {
  const [title, setTitle] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [priority, setPriority] = useState('low');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState('close');
//   const [endDate, setEndDate] = useState('2024-12-02');
  const [employeeNames, setEmployeeNames] = useState([]);
  const [endDate, setEndDate] = useState('');

  // Fetch the employee names on mount
  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await getAPI('/employee-get-all-name', {}, true);
        if (response.data && !response.data.hasError) {
          setEmployeeNames(response.data.data);
        } else {
          toast.error("Failed to fetch employee names.");
        }
      } catch (error) {
        console.error("Error fetching employee names:", error);
        toast.error("An error occurred while fetching employee names.");
      }
    };

    fetchEmployeeNames();
  }, []);

  // Fetch ticket data based on ticketId when modal is opened
  useEffect(() => {
    if (ticketId) {
      const fetchTicketData = async () => {
        try {
          const response = await getAPI(`/ticket-get/${ticketId}`, {}, true);
          if (response.data && !response.data.hasError) {
            const ticket = response.data.ticket;
            setTitle(ticket.title);
            setEmployeeId(ticket.employee_name);
            setPriority(ticket.priority);
            setDescription(ticket.description);
            setStatus(ticket.status);
            setEndDate(ticket.end_date);  

            const formattedEndDate = new Date(ticket.end_date).toISOString().split('T')[0];
            setEndDate(formattedEndDate); 
            // Any other ticket-specific logic
          } else {
            toast.error("Failed to fetch ticket data.");
          }
        } catch (error) {
          console.error("Error fetching ticket data:", error);
          toast.error("An error occurred while fetching ticket data.");
        }
      };

      fetchTicketData();
    }
  }, [ticketId]); // Only run when ticketId changes

  // Handle description change (for ReactQuill)
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  // Handle form submission for PUT request
  const handleSubmit = async (event) => {
    event.preventDefault();

    const ticketData = new FormData();
    ticketData.append('title', title);
    ticketData.append('employee_name', employeeId);
    ticketData.append('priority', priority);
    ticketData.append('description', description);
    ticketData.append('status', status);
    ticketData.append('end_date', endDate);

    if (attachment) {
      ticketData.append('attachment', attachment); // Append the file if exists
    }

    try {
      const response = await putAPI(`/ticket-update/${ticketId}`, ticketData, true, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.hasError) {
        toast.success("Ticket updated successfully!");
        closeModal();
        // Reset form fields if needed
        setTitle('');
        setEmployeeId('');
        setPriority('low');
        setDescription('');
        setAttachment(null);
        setStatus('close');
        setEndDate('2024-12-02');
      } else {
        toast.error(`Failed to update ticket: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating ticket.");
    }
  };

  const handleEndDateChange = (e) => {
    // Ensure the end date is in the correct format (yyyy-mm-dd)
    const formattedDate = new Date(e.target.value).toISOString().split('T')[0];
    setEndDate(formattedDate);
  };
  
  

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block', paddingLeft: '0px', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Ticket</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="body">
            <form method="PUT" onSubmit={handleSubmit} encType="multipart/form-data" className="needs-validation" noValidate>
              <div className="modal-body">
                <div className="row">
                  {/* Ticket form fields */}
                  <div className="form-group col-md-6" style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="title" className="col-form-label">Subject</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Ticket Subject"
                      name="title"
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6" style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="employee_id" className="col-form-label">Ticket for Employee</label><span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      id="employee_id"
                      name="employee_id"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    >
                      <option value="" disabled>Account Name</option>
                      {employeeNames.map((employee) => (
                        <option key={employee._id} value={employee.name}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Priority and End Date */}
                  <div className="form-group col-md-6">
                    <label htmlFor="priority" className="col-form-label">Priority</label><span className="text-danger">*</span>
                    <select
                      name="priority"
                      className="form-control"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="end_date" className="col-form-label">End Date</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      autoComplete="off"
                      name="end_date"
                      type="date"
                      value={endDate || ''}
                      onChange={handleEndDateChange}
                    />
                  </div>
                  {/* Description */}
                  <div className="form-group col-md-12" style={{ marginBottom: '1.9rem' }}>
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <ReactQuill
                      value={description}
                      onChange={handleDescriptionChange}
                      theme="snow"
                      placeholder="Enter the ticket description here"
                      style={{ height: '200px', maxHeight: '300px', minHeight: '200px', marginBottom: '1.5rem' }}
                    />
                  </div>
                </div>
                {/* File input for attachment */}
                <div className="row">
                  <div className="form-group col-md-6" style={{ marginBottom: '1.5rem' }}>
                    <label htmlFor="attachment" className="form-label">Attachments</label>
                    <input
                      type="file"
                      name="attachment"
                      id="attachment"
                      className="form-control"
                      onChange={(e) => setAttachment(e.target.files[0])}
                    />
                  </div>
                </div>
                {/* Status */}
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="status" className="col-form-label">Status</label>
                  <select
                    name="status"
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="close">Close</option>
                    <option value="open">Open</option>
                    <option value="onhold">On Hold</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>
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

export default EditTicketModal;

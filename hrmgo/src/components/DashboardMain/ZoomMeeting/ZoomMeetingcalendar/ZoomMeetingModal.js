import React, { useState, useEffect } from "react"; 
import { toast } from "react-toastify"; 
import postAPI from "../../../../api/postAPI"; 
import getAPI from "../../../../api/getAPI"; 
import Select from "react-select"; 

const ZoomMeetingModal = ({ onClose }) => {
  const [employeeNames, setEmployeeNames] = useState([]);

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

  const [formData, setFormData] = useState({
    title: "",
    user_id: [],
    start_date: "",
    duration: "",
    password: "",
    synchronize_type: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      start_date: e.target.value,
    }));
  };

  const handleUserChange = (selectedOptions) => {
    const selectedUserNames = selectedOptions ? selectedOptions.map(option => option.label) : [];  
    setFormData((prev) => ({
      ...prev,
      user_id: selectedUserNames,
    }));
  };

  const employeeOptions = employeeNames.map((employee) => ({
    value: employee._id,
    label: employee.name,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const zoomMeetingData = {
      title: formData.title,
      employeeNames: formData.user_id,
      start_date: formData.start_date,
      duration: formData.duration,
      password: formData.password || "",  
      join_url: "", 
      status: "Waiting", 
    };

    try {
      const response = await postAPI('/create_zoommeeting', zoomMeetingData, true); 
      if (!response.hasError) {
        toast.success("Zoom Meeting Created Successfully");
        onClose(); 
      } else {
        toast.error(`Failed to create Zoom meeting: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the Zoom meeting.");
    }
  };

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "block" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Zoom Meeting</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} method="POST" action="https://demo.workdo.io/hrmgo/zoom-meeting" acceptCharset="UTF-8" encType="multipart/form-data" autoComplete="off" className="needs-validation" noValidate>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="title" className="form-label">Title</label><span className="text-danger">*</span>
                    <div className="form-icon-user">
                      <input className="form-control" placeholder="Enter Meeting Title" required name="title" type="text" id="title" value={formData.title} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="user_id" className="form-label">Users</label><span className="text-danger">*</span>
                    <div className="form-icon-user">
                      <Select
                        isMulti
                        options={employeeOptions}
                        onChange={handleUserChange}
                        value={employeeOptions.filter(option => formData.user_id.includes(option.label))}
                        placeholder="Select Users"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="start_date" className="form-label">Start Date</label><span className="text-danger">*</span>
                    <div className="form-icon-user">
                      <input className="form-control datetime-local" required id="current_date" name="start_date" type="datetime-local" value={formData.start_date} onChange={handleDateChange} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="duration" className="form-label">Duration</label><span className="text-danger">*</span>
                    <div className="form-icon-user">
                      <input className="form-control" placeholder="Enter duration" required min="0" name="duration" type="number" id="duration" value={formData.duration} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="form-icon-user">
                      <input className="form-control" placeholder="Enter Password" name="password" type="password" id="password" value={formData.password} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="synchronize_type" className="form-label">Synchronize in Google Calendar?</label>
                  <div className="form-switch">
                    <input type="checkbox" className="form-check-input mt-2" name="synchronize_type" id="switch-shadow" value="google_calender" checked={formData.synchronize_type} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="switch-shadow"></label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomMeetingModal;

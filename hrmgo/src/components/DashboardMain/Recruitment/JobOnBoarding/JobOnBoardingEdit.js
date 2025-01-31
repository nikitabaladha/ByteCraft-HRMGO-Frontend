import React, { useState } from 'react';
import putAPI from '../../../../api/putAPI';
import { toast } from "react-toastify";

const JobOnBoardingEdit = ({row, onClose}) => {
    const formatDateForInput = (date) => {
        if (!date) return ""; 
        const parsedDate = new Date(date); 
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(parsedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
  const [formData, setFormData] = useState({
    joining_date: formatDateForInput(row.joining_date),
    days_of_week: row.days_of_week || "",
    salary: row.salary || "",
    salary_type: row.salary_type || "",
    salary_duration: row.salary_duration || "",
    job_type: row.job_type || "",
    status: row.status || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
        const response = await putAPI(`/update-job-on-board/${row._id}`, formData);
        
        toast(response.data.message || "Job On Board updated successfully!");
        onClose(); 
      } catch (error) {
        console.error("Error updating training:", error);
        toast(error.response?.data?.message || "Failed to update Job On Board");
      }
  };

  return (
    <div>
      <div className="modal fade show" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Job On-Boarding</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-md-12">
                    <label htmlFor="joining_date" className="col-form-label">Joining Date</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      autoComplete="off"
                      name="joining_date"
                      type="date"
                      value={formData.joining_date}
                      onChange={handleInputChange}
                      id="joining_date"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="days_of_week" className="col-form-label">Days Of Week</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      autoComplete="off"
                      placeholder="Enter Days Of Week"
                      name="days_of_week"
                      type="text"
                      value={formData.days_of_week}
                      onChange={handleInputChange}
                      id="days_of_week"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="salary" className="col-form-label">Salary</label><span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      autoComplete="off"
                      placeholder="Enter Salary"
                      name="salary"
                      type="text"
                      value={formData.salary}
                      onChange={handleInputChange}
                      id="salary"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="salary_type" className="col-form-label">Salary Type</label><span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      name="salary_type"
                      value={formData.salary_type}
                      onChange={handleInputChange}
                      id="salary_type"
                    >
                      <option value="Monthly Payslip">Monthly Payslip</option>
                      <option value="Hourly Payslip">Hourly Payslip</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="salary_duration" className="col-form-label">Salary Duration</label><span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      name="salary_duration"
                      value={formData.salary_duration}
                      onChange={handleInputChange}
                      id="salary_duration"
                    >
                      <option value="">Select Salary Duration</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="job_type" className="col-form-label">Job Type</label><span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      name="job_type"
                      value={formData.job_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Job Type</option>
                      <option value="full time">Full Time</option>
                      <option value="part time">Part Time</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="status" className="col-form-label">Status</label><span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      id="status"
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="cancel">Cancel</option>
                      <option value="confirm">Confirm</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOnBoardingEdit;

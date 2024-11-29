import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdateComplaintModal = ({ complaint, onClose }) => {
  const [complaintFrom, setComplaintFrom] = useState(
    complaint?.complaintFrom || ""
  );
  const [complaintAgainst, setComplaintAgainst] = useState([]);
  const [complaintAgainstId, setComplaintAgainstId] = useState(
    complaint?.complaintAgainstId || ""
  );
  const [title, setTitle] = useState(complaint?.title || "");
  const [complaintDate, setComplaintDate] = useState(
    new Date(complaint?.complaintDate || "")
  );
  const [description, setDescription] = useState(complaint?.description || "");

  useEffect(() => {
    if (complaint) {
      setTitle(complaint.title);
      setComplaintDate(new Date(complaint.complaintDate));
      setDescription(complaint.description);
      setComplaintAgainstId(complaint.complaintAgainstId);
      setComplaintFrom(complaint.complaintFrom);
    }
  }, [complaint]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI("/employee-get-all-name", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setComplaintAgainst(response.data.data);
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (err) {
        toast.error("Error fetching employee data.");
      }
    };
    fetchEmployeeData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedComplaint = {
      title,
      complaintDate: complaintDate.toISOString().split("T")[0],
      description,
      complaintAgainstId: complaintAgainstId || complaint.complaintAgainstId,
    };

    try {
      const response = await putAPI(
        `/complaint/${complaint.id}`,
        updatedComplaint,
        true
      );
      if (!response.hasError) {
        toast.success("Complaint updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update Complaint.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Complaint.");
    }
  };

  const handleDateChange = (date) => {
    setComplaintDate(date);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalDialog = document.querySelector(".modal-dialog");
      if (modalDialog && !modalDialog.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Complaint
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body">
            <form
              method="POST"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate
              onSubmit={handleUpdate}
            >
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="employee_id" className="col-form-label">
                      Complaint From
                    </label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={complaintFrom}
                      onChange={(e) => setComplaintFrom(e.target.value)}
                      disabled
                      aria-readonly
                    >
                      <option value={complaintFrom}>{complaintFrom}</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label
                      htmlFor="complaintAgainstId"
                      className="col-form-label"
                    >
                      Complaint Against
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="complaintAgainstId"
                      value={complaintAgainstId}
                      onChange={(e) => setComplaintAgainstId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Employee
                      </option>
                      {complaintAgainst.map((com) => (
                        <option key={com._id} value={com._id}>
                          {com.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="title" className="col-form-label">
                      Complaint Title
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      id="title"
                      name="ComplaintTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Complaint Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={complaintDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required
                        name="complaintDate"
                        type="text"
                        id="complaintDate"
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-12">
                    <label htmlFor="description" className="col-form-label">
                      Description
                    </label>
                    <span className="text-danger">*</span>
                    <textarea
                      className="form-control"
                      placeholder="Enter Description"
                      rows={3}
                      required
                      name="description"
                      cols={50}
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateComplaintModal;

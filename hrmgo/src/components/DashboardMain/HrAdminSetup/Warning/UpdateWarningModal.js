import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdateWarningModal = ({ warning, onClose }) => {
  const [warningBy, setWarningBy] = useState(warning?.warningBy || "");
  const [warningTo, setWarningTo] = useState([]);
  const [warningToId, setWarningToId] = useState(warning?.warningToId || "");
  const [subject, setSubject] = useState(warning?.subject || "");
  const [warningDate, setWarningDate] = useState(
    new Date(warning?.warningDate || "")
  );
  const [description, setDescription] = useState(warning?.description || "");

  useEffect(() => {
    if (warning) {
      setSubject(warning.subject);
      setWarningDate(new Date(warning.warningDate));
      setDescription(warning.description);
      setWarningToId(warning.warningToId);
      setWarningBy(warning.warningBy);
    }
  }, [warning]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI("/employee-get-all-name", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setWarningTo(response.data.data);
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

    const updatedWarning = {
      subject,
      warningDate: warningDate.toISOString().split("T")[0],
      description,
      warningToId: warningToId || warning.warningToId,
    };

    try {
      const response = await putAPI(
        `/warning/${warning.id}`,
        updatedWarning,
        true
      );
      if (!response.hasError) {
        toast.success("warning updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update warning.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleDateChange = (date) => {
    setWarningDate(date);
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
              Edit Warning
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
                      Warning By
                    </label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={warningBy}
                      onChange={(e) => setWarningBy(e.target.value)}
                      disabled
                      aria-readonly
                    >
                      <option value={warningBy}>{warningBy}</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label
                      htmlFor="warningAgainstId"
                      className="col-form-label"
                    >
                      Warning To
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="warningToId"
                      value={warningToId}
                      onChange={(e) => setWarningToId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Employee
                      </option>
                      {warningTo.map((com) => (
                        <option key={com._id} value={com._id}>
                          {com.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="subject" className="col-form-label">
                      Subject
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Warning Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={warningDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required
                        name="warningDate"
                        type="text"
                        id="warningDate"
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

export default UpdateWarningModal;

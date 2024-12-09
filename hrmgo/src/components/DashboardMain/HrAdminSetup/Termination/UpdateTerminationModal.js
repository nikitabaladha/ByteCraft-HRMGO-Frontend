import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";

const UpdateTerminationModal = ({ termination, onClose }) => {
  const [employeeName, setEmployeeName] = useState(
    termination?.employeeName || ""
  );
  const [terminationType, setTerminationType] = useState(
    termination?.terminationType || ""
  );
  const [noticeDate, setNoticeDate] = useState(
    termination?.noticeDate ? new Date(termination.noticeDate) : new Date()
  );
  const [terminationDate, setTerminationDate] = useState(
    termination?.terminationDate
      ? new Date(termination.terminationDate)
      : new Date()
  );
  const [description, setDescription] = useState(
    termination?.description || ""
  );

  useEffect(() => {
    if (termination) {
      setTerminationType(termination.terminationType);
      setNoticeDate(
        termination.noticeDate ? new Date(termination.noticeDate) : new Date()
      );
      setTerminationDate(
        termination.terminationDate
          ? new Date(termination.terminationDate)
          : new Date()
      );
      setDescription(termination.description);
    }
  }, [termination]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated Termination data
    const updatedTermination = {
      terminationType,
      noticeDate: noticeDate.toISOString().split("T")[0],
      terminationDate: terminationDate.toISOString().split("T")[0],
      description,
    };

    try {
      const response = await putAPI(
        `/termination/${termination.id}`,
        updatedTermination,
        true
      );
      console.log("Updated Termination: " + JSON.stringify(response));

      if (!response.hasError) {
        toast.success("Termination updated successfully!");
        console.log("Termination updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update Termination.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Termination.");
    }
  };

  const handleNoticeDateChange = (date) => {
    setNoticeDate(date);
  };

  const handleTerminationDateChange = (date) => {
    setTerminationDate(date);
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
              Edit Termination
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body">
            <form
              method="POST"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate=""
              onSubmit={handleUpdate}
            >
              <div className="modal-body">
                <div className="row">
                  <div className="form-group col-md-6 col-lg-6 ">
                    <label htmlFor="employee_id" className="col-form-label">
                      Employee
                    </label>
                    <input
                      className="form-control"
                      name="employeeName"
                      value={employeeName}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label
                      htmlFor="Termination_type"
                      className="col-form-label"
                    >
                      Termination Type
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required="required"
                      id="termination_type"
                      name="terminationType"
                      value={terminationType}
                      onChange={(e) => setTerminationType(e.target.value)}
                    >
                      <option value="">Select Termination</option>
                      <option value="Test Termination">Test Termination</option>
                      <option value="Voluntary Termination">
                        Voluntary Termination
                      </option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Notice Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={noticeDate}
                        onChange={handleNoticeDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="noticeDate"
                        type="text"
                        id="noticeDate"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Termination Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={terminationDate}
                        onChange={handleTerminationDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="terminationDate"
                        type="text"
                        id="terminationDate"
                        style={{
                          width: "100%",
                        }}
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
                      required="required"
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

export default UpdateTerminationModal;
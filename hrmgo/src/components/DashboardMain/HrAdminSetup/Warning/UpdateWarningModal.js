import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdateWarningModal = ({ warning, onClose, updateWarning }) => {
  const [warningBy, setWarningBy] = useState(warning?.warningBy || "");
  const [warningTo, setWarningTo] = useState([]);
  const [warningToId, setWarningToId] = useState(warning?.warningToId || "");
  const [subject, setSubject] = useState(warning?.subject || "");
  const [warningDate, setWarningDate] = useState(
    warning?.warningDate
      ? new Date(warning.warningDate).toISOString().split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(warning?.description || "");

  useEffect(() => {
    if (warning) {
      setSubject(warning.subject);
      setWarningDate(
        warning.warningDate
          ? new Date(warning.warningDate).toISOString().split("T")[0]
          : ""
      );
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

          // **Set the already present "Warning To" when modal opens**
          const selectedEmployee = response.data.data.find(
            (emp) => emp._id === warning.warningToId
          );
          if (selectedEmployee) {
            setWarningToId(selectedEmployee._id);
          }
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (err) {
        toast.error("Error fetching employee data.");
      }
    };
    fetchEmployeeData();
  }, [warning]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedWarning = {
      subject,
      warningDate,
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
        toast.success("Warning updated successfully!");

        const selectedWarningTo = warningTo.find(
          (emp) => emp._id === warningToId
        );
        const newWarningToName = selectedWarningTo
          ? selectedWarningTo.name
          : "";

        const newUpdatedWarning = {
          id: response.data.data._id,
          description: response.data.data.description,
          warningBy: warningBy,
          warningTo: newWarningToName,
          subject: response.data.data.subject,
          warningDate: response.data.data.warningDate,
          warningToId: response.data.data.warningToId,
        };

        updateWarning(newUpdatedWarning);
        onClose();
      } else {
        toast.error("Failed to update warning.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

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
                    <label htmlFor="employee_id" className="col-form-label text-dark">
                      Warning By
                    </label>
                    <select
                      className="form-control"
                      name="employeeId"
                      value={warningBy}
                      disabled
                      aria-readonly
                    >
                      <option value={warningBy}>{warningBy}</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label
                      htmlFor="warningAgainstId"
                      className="col-form-label text-dark"
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
                    <label htmlFor="subject" className="col-form-label text-dark">
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
                    <label htmlFor="date" className="col-form-label text-dark">
                      Warning Date
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      value={warningDate}
                      onChange={(e) => setWarningDate(e.target.value)}
                      className="form-control"
                      autoComplete="off"
                      required
                      name="warningDate"
                      type="date"
                      id="warningDate"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="description" className="col-form-label text-dark">
                      Description
                    </label>
                    <span className="text-danger">*</span>
                    <textarea
                      className="form-control"
                      placeholder="Enter Description"
                      rows={3}
                      required
                      name="description"
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

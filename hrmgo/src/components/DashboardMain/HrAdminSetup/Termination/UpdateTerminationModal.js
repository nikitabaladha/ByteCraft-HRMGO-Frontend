import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";
const UpdateTerminationModal = ({
  termination,
  onClose,
  updateTermination,
}) => {
  const [employeeName, setEmployeeName] = useState(
    termination?.employeeName || ""
  );
  const [terminationTypeId, setTerminationTypeId] = useState(
    termination?.terminationTypeId || ""
  );
  const [terminationType, setTerminationType] = useState(
    termination?.terminationType || ""
  );

  const [noticeDate, setNoticeDate] = useState(
    termination?.noticeDate
      ? new Date(termination.noticeDate).toISOString().split("T")[0]
      : ""
  );
  const [terminationDate, setTerminationDate] = useState(
    termination?.terminationDate
      ? new Date(termination.terminationDate).toISOString().split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(
    termination?.description || ""
  );

  const [terminationTypes, setTerminationTypes] = useState([]);

  useEffect(() => {
    const fetchAllTerminationType = async () => {
      try {
        const response = await getAPI("/termination-type-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setTerminationTypes(response.data.data);
        } else {
          toast.error("Failed to load termination types.");
        }
      } catch (err) {
        toast.error("Error fetching termination type data.");
      }
    };
    fetchAllTerminationType();
  }, []);

  useEffect(() => {
    if (termination) {
      setTerminationType(termination.terminationType);
      setTerminationTypeId(termination.terminationTypeId);
      setNoticeDate(
        termination?.noticeDate
          ? new Date(termination.noticeDate).toISOString().split("T")[0]
          : ""
      );
      setTerminationDate(
        termination?.terminationDate
          ? new Date(termination.terminationDate).toISOString().split("T")[0]
          : ""
      );
      setDescription(termination.description);
    }
  }, [termination]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTermination = {
      terminationTypeId: terminationTypeId || termination.terminationTypeId,
      noticeDate,
      terminationDate,
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

        const selectedTerminationType = terminationTypes.find(
          (type) => type._id === terminationTypeId
        );

        const newUpdatedTermination = {
          id: response.data.data._id,
          employeeName,
          terminationType: selectedTerminationType
            ? selectedTerminationType.terminationName
            : termination.terminationType,
          terminationDate: response.data.data.terminationDate,
          terminationTypeId: response.data.data.terminationTypeId,
          noticeDate: response.data.data.noticeDate,
          description: response.data.data.description,
        };

        updateTermination(newUpdatedTermination);

        onClose();
      } else {
        toast.error("Failed to update Termination.");
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

  const handleDateChange = (e, field) => {
    const value = e.target.value;
    if (field === "noticeDate") {
      setNoticeDate(value);
    } else if (field === "terminationDate") {
      setTerminationDate(value);
    }
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
                      name="terminationTypeId"
                      value={terminationTypeId}
                      onChange={(e) => setTerminationTypeId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Termination Type
                      </option>
                      {terminationTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.terminationName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Notice Date
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      value={noticeDate}
                      onChange={(e) => handleDateChange(e, "noticeDate")}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      autoComplete="off"
                      required="required"
                      name="noticeDate"
                      type="date"
                      id="noticeDate"
                    />
                  </div>

                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Termination Date
                    </label>
                    <span className="text-danger">*</span>

                    <input
                      value={terminationDate}
                      onChange={(e) => handleDateChange(e, "terminationDate")}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                      autoComplete="off"
                      required="required"
                      name="terminationDate"
                      type="date"
                      id="terminationDate"
                    />
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

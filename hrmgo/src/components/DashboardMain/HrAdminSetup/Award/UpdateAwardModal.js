import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";

const UpdateAwardModal = ({ award, onClose, updateAward }) => {
  const [employeeName, setEmployeeName] = useState(award?.employeeName || "");
  const [awardType, setAwardType] = useState(award?.awardType || "");
  const [date, setDate] = useState(
    award?.date ? new Date(award.date).toISOString().split("T")[0] : ""
  );
  const [gift, setGift] = useState(award?.gift || "");
  const [description, setDescription] = useState(award?.description || "");

  useEffect(() => {
    if (award) {
      setEmployeeName(award.employeeName);
      setAwardType(award.awardType);
      setDate(
        award.date ? new Date(award.date).toISOString().split("T")[0] : ""
      );
      setGift(award.gift);
      setDescription(award.description);
    }
  }, [award]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated award data
    const updatedAward = {
      awardType,
      date,
      gift,
      description,
    };

    try {
      const response = await putAPI(`/award/${award.id}`, updatedAward, true);

      if (!response.hasError) {
        toast.success("Award updated successfully!");

        const newUpdatedAward = {
          id: response.data.data._id,
          employeeName: employeeName,
          awardType: response.data.data.awardType,
          date: response.data.data.date,
          gift: response.data.data.gift,
          description: response.data.data.description,
          employeeId: response.data.data.employeeId,
        };

        updateAward(newUpdatedAward);
        onClose();
      } else {
        toast.error("Failed to update award.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
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
              Edit Award
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleUpdate}
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="employee_id" className="col-form-label">
                    Employee
                  </label>
                  <select
                    className="form-control"
                    value={employeeName}
                    disabled
                  >
                    <option value={employeeName}>{employeeName}</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="award_type" className="col-form-label">
                    Award Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    required
                    value={awardType}
                    onChange={(e) => setAwardType(e.target.value)}
                  >
                    <option value="">Select Award</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="date" className="col-form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={handleDateChange}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="gift" className="col-form-label">
                    Gift <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Gift"
                    value={gift}
                    onChange={(e) => setGift(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label htmlFor="description" className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Enter Description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
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

export default UpdateAwardModal;

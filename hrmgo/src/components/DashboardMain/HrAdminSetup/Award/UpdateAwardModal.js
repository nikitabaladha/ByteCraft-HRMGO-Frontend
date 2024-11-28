import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";

const UpdateAwardModal = ({ award, onClose }) => {
  console.log(award);
  const [employeeName, setEmployeeName] = useState(award?.employeeName || "");
  const [awardType, setAwardType] = useState(award?.awardType || "");
  const [date, setDate] = useState(new Date(award?.date || ""));
  const [gift, setGift] = useState(award?.gift || "");
  const [description, setDescription] = useState(award?.description || "");

  useEffect(() => {
    if (award) {
      setAwardType(award.awardType);
      setDate(new Date(award.date));
      setGift(award.gift);
      setDescription(award.description);
    }
  }, [award]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated award data
    const updatedAward = {
      awardType,
      date: date.toISOString().split("T")[0],
      gift,
      description,
    };

    try {
      const response = await putAPI(`/award/${award.id}`, updatedAward, true);
      console.log("Updated award: " + JSON.stringify(response));

      if (!response.hasError) {
        toast.success("Award updated successfully!");
        console.log("Award updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update award.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the award.");
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
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
                    <select
                      className="form-control"
                      name="employeeId"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      disabled
                      aria-readonly
                    >
                      <option value={employeeName}>{employeeName}</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="award_type" className="col-form-label">
                      Award Type
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      required="required"
                      id="award_type"
                      name="awardType"
                      value={awardType}
                      onChange={(e) => setAwardType(e.target.value)} // Handle selection change
                    >
                      <option value="">Select Award</option>
                      <option value="Trophy">Trophy</option>
                      <option value="Certificate">Certificate</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={date}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="date"
                        type="text"
                        id="date"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="gift" className="col-form-label">
                      Gift
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required="required"
                      placeholder="Enter Gift"
                      name="gift"
                      type="text"
                      id="gift"
                      value={gift} // Bind value to state
                      onChange={(e) => setGift(e.target.value)} // Handle input change
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
                      value={description} // Bind value to state
                      onChange={(e) => setDescription(e.target.value)} // Handle input change
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose} // Close modal on cancel
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

export default UpdateAwardModal;

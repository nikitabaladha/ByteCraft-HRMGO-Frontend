import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";

const UpdateHolidayModal = ({ holiday, onClose }) => {
  const [startDate, setStartDate] = useState(
    holiday?.startDate ? new Date(holiday.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    holiday?.endDate ? new Date(holiday.endDate) : new Date()
  );
  const [occasion, setOccasion] = useState(
    holiday?.occasion || holiday?.occasion || ""
  );

  useEffect(() => {
    if (holiday) {
      setStartDate(
        holiday.startDate ? new Date(holiday.startDate) : new Date()
      );
      setEndDate(holiday.endDate ? new Date(holiday.endDate) : new Date());
      setOccasion(holiday.occasion);
    }
  }, [holiday]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated Holiday data
    const updatedHoliday = {
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      occasion,
    };

    try {
      const response = await putAPI(
        `/holiday/${holiday.id}`,
        updatedHoliday,
        true
      );

      if (!response.hasError) {
        toast.success("Holiday updated successfully!");
        console.log("Holiday updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update Holiday.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Holiday.");
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
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
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Holiday
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="body ">
              <form
                method="POST"
                acceptCharset="UTF-8"
                className="needs-validation"
                noValidate=""
                onSubmit={handleUpdate}
              >
                <input name="_method" type="hidden" defaultValue="PUT" />
                <input
                  name="_token"
                  type="hidden"
                  defaultValue="Lb0IPoxkOWM1wwpkOFdrOpAJxR9I3uKmKi5vN8Oi"
                />
                <div className="modal-body">
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="occasion" className="col-form-label">
                        Occasion
                      </label>
                      <span className="text-danger">*</span>
                      <textarea
                        className="form-control"
                        placeholder="Enter Description"
                        rows={3}
                        required="required"
                        name="occasion"
                        cols={50}
                        id="occasion"
                        value={occasion}
                        onChange={(e) => setOccasion(e.target.value)}
                      />
                    </div>
                    <div className="row col-md-12">
                      <div className="form-group col-md-6">
                        <label htmlFor="start_date" className="col-form-label">
                          Start Date
                        </label>
                        <span className="text-danger">*</span>
                        <div>
                          <DatePicker
                            selected={startDate}
                            onChange={handleStartDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control d_week current_date datepicker-input"
                            autoComplete="off"
                            required="required"
                            name="startDate"
                            type="text"
                            id="startDate"
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="end_date" className="col-form-label">
                          End Date
                        </label>
                        <span className="text-danger">*</span>
                        <div>
                          <DatePicker
                            selected={endDate}
                            onChange={handleEndDateChange}
                            dateFormat="yyyy-MM-dd"
                            className="form-control d_week current_date datepicker-input"
                            autoComplete="off"
                            required="required"
                            name="endDate"
                            type="text"
                            id="endDate"
                            style={{
                              width: "100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    defaultValue="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={onClose}
                  />
                  <input
                    type="submit"
                    defaultValue="Update"
                    className="btn  btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHolidayModal;

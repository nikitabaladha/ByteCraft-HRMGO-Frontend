import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";

const CreateHolidayModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    occasion: "",
    startDate: new Date(),
    endDate: new Date(),
  });

  const formatDateToISO = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date, fieldName) => {
    setFormData((prevData) => ({ ...prevData, [fieldName]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedStartDate = formatDateToISO(formData.startDate);
      const formattedEndDate = formatDateToISO(formData.endDate);

      const response = await postAPI(
        "/holiday",
        {
          occasion: formData.occasion,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Holiday created successfully!");
        setFormData({
          occasion: "",
          startDate: new Date(),
          endDate: new Date(),
        });
        onClose();
      } else {
        toast.error(response.message || "Failed to create Holiday.");
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
        style={{
          display: "block",
          paddingLeft: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="modal-dialog modal-undefined" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Holiday
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
                onSubmit={handleSubmit}
              >
                <input name="_token" type="hidden" />
                <div className="modal-body">
                  <div className="row">
                    <div className="form-group col-md-12">
                      <label htmlFor="occasion" className="col-form-label">
                        Occasion
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required="required"
                        placeholder="Enter Occasion"
                        name="occasion"
                        type="text"
                        id="occasion"
                        value={formData.occasion}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="start_date" className="col-form-label">
                        Start Date
                      </label>
                      <span className="text-danger">*</span>
                      <div>
                        <DatePicker
                          selected={formData.startDate}
                          onChange={(date) =>
                            handleDateChange(date, "startDate")
                          }
                          dateFormat="yyyy-MM-dd"
                          autoComplete="off"
                          className="form-control current_date"
                          required="required"
                          name="start_date"
                          type="date"
                          id="start_date"
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
                          selected={formData.endDate}
                          onChange={(date) => handleDateChange(date, "endDate")}
                          dateFormat="yyyy-MM-dd"
                          autoComplete="off"
                          required="required"
                          className="form-control current_date"
                          name="end_date"
                          type="date"
                          id="end_date"
                        />
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="synchronize_type" className="form-label">
                        Synchroniz in Google Calendar ?
                      </label>
                      <div className=" form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          name="synchronize_type"
                          id="switch-shadow"
                          defaultValue="google_calender"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="switch-shadow"
                        />
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
                  <button
                    type="submit"
                    defaultValue="Create"
                    className="btn btn-primary"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateHolidayModal;

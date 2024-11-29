import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdatePromotionModal = ({ promotion, onClose }) => {
  console.log("promotion", promotion);
  const [employeeName, setEmployeeName] = useState(
    promotion?.employeeName || ""
  );
  const [promotionTitle, setPromotionTitle] = useState(
    promotion?.promotionTitle || ""
  );
  const [promotionDate, setPromotionDate] = useState(
    new Date(promotion?.promotionDate || "")
  );
  const [description, setDescription] = useState(promotion?.description || "");
  const [designationId, setDesignationId] = useState("");
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    if (promotion) {
      setPromotionTitle(promotion.promotionTitle);
      setPromotionDate(new Date(promotion.promotionDate));
      setDescription(promotion.description);
      setDesignationId(promotion.designationId);
    }
  }, [promotion]);

  useEffect(() => {
    const fetchDesignationData = async () => {
      try {
        const response = await getAPI("/designation-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setDesignations(response.data.data);
        } else {
          toast.error("Failed to load Designations.");
        }
      } catch (err) {
        toast.error("Error fetching Designation data.");
      }
    };
    fetchDesignationData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPromotion = {
      promotionTitle,
      promotionDate: promotionDate.toISOString().split("T")[0],
      description,
      designationId: designationId || promotion.designationId,
    };

    try {
      const response = await putAPI(
        `/promotion/${promotion.id}`,
        updatedPromotion,
        true
      );
      if (!response.hasError) {
        toast.success("Promotion updated successfully!");
        onClose();
      } else {
        toast.error("Failed to update Promotion.");
      }
    } catch (error) {
      toast.error("An error occurred while updating the Promotion.");
    }
  };

  const handleDateChange = (date) => {
    setPromotionDate(date);
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
              Edit Promotion
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
                  <div className="form-group col-md-6 col-lg-6">
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
                    <label htmlFor="designation_id" className="col-form-label">
                      Designation
                    </label>
                    <span className="text-danger">*</span>
                    <select
                      className="form-control"
                      name="designationId"
                      value={designationId} // Bind value to the state variable
                      onChange={(e) => setDesignationId(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Designation
                      </option>
                      {designations.map((des) => (
                        <option
                          key={des.id}
                          value={des.id}
                          selected={des.id === designationId}
                        >
                          {des.designationName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="promotion_title" className="col-form-label">
                      Promotion Title
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required="required"
                      id="promotion_title"
                      name="promotionTitle"
                      value={promotionTitle}
                      onChange={(e) => setPromotionTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="date" className="col-form-label">
                      Date
                    </label>
                    <span className="text-danger">*</span>
                    <div>
                      <DatePicker
                        selected={promotionDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control d_week current_date datepicker-input"
                        autoComplete="off"
                        required="required"
                        name="promotionDate"
                        type="text"
                        id="promotionDate"
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

export default UpdatePromotionModal;

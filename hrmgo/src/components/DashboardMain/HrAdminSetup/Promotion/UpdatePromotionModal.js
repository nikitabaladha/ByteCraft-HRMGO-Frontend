import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePromotionModal = ({ promotion, onClose }) => {
  const [employees, setEmployees] = useState([]);
  const [promotionTitle, setPromotionTitle] = useState(
    promotion?.promotionTitle || ""
  );

  const [promotionDate, setPromotionDate] = useState(
    promotion?.promotionDate
      ? new Date(promotion.promotionDate).toISOString().split("T")[0]
      : ""
  );

  const [description, setDescription] = useState(promotion?.description || "");
  const [designationId, setDesignationId] = useState(
    promotion?.designationId || ""
  );
  const [designations, setDesignations] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI("/employee-get-all-name", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);
        } else {
          toast.error("Failed to load employees.");
        }
      } catch (err) {
        toast.error("Error fetching employee data.");
      }
    };
    fetchEmployeeData();
  }, []);

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

  // Update state when the promotion prop changes
  useEffect(() => {
    if (promotion) {
      setPromotionTitle(promotion.promotionTitle || "");
      setPromotionDate(
        promotion.promotionDate
          ? new Date(promotion.promotionDate).toISOString().split("T")[0]
          : ""
      );

      setDescription(promotion.description || "");
      setDesignationId(promotion.designationId || "");
    }
  }, [promotion]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedPromotion = {
      promotionTitle,
      promotionDate,
      description,
      designationId: designationId || promotion.designationId,
    };

    try {
      const response = await postAPI(
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
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleDateChange = (e) => {
    setPromotionDate(e.target.value);
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
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body">
            <form
              method="POST"
              className="needs-validation"
              noValidate
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
                      value={promotion?.employeeName || ""}
                      disabled
                    >
                      <option value={promotion?.employeeId}>
                        {promotion?.employeeName}
                      </option>
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
                      value={designationId}
                      onChange={(e) => setDesignationId(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Designation
                      </option>
                      {designations.map((des) => (
                        <option key={des.id} value={des.id}>
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
                      required
                      id="promotion_title"
                      name="promotionTitle"
                      value={promotionTitle}
                      onChange={(e) => setPromotionTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6 col-lg-6">
                    <label htmlFor="promotionDate" className="col-form-label">
                      Date
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      name="promotionDate"
                      type="date"
                      id="promotionDate"
                      value={promotionDate}
                      onChange={handleDateChange}
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

export default UpdatePromotionModal;

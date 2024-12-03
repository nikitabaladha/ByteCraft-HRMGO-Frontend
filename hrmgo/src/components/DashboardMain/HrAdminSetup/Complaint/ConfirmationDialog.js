import React, { useEffect } from "react";
import deleteAPI from "../../../../api/deleteAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ConfirmationDialog({ onCancel, complaint }) {
  const handleDelete = async () => {
    try {
      const response = await deleteAPI(`/complaint/${complaint.id}`, {}, true);

      if (!response.hasError) {
        onCancel();

        toast.success("Complaint successfully deleted!");
      } else {
        console.error("Error deleting Complaint:", response.message);
        toast.error(`Failed to delete Complaint: ${response.message}`);
      }
    } catch (error) {
      console.error("Error while deleting complaint:", error);
      toast.error("An error occurred while deleting complaint.");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById("confirmation-dialog");
      const modalContent = document.querySelector(".swal2-popup");

      if (modalElement && !modalContent.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <>
      <div
        id="confirmation-dialog"
        className="swal2-container swal2-center swal2-backdrop-show"
        style={{ overflowY: "auto" }}
      >
        <div
          aria-labelledby="swal2-title"
          aria-describedby="swal2-html-container"
          className="swal2-popup swal2-modal swal2-icon-warning swal2-show"
          tabIndex={-1}
          role="dialog"
          aria-live="assertive"
          aria-modal="true"
          style={{ display: "grid" }}
        >
          <button
            type="button"
            className="swal2-close"
            aria-label="Close this dialog"
            style={{ display: "none" }}
          >
            ×
          </button>
          <ul className="swal2-progress-steps" style={{ display: "none" }} />
          <div
            className="swal2-icon swal2-warning swal2-icon-show"
            style={{ display: "flex" }}
          >
            <div className="swal2-icon-content">!</div>
          </div>
          <img
            className="swal2-image"
            style={{ display: "none" }}
            alt="Description"
          />

          <h2
            className="swal2-title"
            id="swal2-title"
            style={{ display: "block" }}
          >
            Are you sure?
          </h2>
          <div
            className="swal2-html-container"
            id="swal2-html-container"
            style={{ display: "block" }}
          >
            This action can not be undone. Do you want to continue?
          </div>
          <input className="swal2-input" style={{ display: "none" }} />
          <input
            type="file"
            className="swal2-file"
            style={{ display: "none" }}
          />
          <div className="swal2-range" style={{ display: "none" }}>
            <input type="range" />
            <output />
          </div>
          <select className="swal2-select" style={{ display: "none" }} />
          <div className="swal2-radio" style={{ display: "none" }} />
          <label
            htmlFor="swal2-checkbox"
            className="swal2-checkbox"
            style={{ display: "none" }}
          >
            <input type="checkbox" />
            <span className="swal2-label" />
          </label>
          <textarea
            className="swal2-textarea"
            style={{ display: "none" }}
            defaultValue={""}
          />
          <div
            className="swal2-validation-message"
            id="swal2-validation-message"
            style={{ display: "none" }}
          />
          <div className="swal2-actions" style={{ display: "flex" }}>
            <button
              type="button"
              className="swal2-cancel btn btn-danger"
              aria-label=""
              style={{ display: "inline-block" }}
              onClick={onCancel}
            >
              No
            </button>

            <button
              type="button"
              className="swal2-confirm btn btn-success"
              aria-label=""
              style={{ display: "inline-block" }}
              onClick={() => {
                handleDelete();
              }}
            >
              Yes
            </button>
            <div className="swal2-loader" />
          </div>
          <div className="swal2-footer" style={{ display: "none" }} />
          <div className="swal2-timer-progress-bar-container">
            <div
              className="swal2-timer-progress-bar"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmationDialog;

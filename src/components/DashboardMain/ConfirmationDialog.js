import React, { useEffect } from "react";
import deleteAPI from "../../api/deleteAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DELETE_CONFIG = {
  indicator: {
    getEndpoint: (id) => `/indicator/${id}`,
    successMessage: "Indicator successfully deleted!",
    errorMessage: "Failed to delete indicator.",
    idKey: "indicatorId",
  },
  appraisal: {
    getEndpoint: (id) => `/appraisal/${id}`,
    successMessage: "Appraisal successfully deleted!",
    errorMessage: "Failed to delete appraisal.",
    idKey: "appraisalId",
  },
  comment: {
    getEndpoint: (id) => `/contract-comment/${id}`,
    successMessage: "Comment successfully deleted!",
    errorMessage: "Failed to delete comment.",
    idKey: "commentId",
  },
  note: {
    getEndpoint: (id) => `/contract-note/${id}`,
    successMessage: "Note successfully deleted!",
    errorMessage: "Failed to delete note.",
    idKey: "noteId",
  },
  contract: {
    getEndpoint: (id) => `/contract/${id}`,
    successMessage: "Contract successfully deleted!",
    errorMessage: "Failed to delete contract.",
    idKey: "contractId",
  },
  attachment: {
    getEndpoint: (id) => `/contract-attachment/${id}`,
    successMessage: "Attachment successfully deleted!",
    errorMessage: "Failed to delete Attachment.",
    idKey: "attachmentId",
  },
  announcement: {
    getEndpoint: (id) => `/announcement/${id}`,
    successMessage: "Announcement successfully deleted!",
    errorMessage: "Failed to delete Announcement.",
    idKey: "announcementId",
  },
  award: {
    getEndpoint: (id) => `/award/${id}`,
    successMessage: "Award successfully deleted!",
    errorMessage: "Failed to delete Award.",
    idKey: "awardId",
  },
  complaint: {
    getEndpoint: (id) => `/complaint/${id}`,
    successMessage: "Complaint successfully deleted!",
    errorMessage: "Failed to delete Complaint.",
    idKey: "complaintId",
  },
  holiday: {
    getEndpoint: (id) => `/holiday/${id}`,
    successMessage: "Holiday successfully deleted!",
    errorMessage: "Failed to delete Holiday.",
    idKey: "holidayId",
  },
  promotion: {
    getEndpoint: (id) => `/promotion/${id}`,
    successMessage: "Promotion successfully deleted!",
    errorMessage: "Failed to delete Promotion.",
    idKey: "promotionId",
  },
  resignation: {
    getEndpoint: (id) => `/resignation/${id}`,
    successMessage: "Resignation successfully deleted!",
    errorMessage: "Failed to delete Resignation.",
    idKey: "resignationId",
  },
  termination: {
    getEndpoint: (id) => `/termination/${id}`,
    successMessage: "Termination successfully deleted!",
    errorMessage: "Failed to delete Termination.",
    idKey: "terminationId",
  },
  warning: {
    getEndpoint: (id) => `/warning/${id}`,
    successMessage: "Warning successfully deleted!",
    errorMessage: "Failed to delete Warning.",
    idKey: "warningId",
  },
  app: {
    getEndpoint: (id) => `/delete-application-by-id/${id}`,
    successMessage: "Application successfully deleted!",
    errorMessage: "Failed to delete Application.",
    idKey: "appId",
  },
  row: {
    getEndpoint: (id) => `/delete-job-on-board/${id}`,
    successMessage: "Job On board successfully deleted!",
    errorMessage: "Failed to delete Job On Board.",
    idKey: "rowId",
  },
  schedule: {
    getEndpoint: (id) => `/delete-interview-schedule/${id}`,
    successMessage: "Job On board successfully deleted!",
    errorMessage: "Failed to delete Job On Board.",
    idKey: "scheduleId",
  },
  trainer: {
    getEndpoint: (id) => `/traineeDelete/${id}`,
    successMessage: "Trainer successfully deleted!",
    errorMessage: "Failed to delete Trainer.",
    idKey: "trainerId",
  },
  training: {
    getEndpoint: (id) => `/training-list-delete/${id}`,
    successMessage: "Training successfully deleted!",
    errorMessage: "Failed to delete Training.",
    idKey: "trainingId",
  },
  job: {
    getEndpoint: (id) => `/delete-job/${id}`,
    successMessage: "Training successfully deleted!",
    errorMessage: "Failed to delete Training.",
    idKey: "jobId",
  },
};

function ConfirmationDialog({ onClose, deleteType, id, onDeleted }) {
  const handleDelete = async () => {
    const config = DELETE_CONFIG[deleteType];

    if (!config) {
      console.error("Invalid delete type.");
      toast.error("Invalid delete type.");
      return;
    }

    const endpoint = config.getEndpoint(id);
    if (!id) {
      console.error(`${config.idKey} is missing.`);
      toast.error(`${config.idKey} is required.`);
      return;
    }

    try {
      const response = await deleteAPI(endpoint, {}, true);

      if (!response.hasError) {
        console.log(`${deleteType} deleted successfully`, response.data);
        toast.success(config.successMessage);

        if (typeof onDeleted === "function") {
          onDeleted(id);
        }

        onClose();
      } else {
        console.error(config.errorMessage, response.message);
        toast.error(`${config.errorMessage}: ${response.message}`);
      }
    } catch (error) {
      console.error(`Error while deleting ${deleteType}:`, error);
      toast.error(`An error occurred while deleting the ${deleteType}.`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById("confirmation-dialog");
      const modalContent = document.querySelector(".swal2-popup");

      if (modalElement && !modalContent.contains(event.target)) {
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
                onClick={onClose}
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
    </>
  );
}

export default ConfirmationDialog;
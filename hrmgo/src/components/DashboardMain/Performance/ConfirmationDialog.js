import React, { useEffect } from "react";
import deleteAPI from "../../../api/deleteAPI.js";
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
    getEndpoint: (id) => `/contract-comment/${id}`, // Adjust this based on your API
    successMessage: "Comment successfully deleted!",
    errorMessage: "Failed to delete comment.",
    idKey: "commentId",
  },
  note: {
    getEndpoint: (id) => `/contract-note/${id}`, // Update endpoint for notes
    successMessage: "Note successfully deleted!",
    errorMessage: "Failed to delete note.",
    idKey: "noteId", // Ensure this is correct based on your backend
  },
  contract: {
    getEndpoint: (id) => `/contract/${id}`, // Add the endpoint for contract deletion
    successMessage: "Contract successfully deleted!",
    errorMessage: "Failed to delete contract.",
    idKey: "contractId", // Ensure this matches your backend
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
        <h2 className="swal2-title" id="swal2-title">
          Are you sure?
        </h2>
        <div className="swal2-html-container" id="swal2-html-container">
          This action cannot be undone. Do you want to continue?
        </div>
        <div className="swal2-actions" style={{ display: "flex" }}>
          <button
            type="button"
            className="swal2-cancel btn btn-danger"
            onClick={onClose}
          >
            No
          </button>
          <button
            type="button"
            className="swal2-confirm btn btn-success"
            onClick={handleDelete}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationDialog;

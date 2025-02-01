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
  attendance: {
    getEndpoint: (id) => `/marked-attendance-delete/${id}`,

    successMessage: "Attendance successfully deleted!",

    errorMessage: "Failed to delete Attendance.",

    idKey: "attendanceId",
  },

  leave: {
    getEndpoint: (id) => `/manage-leave-delete-by-id/${id}`,

    successMessage: "Leave successfully deleted!",

    errorMessage: "Failed to delete Leave.",

    idKey: "leaveId",
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
  role: {
    getEndpoint: (id) => `/delete-role/${id}`,
    successMessage: "Role successfully deleted!",
    errorMessage: "Failed to delete Role.",
    idKey: "roleId",
  },
  user: {
    getEndpoint: (id) => `/delete-user/${id}`,
    successMessage: "User successfully deleted!",
    errorMessage: "Failed to delete User.",
    idKey: "userId",
  },
  employee: {
    getEndpoint: (id) => `/employee/${id}`,
    successMessage: "Employee successfully deleted!",
    errorMessage: "Failed to delete Employee.",
    idKey: "employeeId",
  },
  conversation: {
    getEndpoint: (id) => `/delete-conversation/${id}`,
    successMessage: "Conversation successfully deleted!",
    errorMessage: "Failed to delete Conversation.",
    idKey: "conversationId",
  },

  // Shantanu

  zoommeeting: {
    getEndpoint: (id) => `/delete_zoommeeting/${id}`,
    successMessage: "Zoom meeting successfully deleted!",
    errorMessage: "Failed to delete Zoom meeting.",
    idKey: "meetingId",
  },

  allowance: {
    getEndpoint: (id) => `/deleteallowance/${id}`,
    successMessage: "Allowance successfully deleted!",
    errorMessage: "Failed to delete allowance.",
    idKey: "allowanceId",
  },
  commission: {
    getEndpoint: (id) => `/deletecommission/${id}`,
    successMessage: "Commission successfully deleted!",
    errorMessage: "Failed to delete commission.",
    idKey: "commissionId",
  },
  loan: {
    getEndpoint: (id) => `/deleteloan/${id}`,
    successMessage: "Loan successfully deleted!",
    errorMessage: "Failed to delete Loan.",
    idKey: "LoanId",
  },

  otherpayment: {
    getEndpoint: (id) => `/deleteotherpayment/${id}`,
    successMessage: "Other deduction successfully deleted!",
    errorMessage: "Failed to delete Other deduction.",
    idKey: "OtherpaymentId",
  },
  tax: {
    getEndpoint: (id) => `/deletetax/${id}`,
    successMessage: "Tax successfully deleted!",
    errorMessage: "Failed to delete Tax.",
    idKey: "TaxId",
  },
  overtime: {
    getEndpoint: (id) => `/deleteovertime/${id}`,
    successMessage: "Overtime successfully deleted!",
    errorMessage: "Failed to delete Overtime.",
    idKey: "OvertimeId",
  },
  branch: {
    getEndpoint: (id) => `/delete-branch/${id}`,
    successMessage: "Branch successfully deleted!",
    errorMessage: "Failed to delete Branch.",
    idKey: "BranchId",
  },
  department: {
    getEndpoint: (id) => `/delete-department/${id}`,
    successMessage: "Department successfully deleted!",
    errorMessage: "Failed to delete Department.",
    idKey: "DepartmentId",
  },
  designation: {
    getEndpoint: (id) => `/delete-designation/${id}`,
    successMessage: "Designation successfully deleted!",
    errorMessage: "Failed to delete Designation.",
    idKey: "DesignationId",
  },
  leavetype: {
    getEndpoint: (id) => `/delete-leave-type/${id}`,
    successMessage: "Leave Type successfully deleted!",
    errorMessage: "Failed to delete Leave Type.",
    idKey: "LeaveTypeId",
  },
  paysliptype: {
    getEndpoint: (id) => `/delete-payslip-type/${id}`,
    successMessage: "Payslip Type successfully deleted!",
    errorMessage: "Failed to delete Payslip Type.",
    idKey: "PayslipTypeId",
  },
  documenttype: {
    getEndpoint: (id) => `/delete-document-type/${id}`,
    successMessage: "Document Type successfully deleted!",
    errorMessage: "Failed to delete Document Type.",
    idKey: "documentTypeId",
  },
  allowanceOption: {
    getEndpoint: (id) => `/delete-allowance-option/${id}`,
    successMessage: "Allowance Option successfully deleted!",
    errorMessage: "Failed to delete Allowance Option.",
    idKey: "allowanceOptionId",
  },
  loanOption: {
    getEndpoint: (id) => `/delete-loan-option/${id}`,
    successMessage: "Loan Option successfully deleted!",
    errorMessage: "Failed to delete Loan Option.",
    idKey: "loanOptionId",
  },

  deductionOption: {
    getEndpoint: (id) => `/delete-deduction-option/${id}`,
    successMessage: "Deduction Option successfully deleted!",
    errorMessage: "Failed to delete Deduction Option.",
    idKey: "deductionOptionId",
  },
  trainingType: {
    getEndpoint: (id) => `/delete-training-type/${id}`,
    successMessage: "Training Type successfully deleted!",
    errorMessage: "Failed to delete Training Type.",
    idKey: "trainingTypeId",
  },
  awardType: {
    getEndpoint: (id) => `/delete-award-type/${id}`,
    successMessage: "Award Type successfully deleted!",
    errorMessage: "Failed to delete Award Type.",
    idKey: "awardTypeId",
  },
  jobStage: {
    getEndpoint: (id) => `/delete-job-stage/${id}`,
    successMessage: "Job Stage successfully deleted!",
    errorMessage: "Failed to delete Job Stage.",
    idKey: "jobStageId",
  },
  terminationType: {
    getEndpoint: (id) => `/delete-termination-type/${id}`,
    successMessage: "Termination Type successfully deleted!",
    errorMessage: "Failed to delete Termination Type.",
    idKey: "terminationTypeId",
  },
  performanceType: {
    getEndpoint: (id) => `/delete-performance-type/${id}`,
    successMessage: "Performance Type successfully deleted!",
    errorMessage: "Failed to delete Performance Type.",
    idKey: "performanceTypeId",
  },
  expenseType: {
    getEndpoint: (id) => `/delete-expense-type/${id}`,
    successMessage: "Expense Type successfully deleted!",
    errorMessage: "Failed to delete Expense Type.",
    idKey: "expenseTypeId",
  },
  incomeType: {
    getEndpoint: (id) => `/delete-income-type/${id}`,
    successMessage: "Income Type successfully deleted!",
    errorMessage: "Failed to delete Income Type.",
    idKey: "incomeTypeId",
  },
  paymentType: {
    getEndpoint: (id) => `/delete-payment-type/${id}`,
    successMessage: "Payment Type successfully deleted!",
    errorMessage: "Failed to delete Payment Type.",
    idKey: "paymentTypeId",
  },
  contractType: {
    getEndpoint: (id) => `/delete-contract-type/${id}`,
    successMessage: "Contract Type successfully deleted!",
    errorMessage: "Failed to delete Contract Type.",
    idKey: "contractTypeId",
  },
  jobCategory: {
    getEndpoint: (id) => `/delete-job-category/${id}`,
    successMessage: "Job Category successfully deleted!",
    errorMessage: "Failed to delete Job Category.",
    idKey: "jobCategoryId",
  },

  account: {
    getEndpoint: (id) => `/delete-AccountList/${id}`,
    successMessage: "Account successfully deleted!",
    errorMessage: "Failed to delete account.",
    idKey: "accountId",
  },

  deposit: {
    getEndpoint: (id) => `/delete_deposit/${id}`,
    successMessage: "Deposit successfully deleted!",
    errorMessage: "Failed to delete deposit.",
    idKey: "depositId",
  },
  expense: {
    getEndpoint: (id) => `/delete_expense/${id}`,
    successMessage: "Expense successfully deleted!",
    errorMessage: "Failed to delete expense.",
    idKey: "expenseId",
  },
  transferbalance: {
    getEndpoint: (id) => `/delete_transferbalance/${id}`,
    successMessage: "Transfer balance successfully deleted!",
    errorMessage: "Failed to delete transfer balance.",
    idKey: "transferBalanceId",
  },
  payer: {
    getEndpoint: (id) => `/delete_Payer/${id}`,
    successMessage: "Payer successfully deleted!",
    errorMessage: "Failed to delete payer.",
    idKey: "payerId",
  },
  payee: {
    getEndpoint: (id) => `/delete_Payee/${id}`,
    successMessage: "Payee successfully deleted!",
    errorMessage: "Failed to delete payee.",
    idKey: "payeeId",
  },
  meeting: {
    getEndpoint: (id) => `/meetings_delete/${id}`,
    successMessage: "Meeting successfully deleted!",
    errorMessage: "Failed to delete meeting.",
    idKey: "meetingId",
  },
  ticket: {
    getEndpoint: (id) => `/ticket-delete/${id}`,
    successMessage: "Ticket successfully deleted!",
    errorMessage: "Failed to delete ticket.",
    idKey: "ticketId",
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
          onDeleted(id, response.data);
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

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import ViewAppraisal from "./ViewAppraisal";
import ViewIndicator from "./ViewIndicator";
import CompetencyTag from "./CompetencyTag";

import { formatDate } from "../../../../Js/custom.js";

const AppraisalDetailModal = ({ appraisal, closeModal }) => {
  if (!appraisal) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Appraisal Detail
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="body ">
              <div className="modal-body">
                <div className="row py-4">
                  <div className="col-md-12">
                    <div className="info text-sm">
                      <strong>Branch : </strong>
                      <span>{appraisal.branch}</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="info text-sm font-style">
                      <strong>Employee : </strong>
                      <span>{appraisal.employee}</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="info text-sm font-style">
                      <strong>Appraisal Date : </strong>
                      <span>{formatDate(appraisal.appraisalDate)}</span>
                    </div>
                  </div>

                  <div className="row">
                    <CompetencyTag />
                    <ViewIndicator appraisal={appraisal} />
                    <ViewAppraisal appraisal={appraisal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppraisalDetailModal;

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import InterviewAddToJobOnBoard from './InterviewAddToJobOnBoard';

const formatDateForInput = (date) => {
    if (!date) return ""; 
    const parsedDate = new Date(date); 
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

const InterviewScheduleView = ({schedule, onClose}) => {
    const { id } = useParams();
    const [applicantId, setApplicantId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const stages = [
        { id: "Applied", label: "Applied" },
        { id: "Phone Screen", label: "Phone Screen" },
        { id: "Interview", label: "Interview" },
        { id: "Hired", label: "Hired" },
        { id: "Rejected", label: "Rejected" },
      ];

      const handleCreateClick = () => {
        setApplicantId(id);
        console.log("application id", id);
        setShowModal(true); // Show the modal
      };
    
      const handleCloseModal = () => {
        setShowModal(false);
      };
  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        style={{ display: 'block' }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-md" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {schedule.applicatAppliedFor}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <div className="body">
              <div className="col-form-label">
                <div className="modal-body">
                  <h6 className="mb-2">Schedule Detail</h6>
                  <dl className="row mb-0 align-items-center">
                    <dt className="col-sm-3 h6 text-sm">Job</dt>
                    <dd className="col-sm-9 text-sm">{schedule.applicatAppliedFor}</dd>
                    <dt className="col-sm-3 h6 text-sm">Interview On</dt>
                    <dd className="col-sm-9 text-sm">{`${formatDateForInput(schedule.date)}`}, {schedule.time}</dd>
                    <dt className="col-sm-3 h6 text-sm">Assign Employee</dt>
                    <dd className="col-sm-9 text-sm">{schedule.interviewer}</dd>
                  </dl>
                </div>
                <div className="modal-body">
                  <h6 className="mb-2">Candidate Detail</h6>
                  <dl className="row mb-0 align-items-center">
                    <dt className="col-sm-3 h6 text-sm">Name</dt>
                    <dd className="col-sm-9 text-sm">{schedule.candidate}</dd>
                    <dt className="col-sm-3 h6 text-sm">Email</dt>
                    <dd className="col-sm-9 text-sm">{schedule.applicantEmail}</dd>
                    <dt className="col-sm-3 h6 text-sm">Phone</dt>
                    <dd className="col-sm-9 text-sm">{schedule.applicantPhone}</dd>
                  </dl>
                </div>
                <div className="modal-body">
                  <h6 className="mb-2">Candidate Status</h6>
                  {stages.map((stage) => (
                    <div className="custom-control custom-radio" key={stage.id}>
                      <input
                        type="radio"
                        id={`stage_${stage.id}`}
                        name="applicantStatus"
                        value={stage.id}
                        className="form-check-input stages"
                        checked={schedule.applicantStatus === stage.id}
                        readOnly
                      />
                      <label className="custom-control-label" htmlFor={`stage_${stage.id}`}>
                        {stage.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <Link
                  onClick={handleCreateClick}
                    to="#"
                    data-url="https://demo.workdo.io/hrmgo/job-onboard/create/11"
                    data-ajax-popup="true"
                    className="btn btn-primary"
                  >
                    Add to Job OnBoard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
            <InterviewAddToJobOnBoard
            aplicntId={applicantId}
              applicantId={schedule.applicantId}
              applicantName={schedule.candidate}
              applicatAppliedFor={schedule.applicatAppliedFor}
              applicationCreatedAt={schedule.applicationCreatedAt}
              applicantPhone={schedule.applicantPhone}
              applicantDOB={schedule.applicantDOB}
              applicantGender={schedule.applicantGender}
              applicantEmail={schedule.applicantEmail}
              applicantAddress={schedule.applicantAddress}
              onClose={handleCloseModal}
            />
          )}
    </div>
  );
};

export default InterviewScheduleView;

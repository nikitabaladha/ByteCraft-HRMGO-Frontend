import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import CreateJobApplication from "./CreateJobApplicationModal";

const JobApplicationHeader = () => {
    const [showModal, setShowModal] = useState(false);

    

  const handleCreateClick = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };
  return (
    <div>
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="page-header-title">
            <h4 className="m-b-10">Manage Job Application</h4>
          </div>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/dashboard">Home</Link>
            </li>
            <li className="breadcrumb-item">Job Application</li>
          </ul>
        </div>
        <div className="col">
          <div className="float-end ">
            <Link
               onClick={handleCreateClick}
              data-url="https://demo.workdo.io/hrmgo/job-application/create"
              data-ajax-popup="true"
              data-size="lg"
              data-title="Create New Job Application"
              data-bs-toggle="tooltip"
              title=""
              className="btn btn-sm btn-primary"
              data-bs-original-title="Create"
            >
              <FiPlus className="text-white" />
            </Link>
          </div>
        </div>
        {showModal && (
        <CreateJobApplication onClose={handleCloseModal} />
      )}
      </div>
     
    </div>
  );
};

export default JobApplicationHeader;

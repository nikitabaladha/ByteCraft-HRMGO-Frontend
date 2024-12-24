import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import JobOnBoardingCreate from "./JobOnBoardingCreate";

const JobOnBoardingHeader = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="row align-items-center">
        <div className="col-auto">
          <div className="page-header-title">
            <h4 className="m-b-10">Manage Job On-Boarding</h4>
          </div>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard">Home</a>
            </li>
            <li className="breadcrumb-item">Job On-Boarding</li>
          </ul>
        </div>
        <div className="col">
          <div className="float-end ">
            <Link
              to="#"
              onClick={handleModalOpen}
              data-url="https://demo.workdo.io/hrmgo/job-onboard/create/0"
              data-ajax-popup="true"
              data-title="Create New Job On-Boarding"
              data-bs-toggle="tooltip"
              title=""
              className="btn btn-sm btn-primary"
              data-bs-original-title="Create"
            >
              <FiPlus classNameName="text-white" />
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && <JobOnBoardingCreate onClose={handleModalClose} />}
    </div>
  );
};

export default JobOnBoardingHeader;

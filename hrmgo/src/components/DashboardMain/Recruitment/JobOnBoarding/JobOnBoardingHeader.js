import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import JobOnBoardingCreate from "./JobOnBoardingCreate";

const JobOnBoardingHeader = () => {

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  return (
    <>
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
       
      </div>
      {/* {isModalOpen && <JobOnBoardingCreate onClose={handleModalClose} />} */}
    </>
  );
};

export default JobOnBoardingHeader;

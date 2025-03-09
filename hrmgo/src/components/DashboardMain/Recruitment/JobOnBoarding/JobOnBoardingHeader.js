import React from "react";

const JobOnBoardingHeader = () => {

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
            <li className="breadcrumb-item text-dark">Job On-Boarding</li>
          </ul>
        </div>
       
      </div>
      {/* {isModalOpen && <JobOnBoardingCreate onClose={handleModalClose} />} */}
    </>
  );
};

export default JobOnBoardingHeader;

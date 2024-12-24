import React from "react";

const JobCandidateHeader = () => {
  return (
    <div>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Archive Application</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>

                <li className="breadcrumb-item">Archive Application</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCandidateHeader;

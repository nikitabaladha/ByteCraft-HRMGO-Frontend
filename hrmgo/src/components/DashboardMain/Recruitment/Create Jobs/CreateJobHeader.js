import React from "react";
import { Link } from "react-router-dom";

const CreateJobHeader = () => {
  return (
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="page-header-title">
              <h4 className="m-b-10">Create Job</h4>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/dashboard">Home</a>
              </li>
              <li className="breadcrumb-item">
                <Link to="/dashboard/recruitment/jobs">Manage Job</Link>
              </li>
              <li className="breadcrumb-item">Create Job</li>
            </ul>
          </div>
          <div className="col">
            <div className="float-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobHeader;

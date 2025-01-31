import React from "react";
import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";

const InterviewScheduleHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Interview Schedule</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https://demo.workdo.io/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Interview Schedule</li>
              </ul>
            </div>
            {/* <div className="col">
              <div className="float-end ">
                <Link
                  to="#"
                  data-url="https://demo.workdo.io/hrmgo/interview-schedule/create"
                  data-ajax-popup="true"
                  data-title="Create New Interview Schedule"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                > */}
                  {/* <FiPlus/> */}
                {/* </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewScheduleHeader;

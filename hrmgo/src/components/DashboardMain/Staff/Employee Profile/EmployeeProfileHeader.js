import React from 'react';
import { FiFilter } from "react-icons/fi";

const EmployeeProfileHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Employee Profile</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Employee Profile</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <a
                  className="btn btn-sm btn-primary collapsed"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                  title="Filter"
                >
                  <FiFilter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileHeader;

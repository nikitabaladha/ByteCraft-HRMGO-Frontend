import React from "react";
import { Link } from "react-router-dom"; 

const EmployeeSetSalaryHeader = () => {
  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Employee Salary</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link> 
                </li>
                <li className="breadcrumb-item">
                <Link to="/dashboard/payroll/set-salary">Set Salary</Link>
                </li>
                <li className="breadcrumb-item">Employee Set Salary</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end "></div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EmployeeSetSalaryHeader;

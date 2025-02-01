import React from "react";
import { Link } from "react-router-dom"; 

const PayslipHeader = () => {
  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Payslip</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">Payslip</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayslipHeader;

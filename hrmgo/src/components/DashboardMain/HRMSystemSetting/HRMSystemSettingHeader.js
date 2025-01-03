import React from "react";
import { Link } from "react-router-dom";

const HRMSystemSettingHeader = () => {
  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Setting</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Setting</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HRMSystemSettingHeader;

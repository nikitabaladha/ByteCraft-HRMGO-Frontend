import React from "react";
import { Link } from "react-router-dom";

const SystemSettingHeader = () => {
  return (
    
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Settings</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Settings</li>
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

export default SystemSettingHeader;

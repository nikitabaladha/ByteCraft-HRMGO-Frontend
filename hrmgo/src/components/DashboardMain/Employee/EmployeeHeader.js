//components/DashboardMain/Report/Employee/EmployeeHeader.js

import React from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { CiFileOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";

const EmployeeHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Employee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Employee</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  to="/export/employee"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Export"
                  className="btn btn-sm btn-primary"
                >
                  <TbFileExport />
                </Link>
                <Link
                  to="/"
                  data-url="/import/employee/file"
                  data-ajax-popup="true"
                  data-title="Import  employee CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Import"
                >
                  <CiFileOn />
                </Link>
                <Link
                  to="/employee/create"
                  data-title="Create New Employee"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FiPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeHeader;

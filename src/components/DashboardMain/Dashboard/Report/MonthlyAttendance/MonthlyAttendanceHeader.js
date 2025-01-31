//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpenseHeader.js

import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";

const MonthlyAttendanceHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Monthly Attendance</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  Manage Monthly Attendance Report
                </li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  to=""
                  className="btn btn-sm btn-primary"
                  onclick="saveAsPDF()"
                  data-bs-toggle="tooltip"
                  title="Download"
                  data-original-title="Download"
                >
                  <span className="btn-inner--icon">
                    <MdOutlineFileDownload />
                  </span>
                </Link>
                <Link
                  to="/report/attendance/2024-11/0/0/0"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Export"
                >
                  <span className="btn-inner--icon">
                    <TbFileExport />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MonthlyAttendanceHeader;

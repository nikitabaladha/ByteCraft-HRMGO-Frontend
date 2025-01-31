// HRMGO\hrmgo\src\components\DashboardMain\Timesheet\TimeSheet\TimeSheetHeader.js
import React from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { TbFileImport } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";

const TimeSheetHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Timesheet</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Timesheet</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  to="/export/timesheet"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport />
                </Link>
                <Link
                  to="/"
                  data-url="/import/timesheet/file"
                  data-ajax-popup="true"
                  data-title="Import Timesheet CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Import"
                >
                  <TbFileImport />
                </Link>
                <Link
                  to="/"
                  data-url="/timesheet/create"
                  data-ajax-popup="true"
                  data-size="md"
                  data-title="Create New Timesheet"
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

export default TimeSheetHeader;

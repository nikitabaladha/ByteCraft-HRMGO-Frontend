// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\Leave\LeaveHeader.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx";

const LeaveHeader = ({ leaveData }) => {
  useEffect(() => {
    console.log("Leave Data:", leaveData);
  }, [leaveData]);

  const exportData = () => {
    const headers = [
      "Employee ID",
      "Employee Name",
      "Approved Leaves",
      "Pending Leaves",
      "Rejected Leaves",
    ];

    const formattedData = leaveData.map((employee) => {
      let approvedLeaves = 0;
      let pendingLeaves = 0;
      let rejectedLeaves = 0;

      employee.leaves.forEach((leave) => {
        if (leave.status === "Approved") approvedLeaves++;
        if (leave.status === "Pending") pendingLeaves++;
        if (leave.status === "Rejected") rejectedLeaves++;
      });

      return [
        employee.employeeId,
        employee.employeeName,
        approvedLeaves,
        pendingLeaves,
        rejectedLeaves,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leave Report");
    const monthName = new Date().toLocaleString("default", { month: "long" });
    const year = new Date().getFullYear();
    XLSX.writeFile(wb, `Leave_Report_${monthName}_${year}.xlsx`);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Leave Report</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Leave Report</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  to="/"
                  className="btn btn-sm btn-primary me-2"
                  onclick="saveAsPDF()"
                  data-bs-toggle="tooltip"
                  title="Download"
                  data-original-title="Download"
                  style={{ marginRight: 5 }}
                >
                  <span className="btn-inner--icon">
                    <MdOutlineFileDownload />
                  </span>
                </Link>
                <Link
                  onClick={exportData}
                  className="btn btn-sm btn-primary float-end"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveHeader;

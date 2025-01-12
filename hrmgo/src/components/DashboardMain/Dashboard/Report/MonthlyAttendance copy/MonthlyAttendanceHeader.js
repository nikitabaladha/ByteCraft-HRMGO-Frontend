import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx";

const MonthlyAttendanceHeader = ({ attendanceData, selectedMonthYear }) => {
  if (!selectedMonthYear) {
    return null;
  }

  const [year, month] = selectedMonthYear.split("-").map(Number);

  const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(year, month - 1)
  );

  const totalDaysInMonth = new Date(year, month, 0).getDate();

  const employees = Array.isArray(attendanceData)
    ? attendanceData
    : [attendanceData].filter(Boolean);

  const handleExport = () => {
    const headers = ["Employee Name", ...Array.from({ length: totalDaysInMonth }, (_, index) => `${monthName} ${String(index + 1).padStart(2, "0")}`)];

    const formattedData = employees.map((employee) => {
      const attendanceForDays = Array.from({ length: totalDaysInMonth }, (_, index) => {
        const dateString = `${monthName} ${String(index + 1).padStart(2, "0")}, ${year}`;
        const attendanceRecord = employee.attendance.find((record) => record.date === dateString);
        return attendanceRecord ? (attendanceRecord.status === "Present" ? "P" : "A") : "-";
      });


      return [
        employee.employeeName,
        ...attendanceForDays,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([headers, ...formattedData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");
    XLSX.writeFile(wb, `Attendance_Report_${monthName}_${year}.xlsx`);
  };

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
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Export"
                  onClick={handleExport} 
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

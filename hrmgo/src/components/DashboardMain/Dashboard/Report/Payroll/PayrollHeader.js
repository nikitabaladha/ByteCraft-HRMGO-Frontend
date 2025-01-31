import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx";

const MarkedAttendanceHeader = ({ payrollData }) => {
  const handleExport = () => {
    const filteredData = payrollData.map(item => {
      const formattedDate = new Date(item.Date);
      const monthYear = `${formattedDate.getFullYear()}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}`;
      
      return {
        EmployeeID: item.employeeId,
        Name: item.employeeName,
        Month: monthYear, 
        Salary: item.salary,
        NetSalary: item.grandTotal
      };
    });

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payroll Report");
    XLSX.writeFile(wb, "payroll_report.xlsx");
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Payroll</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Payroll Report</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end "></div>
              <Link
                className="btn btn-sm btn-primary float-end"
                // onclick="saveAsPDF()"
                data-bs-toggle="tooltip"
                title="Download"
                data-original-title="Download"
              >
                <span className="btn-inner--icon">
                  <MdOutlineFileDownload />
                </span>
              </Link>
              <Link
                onClick={handleExport}
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
    </>
  );
};

export default MarkedAttendanceHeader;

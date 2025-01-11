// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\Attendance\BulkAttendance\BulkAttendanceTable.js

import React from "react";

const BulkAttendanceTable = ({ attendanceData }) => {
  if (!attendanceData || attendanceData.length === 0) {
    return <div>No attendance data available.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee Name</th>
            <th>Branch</th>
            <th>Department</th>
            <th>Date</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.employeeName}</td>
              <td>{item.branchName}</td>
              <td>{item.departmentName}</td>
              <td>{item.date}</td>
              <td>{item.attendanceStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BulkAttendanceTable;

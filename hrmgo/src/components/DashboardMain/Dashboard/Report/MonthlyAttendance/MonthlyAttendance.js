import React, { useState } from "react";
import MonthlyAttendanceHeader from "./MonthlyAttendanceHeader";
import MonthlyAttendanceSearchForm from "./MonthlyAttendanceSearchForm";
import AttendanceReport from "./AttendanceReport";
import AttendanceTable from "./AttendanceTable";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");

  const handleDataFetched = (data, monthYear) => {
    setAttendanceData(data);
    setSelectedMonthYear(monthYear);
    console.log("Fetched attendance data:", data, "Month-Year:", monthYear);
  };

  return (
    <>
      <MonthlyAttendanceHeader />
      <div className="row">
        <MonthlyAttendanceSearchForm onDataFetched={handleDataFetched} />
        <AttendanceReport />

        <AttendanceTable
          attendanceData={attendanceData}
          selectedMonthYear={selectedMonthYear}
        />
      </div>
    </>
  );
};

export default MonthlyAttendance;

import React, { useState, useEffect } from "react";
import MonthlyAttendanceHeader from "./MonthlyAttendanceHeader";
import MonthlyAttendanceSearchForm from "./MonthlyAttendanceSearchForm";
import AttendanceReport from "./AttendanceReport";
import AttendanceTable from "./AttendanceTable";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState(""); // Add state for monthYear

  // Set the default selected month to the current month on page load
  useEffect(() => {
    const currentMonthYear = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
    setSelectedMonthYear(currentMonthYear); // Set the selected month to current month
  }, []);

  const handleDataFetched = (data, monthYear) => {
    setAttendanceData(data);
    setSelectedMonthYear(monthYear); // Capture the selected monthYear
    console.log("Fetched attendance data:", data, "Month-Year:", monthYear);
  };

  return (
    <>
      <MonthlyAttendanceHeader />
      <div className="row">
        <MonthlyAttendanceSearchForm
          onDataFetched={handleDataFetched}
          selectedMonthYear={selectedMonthYear} // Pass selected monthYear
        />
        <AttendanceReport />
        <AttendanceTable
          attendanceData={attendanceData}
          selectedMonthYear={selectedMonthYear} // Pass monthYear to AttendanceTable
        />
      </div>
    </>
  );
};

export default MonthlyAttendance;

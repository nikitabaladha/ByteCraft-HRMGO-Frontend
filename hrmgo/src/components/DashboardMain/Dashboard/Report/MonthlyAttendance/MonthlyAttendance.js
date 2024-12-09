//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpense.js

import React from "react";
import MonthlyAttendanceHeader from "./MonthlyAttendanceHeader";
import MonthlyAttendanceSearchForm from "./MonthlyAttendanceSearchForm";
import AttendanceReport from "./AttendanceReport";
import AttendanceTable from "./AttendanceTable";

const MonthlyAttendance = () => {
  return (
    <>
      <MonthlyAttendanceHeader />
      <div class="row">
        <MonthlyAttendanceSearchForm />
        <AttendanceReport />
        <AttendanceTable />
      </div>
    </>
  );
};

export default MonthlyAttendance;

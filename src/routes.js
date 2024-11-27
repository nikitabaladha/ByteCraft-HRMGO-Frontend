import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DashboardMain from "./components/DashboardMain/DashboardMain";
import Overview from "./components/DashboardMain/Dashboard/Overview/Overview";
import IncomeVsExpense from "./components/DashboardMain/Dashboard/Report/IncomeVsExpense/IncomeVsExpense.js";
import MonthlyAttendance from "./components/DashboardMain/Dashboard/Report/MonthlyAttendance/MonthlyAttendance.js";
import Leave from "./components/DashboardMain/Dashboard/Report/Leave/Leave";
import AccountStatement from "./components/DashboardMain/Dashboard/Report/AccountStatement/AccountStatement.js";
import Employee from "./components/DashboardMain/Employee/Employee.js";
import ManageLeave from "./components/DashboardMain/Timesheet/ManageLeave/ManageLeave.js";
import TimeSheet from "./components/DashboardMain/Timesheet/TimeSheet/TimeSheet.js";
import MarkedAttendance from "./components/DashboardMain/Timesheet/Attendance/MarkedAttendance/MarkedAttendance.js";
import BulkAttendance from "./components/DashboardMain/Timesheet/Attendance/BulkAttendance/BulkAttendance.js";
import Indicator from "./components/DashboardMain/Performance/Indicator/Indicator.js";
import Appraisal from "./components/DashboardMain/Performance/Appraisal/Appraisal.js";
import TrainingList from "./components/DashboardMain/Training/TrainingList/TrainingList.js";
import Trainer from "./components/DashboardMain/Training/Trainer/Trainer.js";

const AppRoutes = ({ isAuthenticated, handleLogin }) => {
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardMain />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route
              path="report/income-vs-expense"
              element={<IncomeVsExpense />}
            />
            <Route
              path="report/monthly-attendance"
              element={<MonthlyAttendance />}
            />
            <Route path="report/leave" element={<Leave />} />
            <Route
              path="report/account-statement"
              element={<AccountStatement />}
            />
            <Route path="employee" element={<Employee />} />

            <Route path="time-sheet/manage-leave" element={<ManageLeave />} />
            <Route path="time-sheet/time-sheet" element={<TimeSheet />} />
            <Route
              path="time-sheet/attendance/marked-attendance"
              element={<MarkedAttendance />}
            />
            <Route
              path="time-sheet/attendance/bulk-attendance"
              element={<BulkAttendance />}
            />
            <Route path="performance/indicator" element={<Indicator />} />
            <Route path="performance/appraisal" element={<Appraisal />} />
            <Route path="/dashboard/training" element={<TrainingList />}></Route>
            <Route path="/dashboard/training/trainer" element={<Trainer />}></Route>
          </Route>

          

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;

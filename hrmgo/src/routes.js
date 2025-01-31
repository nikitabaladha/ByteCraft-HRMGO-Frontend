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
import Payroll from "./components/DashboardMain/Dashboard/Report/Payroll/Payroll";

import Employee from "./components/DashboardMain/Employee/Employee.js";
import CreateEmployee from "./components/DashboardMain/Employee/CreateEmployee/CreateEmployee.js";
import UpdateEmployee from "./components/DashboardMain/Employee/UpdateEmployee/UpdateEmployee.js";

import ManageLeave from "./components/DashboardMain/Timesheet/ManageLeave/ManageLeave.js";
import MarkedAttendance from "./components/DashboardMain/Timesheet/Attendance/MarkedAttendance/MarkedAttendance.js";
import BulkAttendance from "./components/DashboardMain/Timesheet/Attendance/BulkAttendance/BulkAttendance.js";
import ManageLeaveCalendarView from "./components/DashboardMain/Timesheet/ManageLeave/ManageLeaveCalendarView/ManageLeaveCalendarView.js";

import Indicator from "./components/DashboardMain/Performance/Indicator/Indicator.js";
import Appraisal from "./components/DashboardMain/Performance/Appraisal/Appraisal.js";

import Award from "./components/DashboardMain/HrAdminSetup/Award/Award.js";
import Resignation from "./components/DashboardMain/HrAdminSetup/Resignation/Resignation.js";
import Promotion from "./components/DashboardMain/HrAdminSetup/Promotion/Promotion.js";
import Complaint from "./components/DashboardMain/HrAdminSetup/Complaint/Complaint.js";
import Warning from "./components/DashboardMain/HrAdminSetup/Warning/Warning.js";
import Termination from "./components/DashboardMain/HrAdminSetup/Termination/Termination.js";
import Announcement from "./components/DashboardMain/HrAdminSetup/Announcement/Announcement.js";
import Holiday from "./components/DashboardMain/HrAdminSetup/Holiday/Holiday.js";
import HolidayCalendarView from "./components/DashboardMain/HrAdminSetup/Holiday/HolidayCalendarView/HolidayCalendarView.js";

import Contract from "./components/DashboardMain/Contract/Contract.js";
import ContractDetail from "./components/DashboardMain/Contract/ContractDetail/ContractDetail.js";
import ContractPreview from "./components/DashboardMain/Contract/ContractDetail/ContractPreview.js";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accessToken");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = !localStorage.getItem("accessToken");
  return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route path="/contract/preview/:id" element={<ContractPreview />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardMain />
          </PrivateRoute>
        }
      >
        <Route index element={<Overview />} />

        <Route path="overview" element={<Overview />} />
        <Route path="report/income-vs-expense" element={<IncomeVsExpense />} />
        <Route
          path="report/monthly-attendance"
          element={<MonthlyAttendance />}
        />
        <Route path="report/leave" element={<Leave />} />
        <Route path="report/account-statement" element={<AccountStatement />} />
        <Route path="report/payroll" element={<Payroll />} />

        <Route path="employee" element={<Employee />}>
          <Route path="create" element={<CreateEmployee />} />
          <Route path="update" element={<UpdateEmployee />} />
        </Route>

        <Route path="time-sheet/manage-leave" element={<ManageLeave />}>
          <Route path="calendar" element={<ManageLeaveCalendarView />} />
        </Route>

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

        <Route path="hr-admin-setup/award" element={<Award />} />
        <Route path="hr-admin-setup/resignation" element={<Resignation />} />
        <Route path="hr-admin-setup/promotion" element={<Promotion />} />
        <Route path="hr-admin-setup/complaint" element={<Complaint />} />
        <Route path="hr-admin-setup/warning" element={<Warning />} />
        <Route path="hr-admin-setup/termination" element={<Termination />} />
        <Route path="hr-admin-setup/announcement" element={<Announcement />} />

        <Route path="hr-admin-setup/holiday" element={<Holiday />}>
          <Route path="calendar" element={<HolidayCalendarView />} />
        </Route>

        <Route path="contract" element={<Contract />} />
        <Route path="contract/:id" element={<ContractDetail />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

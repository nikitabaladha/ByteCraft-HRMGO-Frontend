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
import SetSalary from "./components/DashboardMain/Payroll/SetSalary/SetSalary.js";
import EmployeeSetSalary from "./components/DashboardMain/Payroll/EmployeeSetSalary/EmployeeSetSalary.js";
import EmployeeSetSalaryview from "./components/DashboardMain/Payroll/EmployeeSetSalryview/EmployeeSetSalaryview.js";
import AccountList from "./components/DashboardMain/Finance/AccountList/AccountList.js";
import AccountBalance from "./components/DashboardMain/Finance/AccountBalance/AccountBalance.js";
import Payees from "./components/DashboardMain/Finance/Payees/Payees.js";
import Payers from "./components/DashboardMain/Finance/Payers/Payers.js";
import Deposit from "./components/DashboardMain/Finance/Deposit/Deposit.js";
import Expense from "./components/DashboardMain/Finance/Expense/Expense.js";
import TransferBalance from "./components/DashboardMain/Finance/TransferBalance/TransferBalance.js";
import Ticket from "./components/DashboardMain/Ticket/Ticket.js";
import TicketReply from "./components/DashboardMain/Ticket/TicketReply/TicketReply.js";
import Meeting from "./components/DashboardMain/Meeting/Meeting.js";
import MeetingCalendar from "./components/DashboardMain/Meeting/Meetingcalendar/MeetingCalendar.js";
import ZoomMeeting from "./components/DashboardMain/ZoomMeeting/ZoomMeeting.js"
import ZoomMeetingCalendar from "./components/DashboardMain/ZoomMeeting/ZoomMeetingcalendar/ZoomMeetingCalendar.js";
// import Event from "./components/DashboardMain/Event/Event.js";
import CompanyPolicy from "./components/DashboardMain/CompanyPolicy/ComapnyPolicy.js"



// Path to Dashboard component




import Payslip from "./components/DashboardMain/Payroll/Payslip/Payslip.js";

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

            <Route path="payroll/payslip" element={<Payslip />} />
            <Route path="payroll/set-salary" element={<SetSalary />} />
            <Route path="payroll/employee-set-salary/:employeeId" element={<EmployeeSetSalary />} />
            <Route path="payroll/employee-set-salaryview/:employeeId" element={<EmployeeSetSalaryview />} />
           



            <Route path="finance/account-list" element={<AccountList />} />
            <Route path="finance/account-balance" element={<AccountBalance/>}  />
            <Route path="finance/payees" element={<Payees/>}  />
            <Route path="finance/payer" element={<Payers/>}  />
            <Route path="finance/deposit" element={<Deposit/>}  />
            <Route path="finance/expense" element={<Expense/>} />
            <Route path="finance/transfer-balance" element={< TransferBalance/>} />

            <Route path="ticket" element={< Ticket/>} />
            <Route path="ticket/:ticketId" element={<TicketReply />} />

            <Route path="meeting" element={<Meeting />} />
            <Route path="meetings" element={<MeetingCalendar />} />

            <Route path="zoom-meeting"element={<ZoomMeeting />} />
            <Route path="Zoom-meetings" element={<ZoomMeetingCalendar />} />

            {/* <Route path="event"element={<Event />} /> */}
            <Route path="company-policy" element={<CompanyPolicy />} />

           



          {/* Nested route for TicketReply */}
             
        
           
         
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;

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
import HRMSystem from "./components/DashboardMain/HRMSystem/Branch/Branch.js";
import Department from "./components/DashboardMain/HRMSystem/Department/Department.js";
import Designation from "./components/DashboardMain/HRMSystem/Designation/Designation.js";
import LeaveType from "./components/DashboardMain/HRMSystem/LeaveType/LeaveType.js";
import PayslipType from "./components/DashboardMain/HRMSystem/PayslipType/PayslipType.js";
import DocumentType from "./components/DashboardMain/HRMSystem/DocumentType/DocumentType.js";
import AllowanceOption from "./components/DashboardMain/HRMSystem/AllowanceOption/AllowanceOption.js";
import LoanOption from "./components/DashboardMain/HRMSystem/LoanOption/LoanOption.js";
import DeductionOption from "./components/DashboardMain/HRMSystem/DeductionOption/DeductionOption.js";
import TrainingType from "./components/DashboardMain/HRMSystem/TrainingType/TrainingType.js";
import AwardType from "./components/DashboardMain/HRMSystem/AwardType/AwardType.js";
import JobStage from "./components/DashboardMain/HRMSystem/JobStage/JobStage.js"
import TerminationType from "./components/DashboardMain/HRMSystem/TerminationType/TerminationType.js";
import PerformanceType from "./components/DashboardMain/HRMSystem/PerformanceType/PerformanceType.js";
import ExpenseType from "./components/DashboardMain/HRMSystem/ExpenseType/ExpenseType.js";
import IncomeType from "./components/DashboardMain/HRMSystem/IncomeType/IncomeType.js";
import PaymentType from "./components/DashboardMain/HRMSystem/PaymentType/PaymentType.js";
import ContractType from "./components/DashboardMain/HRMSystem/ContractType/ContractType.js";
import JobCategory from "./components/DashboardMain/HRMSystem/JobCategory/JobCategory.js";
import Payslip from "./components/DashboardMain/Payroll/Payslip/Payslip.js";
import HRMSystemSetting from "./components/DashboardMain/HRMSystemSetting/HRMSystemSetting.js";

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
            <Route path="payroll/employee-set-salary/:id" element={<EmployeeSetSalary />} />
           



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

            <Route path="hrm-system-branch" element={<HRMSystem />} />
            <Route path="hrm-system-department" element={<Department/>} />
            <Route path="hrm-system-designation" element={<Designation/>} />
            <Route path="hrm-system-leavetype" element={<LeaveType/>} />
            <Route path="hrm-system-paysliptype" element={<PayslipType/>} />
            <Route path="hrm-system-document" element={<DocumentType/>} />
            <Route path="hrm-system-allowanceoption" element={<AllowanceOption/>} />
            <Route path="hrm-system-loanoption" element={<LoanOption/>} />
            <Route path="hrm-system-deductionoption" element={<DeductionOption/>} />
            <Route path="hrm-system-trainingtype" element={<TrainingType/>} />
            <Route path="hrm-system-awardtype" element={<AwardType/>} />
            <Route path="hrm-system-job-stage" element={<JobStage/>} />
            <Route path="hrm-system-terminationtype" element={<TerminationType/>} />
            <Route path="hrm-system-performanceType" element={<PerformanceType/>} />
            <Route path="hrm-system-expensetype" element={<ExpenseType/>} />
            <Route path="hrm-system-incometype" element={<IncomeType/>} />
            <Route path="hrm-system-paymenttype" element={<PaymentType/>} />
            <Route path="hrm-system-contract_type" element={<ContractType/>} />
            <Route path="hrm-system-job-category" element={<JobCategory/>} />

            <Route path="system-settings" element={<HRMSystemSetting/>} />

        

       
        
            

           



          {/* Nested route for TicketReply */}
             
        
           
         
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;

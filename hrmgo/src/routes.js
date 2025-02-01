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
import UpdateEmployeeFromEmployee from "./components/DashboardMain/Employee/UpdateEmployee/UpdateEmployee.js";

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

// Aakash routes

import UpdateEmployee from "./components/DashboardMain/Staff/Employee Profile/UpdateEmployee.js";

import TrainingList from "./components/DashboardMain/Training/TrainingList/TrainingList.js";

import Trainer from "./components/DashboardMain/Training/Trainer/Trainer.js";

import TrainingListView from "./components/DashboardMain/Training/TrainingList/TrainingListView.js";

import RecruitmentJobs from "./components/DashboardMain/Recruitment/Jobs/jobs.js";

import CreateJob from "./components/DashboardMain/Recruitment/Create Jobs/CreateJob.js";

import JobView from "./components/DashboardMain/Recruitment/Jobs/JobView.js";

import EditJob from "./components/DashboardMain/Recruitment/Jobs/editJob.js";

import JobApplication from "./components/DashboardMain/Recruitment/JobApplication/JobApplication.js";

import JobApllicationView from "./components/DashboardMain/Recruitment/JobApplication/JobApllicationView.js";

import JobCandidate from "./components/DashboardMain/Recruitment/JobCandidate/JobCandidate.js";

import JobOnBoarding from "./components/DashboardMain/Recruitment/JobOnBoarding/JobOnBoarding.js";

import ConvertToEmployee from "./components/DashboardMain/Recruitment/JobOnBoarding/ConvertToEmployee.js";

import InterviewScheldule from "./components/DashboardMain/Recruitment/Interview Schedule/InterviewScheldule.js";

import RecruitmentCareer from "./components/DashboardMain/Recruitment/Career/RecruitmentCareer.js";

import CareerJobView from "./components/DashboardMain/Recruitment/Career/CareerJobView.js";

import CareerApplyJob from "./components/DashboardMain/Recruitment/Career/CareerApplyJob.js";

import SystemSetting from "./components/DashboardMain/System Setting/SystemSetting.js";

import User from "./components/DashboardMain/Staff/User/User.js";

import MyProfile from "./components/Header/My Profile/MyProfile.js";

import StaffRole from "./components/DashboardMain/Staff/Role/StaffRole.js";

import EmployeeProfile from "./components/DashboardMain/Staff/Employee Profile/EmployeeProfile.js";

import Messenger from "./components/DashboardMain/Messenger/Messenger.js";

// Shantanu Routes

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

import ZoomMeeting from "./components/DashboardMain/ZoomMeeting/ZoomMeeting.js";

import ZoomMeetingCalendar from "./components/DashboardMain/ZoomMeeting/ZoomMeetingcalendar/ZoomMeetingCalendar.js";

// import Event from "./components/DashboardMain/Event/Event.js";

import CompanyPolicy from "./components/DashboardMain/CompanyPolicy/ComapnyPolicy.js";

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

import JobStage from "./components/DashboardMain/HRMSystem/JobStage/JobStage.js";

import TerminationType from "./components/DashboardMain/HRMSystem/TerminationType/TerminationType.js";

import PerformanceType from "./components/DashboardMain/HRMSystem/PerformanceType/PerformanceType.js";

import ExpenseType from "./components/DashboardMain/HRMSystem/ExpenseType/ExpenseType.js";

import IncomeType from "./components/DashboardMain/HRMSystem/IncomeType/IncomeType.js";

import PaymentType from "./components/DashboardMain/HRMSystem/PaymentType/PaymentType.js";

import ContractType from "./components/DashboardMain/HRMSystem/ContractType/ContractType.js";

import JobCategory from "./components/DashboardMain/HRMSystem/JobCategory/JobCategory.js";

import Payslip from "./components/DashboardMain/Payroll/Payslip/Payslip.js";

// import HRMSystemSetting from "./components/DashboardMain/HRMSystemSetting/HRMSystemSetting.js";

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

      <Route
        path="/dashboard/recruitment/career"
        element={
          <PrivateRoute>
            <RecruitmentCareer />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/dashboard/recruitment/careerJob/:id"
        element={
          <PrivateRoute>
            <CareerJobView />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/dashboard/recruitment/applyJob/:id"
        element={
          <PrivateRoute>
            <CareerApplyJob />{" "}
          </PrivateRoute>
        }
      ></Route>

      <Route
        path="/contract/preview/:id"
        element={
          <PrivateRoute>
            <ContractPreview />
          </PrivateRoute>
        }
      />
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
          <Route path="update" element={<UpdateEmployeeFromEmployee />} />
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
        {/* Aakash routes */}
        <Route path="/dashboard/training" element={<TrainingList />}></Route>
        <Route
          path="/dashboard/trainingList-View/:id"
          element={<TrainingListView />}
        ></Route>
        <Route path="/dashboard/training/trainer" element={<Trainer />}></Route>
        <Route
          path="/dashboard/recruitment/create-job"
          element={<CreateJob />}
        ></Route>
        <Route
          path="/dashboard/recruitment/jobs"
          element={<RecruitmentJobs />}
        ></Route>
        <Route
          path="/dashboard/recruitment/jobs/:id"
          element={<JobView />}
        ></Route>
        <Route
          path="/dashboard/recruitment/job-edit/:id"
          element={<EditJob />}
        ></Route>
        <Route
          path="/dashboard/recruitment/job-application"
          element={<JobApplication />}
        ></Route>
        <Route
          path="/dashboard/recruitment/job-application-view/:id"
          element={<JobApllicationView />}
        ></Route>
        <Route
          path="/dashboard/recruitment/job-candidate"
          element={<JobCandidate />}
        ></Route>
        <Route
          path="/dashboard/recruitment/job-on-boarding"
          element={<JobOnBoarding />}
        ></Route>
        <Route
          path="/dashboard/recruitment/convert-to-emoloyee/:id"
          element={<ConvertToEmployee />}
        ></Route>
        <Route
          path="/dashboard/recruitment/inrterview-schedule"
          element={<InterviewScheldule />}
        ></Route>
        <Route
          path="/dashboard/system-setting"
          element={<SystemSetting />}
        ></Route>
        <Route path="/dashboard/staff/user" element={<User />}></Route>
        <Route
          path="/dashboard/account-setting"
          element={<MyProfile />}
        ></Route>
        <Route path="/dashboard/staff/role" element={<StaffRole />}></Route>
        <Route
          path="/dashboard/staff/employee-profile"
          element={<EmployeeProfile />}
        ></Route>
        <Route path="/dashboard/messenger" element={<Messenger />}></Route>
        {/* Shantanu */}
        <Route path="payroll/payslip" element={<Payslip />} />

        <Route path="payroll/set-salary" element={<SetSalary />} />

        <Route
          path="payroll/employee-set-salary/:employeeId"
          element={<EmployeeSetSalary />}
        />

        <Route
          path="payroll/employee-set-salaryview/:employeeId"
          element={<EmployeeSetSalaryview />}
        />

        <Route
          path="payroll/employee-set-salary/:id"
          element={<EmployeeSetSalary />}
        />

        <Route path="finance/account-list" element={<AccountList />} />

        <Route path="finance/account-balance" element={<AccountBalance />} />

        <Route path="finance/payees" element={<Payees />} />

        <Route path="finance/payer" element={<Payers />} />

        <Route path="finance/deposit" element={<Deposit />} />

        <Route path="finance/expense" element={<Expense />} />

        <Route path="finance/transfer-balance" element={<TransferBalance />} />

        <Route path="ticket" element={<Ticket />} />

        <Route path="ticket/:ticketId" element={<TicketReply />} />

        <Route path="meeting" element={<Meeting />} />

        <Route path="meetings" element={<MeetingCalendar />} />

        <Route path="zoom-meeting" element={<ZoomMeeting />} />

        <Route path="Zoom-meetings" element={<ZoomMeetingCalendar />} />

        {/* <Route path="event" element={<Event />} /> */}
        <Route path="company-policy" element={<CompanyPolicy />} />
        <Route path="hrm-system-branch" element={<HRMSystem />} />
        <Route path="hrm-system-department" element={<Department />} />
        <Route path="hrm-system-designation" element={<Designation />} />
        <Route path="hrm-system-leavetype" element={<LeaveType />} />
        <Route path="hrm-system-paysliptype" element={<PayslipType />} />
        <Route path="hrm-system-document" element={<DocumentType />} />
        <Route
          path="hrm-system-allowanceoption"
          element={<AllowanceOption />}
        />
        <Route path="hrm-system-loanoption" element={<LoanOption />} />
        <Route
          path="hrm-system-deductionoption"
          element={<DeductionOption />}
        />
        <Route path="hrm-system-trainingtype" element={<TrainingType />} />
        <Route path="hrm-system-awardtype" element={<AwardType />} />
        <Route path="hrm-system-job-stage" element={<JobStage />} />
        <Route
          path="hrm-system-terminationtype"
          element={<TerminationType />}
        />
        <Route
          path="hrm-system-performanceType"
          element={<PerformanceType />}
        />
        <Route path="hrm-system-expensetype" element={<ExpenseType />} />
        <Route path="hrm-system-incometype" element={<IncomeType />} />
        <Route path="hrm-system-paymenttype" element={<PaymentType />} />
        <Route path="hrm-system-contract_type" element={<ContractType />} />
        <Route path="hrm-system-job-category" element={<JobCategory />} />
        {/* <Route path="system-settings" element={<HRMSystemSetting />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

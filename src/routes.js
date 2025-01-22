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
import CreateEmployee from "./components/DashboardMain/Employee/CreateEmployee.js";
import UpdateEmployee from "./components/DashboardMain/Staff/Employee Profile/UpdateEmployee.js";
import ManageLeave from "./components/DashboardMain/Timesheet/ManageLeave/ManageLeave.js";
import TimeSheet from "./components/DashboardMain/Timesheet/TimeSheet/TimeSheet.js";
import MarkedAttendance from "./components/DashboardMain/Timesheet/Attendance/MarkedAttendance/MarkedAttendance.js";
import BulkAttendance from "./components/DashboardMain/Timesheet/Attendance/BulkAttendance/BulkAttendance.js";
import Indicator from "./components/DashboardMain/Performance/Indicator/Indicator.js";
import Appraisal from "./components/DashboardMain/Performance/Appraisal/Appraisal.js";
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
             <Route path="employee" element={<Employee />}>
          <Route path="create" element={<CreateEmployee />} />
          <Route path="update" element={<UpdateEmployee />} />
        </Route>

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
            <Route path="/dashboard/trainingList-View/:id" element={<TrainingListView />}></Route>
            <Route path="/dashboard/training/trainer" element={<Trainer />}></Route>
            <Route path="/dashboard/recruitment/create-job" element={<CreateJob/>}></Route>
            <Route path="/dashboard/recruitment/jobs" element={<RecruitmentJobs/>}></Route>
            <Route path="/dashboard/recruitment/jobs/:id" element={<JobView/>}></Route>
            <Route path="/dashboard/recruitment/job-edit/:id" element={<EditJob/>}></Route>
            <Route path="/dashboard/recruitment/job-application" element={<JobApplication/>}></Route>
            <Route path="/dashboard/recruitment/job-application-view/:id" element={<JobApllicationView/>}></Route>
            <Route path="/dashboard/recruitment/job-candidate" element={<JobCandidate/>}></Route>
            <Route path="/dashboard/recruitment/job-on-boarding" element={<JobOnBoarding/>}></Route>
            <Route path="/dashboard/recruitment/convert-to-emoloyee/:id" element={<ConvertToEmployee/>}></Route>
            <Route path="/dashboard/recruitment/inrterview-schedule" element={<InterviewScheldule/>}
            ></Route>
            <Route path="/dashboard/system-setting" element={<SystemSetting/>}></Route>
            <Route path="/dashboard/staff/user" element={<User/>}></Route>
            <Route path="/dashboard/account-setting" element={<MyProfile/>}></Route>
            <Route path="/dashboard/staff/role" element={<StaffRole/>}></Route>
            <Route path="/dashboard/staff/employee-profile" element={<EmployeeProfile/>}></Route>
            <Route path="/dashboard/messenger" element={<Messenger/>}></Route>
          </Route>

          

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
      <Route path="/dashboard/recruitment/career" element={<RecruitmentCareer/>}></Route>
      <Route path="/dashboard/recruitment/careerJob/:id" element={<CareerJobView/>}></Route>
      <Route path="/dashboard/recruitment/applyJob/:id" element={<CareerApplyJob/>}></Route>
    </Routes>
  );
};

export default AppRoutes;

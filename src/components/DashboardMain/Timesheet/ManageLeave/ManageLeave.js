// HRMGO\hrmgo\src\components\DashboardMain\Timesheet\ManageLeave\ManageLeave.js

import React from "react";

import ManageLeaveHeader from "./ManageLeaveHeader";
import ManageLeaveTable from "./ManageLeaveTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageLeave = () => {
  return (
    <>
      <ToastContainer />
      <ManageLeaveHeader />
      <ManageLeaveTable />
    </>
  );
};

export default ManageLeave;

// components/DashboardMain/Overview/Overview.js

import React from "react";

import DashboardMainHeader from "./DashboardMainHeader.js";
import DashboardMetrics from "./DashboardMetrics.js";
import MeetingAttendanceCalender from "./MeetingAttendanceCalender/MeetingAttendanceCalender.js";
import Announcement from "./Announcement.js";

const OverView = () => {
  return (
    <>
      <DashboardMainHeader />
      <DashboardMetrics />
      <MeetingAttendanceCalender />
      <Announcement />
    </>
  );
};

export default OverView;

// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\ManageLeave\ManageLeaveCalendarView\ManageLeaveCalendarView.js

import React, { useState, useEffect } from "react";

import ManageLeaveCalendarHeader from "./ManageLeaveCalendarHeader";

import getAPI from "../../../../../api/getAPI";
import ManageLeaveCalendar from "./ManageLeaveCalendar";
import LeaveList from "./LeaveList";

const ManageLeaveCalendarView = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  useEffect(() => {
    const fetchMangeLeaveData = async () => {
      try {
        const response = await getAPI(`/manage-leave-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setLeaveData(response.data.data);
          console.log(
            "Leave Data fetched successfully from Manage leave calender",
            response.data.data
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching leave Data:", err);
      }
    };

    fetchMangeLeaveData();
  }, []);

  const handleStatusUpdate = (leaveId, newStatus) => {
    setLeaveData((prevData) =>
      prevData.map((leave) =>
        leave.id === leaveId ? { ...leave, status: newStatus } : leave
      )
    );
  };

  const addLeave = (newLeave) => {
    setLeaveData((prevLeaveData) => [...prevLeaveData, newLeave]);
  };

  return (
    <>
      <>
        <ManageLeaveCalendarHeader addLeave={addLeave} />

        <div className="row">
          <ManageLeaveCalendar
            leaveData={leaveData}
            setLeaveData={setLeaveData}
            selectedLeave={selectedLeave}
            setSelectedLeave={setSelectedLeave}
            handleStatusUpdate={handleStatusUpdate}
          />
          <LeaveList leaveData={leaveData} />
        </div>
      </>
    </>
  );
};

export default ManageLeaveCalendarView;

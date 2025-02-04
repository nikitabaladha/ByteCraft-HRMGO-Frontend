// HRMGO\hrmgo\src\components\DashboardMain\Timesheet\ManageLeave\ManageLeave.js

import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../../api/getAPI";
import ManageLeaveCalendarView from "./ManageLeaveCalendarView/ManageLeaveCalendarView";

import ManageLeaveHeader from "./ManageLeaveHeader";
import ManageLeaveTable from "./ManageLeaveTable";
import "react-toastify/dist/ReactToastify.css";

const ManageLeave = () => {
  const location = useLocation();

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
          console.log("Leave Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching leave Data:", err);
      }
    };

    fetchMangeLeaveData();
  }, []);

  const addLeave = (newLeave) => {
    setLeaveData((prevLeaveData) => [...prevLeaveData, newLeave]);
  };

  const updateLeave = (newUpdatedLeave) => {
    setLeaveData((prevLeaveData) =>
      prevLeaveData.map((leave) =>
        leave.id === newUpdatedLeave.id ? newUpdatedLeave : leave
      )
    );
  };

  const isCalendarRoute =
    location.pathname === "/dashboard/time-sheet/manage-leave/calendar";

  return (
    <>
      {isCalendarRoute ? (
        <ManageLeaveCalendarView />
      ) : (
        <>
          <ManageLeaveHeader addLeave={addLeave} />
          <ManageLeaveTable
            leaveData={leaveData}
            setLeaveData={setLeaveData}
            selectedLeave={selectedLeave}
            setSelectedLeave={setSelectedLeave}
            updateLeave={updateLeave}
          />
        </>
      )}
    </>
  );
};

export default ManageLeave;

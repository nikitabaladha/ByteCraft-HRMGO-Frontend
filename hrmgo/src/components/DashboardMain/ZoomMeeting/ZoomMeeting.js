// components/DashboardMain/Overview/Overview.js

import React from "react";
import ZoomMeetingHeader from "./ZoomMeetingHeader";
import ZoomMeetingTable from "./ZoomMeetingTable";
import getAPI from "../../../api/getAPI";
import { useState, useEffect } from "react";
// import { toast } from "react-toastify";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

      const fetchMeetings = async () => {
        try {
          const response = await getAPI("/getall_zoommeeting", {}, true);
          const updatedMeetings = response.data.meetings.map((meeting) => ({
            ...meeting,
            status: meeting.status || "Waiting",
          }));
          setMeetings(updatedMeetings);
        } catch (err) {
          // console.Error("Failed to fetch Meetings");
        }
      };
  
      useEffect(() => {
      fetchMeetings();
    }, []);
  return (
    <>
      <ZoomMeetingHeader fetchMeetings={fetchMeetings} />
      <ZoomMeetingTable meetings={meetings} setMeetings={setMeetings} fetchMeetings={fetchMeetings} />
    </>
  );
};

export default Meeting;

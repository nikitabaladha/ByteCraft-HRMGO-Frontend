// components/DashboardMain/Overview/Overview.js
import React, { useEffect,useState} from "react";
import MeetingHeader from "./MeetingHeader";
import MeetingTable from "./MeetingTable";
import getAPI from "../../../api/getAPI";

const Meeting = () => {
    const [meetings, setMeetings] = useState([]);
  

    const fetchMeetings = async () => {
      try {
        const response = await getAPI("/meeting-getall", {}, true);
        setMeetings(response.data.meetings);
      } catch (err) {
        console.Error("Failed to fetch Meetings");

      }
    };
    useEffect(() => {
    fetchMeetings();
  }, []);
  return (
    <>
      <MeetingHeader fetchMeetings={fetchMeetings}/>
      <MeetingTable meetings={meetings} setMeetings={setMeetings} fetchMeetings={fetchMeetings}/>
     
    </>
  );
};

export default Meeting;

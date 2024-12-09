import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const response = await getAPI(`/meeting-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setMeetings(response.data.data);
          console.log("Meetings fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching meetings:", err);
      }
    };

    fetchMeeting();
  }, []);

  return (
    <div className="card">
      <div className="card-header card-body table-border-style">
        <h5>Meeting Schedule</h5>
      </div>
      <div className="card-body" style={{ height: 324, overflow: "auto" }}>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody className="list">
              {meetings.map((meeting) => (
                <tr key={meeting._id}>
                  <td>{meeting.title}</td>
                  <td>{formatDate(meeting.date)}</td>
                  <td>{meeting.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Meeting;

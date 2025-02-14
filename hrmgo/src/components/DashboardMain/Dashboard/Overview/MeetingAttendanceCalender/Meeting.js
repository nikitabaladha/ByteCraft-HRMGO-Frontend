import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getAPI("/meeting-getall", {}, true);
        setMeetings(response.data.meetings);
      } catch (err) {
        console.log("Failed to fetch Meetings");
      }
    };

    fetchMeetings();
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
                  <td>
                    {new Date(meeting.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    {new Date("1970-01-01T" + meeting.time)
                      .toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toUpperCase()}
                  </td>
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

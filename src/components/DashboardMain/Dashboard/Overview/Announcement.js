import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await getAPI(`/announcement-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAnnouncements(response.data.data);
          console.log("Announcements fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Announcements:", err);
      }
    };

    fetchAnnouncement();
  }, []);

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <h5>Announcement List</h5>
          </div>
          <div className="card-body" style={{ height: 270, overflow: "auto" }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody className="list">
                  {announcements.map((announcement, index) => (
                    <tr key={index}>
                      <td>{announcement.title}</td>

                      <td>{formatDate(announcement.startDate)}</td>

                      <td>{formatDate(announcement.endDate)}</td>

                      <td>{announcement.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;

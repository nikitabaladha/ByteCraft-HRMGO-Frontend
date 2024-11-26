import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";

const Attendance = () => {
  const [absentEmployees, setAbsentEmployees] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await getAPI(`/attendance-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAbsentEmployees(response.data.data);
          console.log("Attendance fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };

    fetchAttendance();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header card-body table-border-style">
          <h5>Today's Not Clock In</h5>
        </div>
        <div className="card-body" style={{ height: 324, overflow: "auto" }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="list">
                {absentEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>
                      <span className="absent-btn">{employee.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;

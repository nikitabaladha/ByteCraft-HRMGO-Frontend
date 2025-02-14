import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI";
import { formatDate } from "../../../../../js/custom";

const Attendance = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await getAPI(`/holiday`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setHolidays(response.data.data);
          // setOriginalHolidays(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Holiday Data:", err);
      }
    };

    fetchHolidayData();
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header card-body table-border-style">
          <h5>Holiday List</h5>
        </div>
        <div className="card-body" style={{ height: 324, overflow: "auto" }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Occasion</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody className="list">
                {holidays.map((holiday, index) => (
                  <tr key={index}>
                    <td>{holiday.occasion}</td>
                    <td>{formatDate(holiday.startDate)}</td>
                    <td>{formatDate(holiday.endDate)}</td>
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

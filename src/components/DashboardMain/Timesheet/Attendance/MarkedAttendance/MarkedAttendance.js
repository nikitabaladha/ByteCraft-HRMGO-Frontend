import React, { useState } from "react";
import MarkedAttendanceHeader from "./MarkedAttendanceHeader";
import MarkedAttendanceTable from "./MarkedAttendanceTable";
import MarkedAttendanceSearchForm from "./MarkedAttendanceSearchForm";

const MarkedAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  const handleDataFetched = (data) => {
    setAttendanceData(data);
  };
  return (
    <>
      <MarkedAttendanceHeader />
      <div className="row">
        <MarkedAttendanceSearchForm onDataFetched={handleDataFetched} />
        <MarkedAttendanceTable attendanceData={attendanceData} />
      </div>
    </>
  );
};

export default MarkedAttendance;

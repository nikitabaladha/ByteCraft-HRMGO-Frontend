import React from "react";

import Meeting from "./Meeting";
import Attendance from "./Attendance";
// import Calender from "./Calender";

const MeetingClockCalender = () => {
  return (
    <>
      <div className="col-xxl-12">
        <div className="row">
          {/* Meeting and Attendance in one row */}
          <div className="col-md-6">
            <Meeting />
          </div>
          <div className="col-md-6">
            <Attendance />
          </div>
        </div>
      </div>
    </>
  );
};

export default MeetingClockCalender;

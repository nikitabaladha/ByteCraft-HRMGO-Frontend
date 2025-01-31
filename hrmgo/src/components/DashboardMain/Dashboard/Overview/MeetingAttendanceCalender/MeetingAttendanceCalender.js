import React from "react";

import Meeting from "./Meeting";
import Attendance from "./Attendance";
import Calender from "./Calender";

const MeetingClockCalender = () => {
  return (
    <>
      <div className="col-xxl-12">
        <div className="row">
          <div className="col-xl-5">
            {/* Meeting schedule */}
            <Meeting />

            {/* Today Not Clock In */}
            <Attendance />
          </div>

          {/* Calender */}
          <Calender />
        </div>
      </div>
    </>
  );
};

export default MeetingClockCalender;

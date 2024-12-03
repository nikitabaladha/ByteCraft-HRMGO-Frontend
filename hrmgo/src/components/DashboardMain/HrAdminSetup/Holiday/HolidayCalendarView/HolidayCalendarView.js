import React, { useState, useEffect } from "react";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayCalendarSearchForm from "./HolidayCalendarSearchForm";

import HolidayCalendar from "./HolidayCalendar";
import HolidayList from "./HolidayList";

const HolidayCalendarView = ({
  holidays,
  selectedHoliday,
  setSelectedHoliday,
}) => {
  return (
    <>
      <HolidayCalendarHeader />
      <HolidayCalendarSearchForm />
      <div className="row">
        <HolidayCalendar
          holidays={holidays}
          selectedHoliday={selectedHoliday}
          setSelectedHoliday={setSelectedHoliday}
        />
        <HolidayList holidays={holidays} />
      </div>
    </>
  );
};

export default HolidayCalendarView;

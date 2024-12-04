// import React, { useState, useEffect } from "react";
// import HolidayCalendarHeader from "./HolidayCalendarHeader";
// import HolidayCalendarSearchForm from "./HolidayCalendarSearchForm";

// import HolidayCalendar from "./HolidayCalendar";
// import HolidayList from "./HolidayList";

// const HolidayCalendarView = ({
//   holidays,
//   selectedHoliday,
//   setSelectedHoliday,
// }) => {
//   return (
//     <>
//       <HolidayCalendarHeader />
//       <HolidayCalendarSearchForm />
//       <div className="row">
//         <HolidayCalendar
//           holidays={holidays}
//           selectedHoliday={selectedHoliday}
//           setSelectedHoliday={setSelectedHoliday}
//         />
//         <HolidayList holidays={holidays} />
//       </div>
//     </>
//   );
// };

// export default HolidayCalendarView;

import React, { useState, useEffect } from "react";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayCalendarSearchForm from "./HolidayCalendarSearchForm";

import getAPI from "../../../../../api/getAPI";

import HolidayCalendar from "./HolidayCalendar";
import HolidayList from "./HolidayList";

const HolidayCalendarView = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

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
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Holiday Data:", err);
      }
    };

    fetchHolidayData();
  }, []);

  const handleSearchResults = (searchedHolidays) => {
    setHolidays(searchedHolidays);
  };
  return (
    <>
      <HolidayCalendarHeader />
      <HolidayCalendarSearchForm onSearchResults={handleSearchResults} />
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

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import HolidayHeader from "./HolidayHeader";
import HolidayTable from "./HolidayTable";
import HolidaySearchForm from "./HolidaySearchForm";
import HolidayCalendarView from "./HolidayCalendarView/HolidayCalendarView";
import getAPI from "../../../../api/getAPI";

const Holiday = () => {
  const location = useLocation();
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

  const isCalendarRoute =
    location.pathname === "/dashboard/hr-admin-setup/holiday/calendar";

  return (
    <>
      {isCalendarRoute ? (
        <HolidayCalendarView
          holidays={holidays}
          selectedHoliday={selectedHoliday}
          setSelectedHoliday={setSelectedHoliday}
        />
      ) : (
        <>
          <HolidayHeader />
          <HolidaySearchForm onSearchResults={handleSearchResults} />
          <HolidayTable
            holidays={holidays}
            selectedHoliday={selectedHoliday}
            setSelectedHoliday={setSelectedHoliday}
          />
        </>
      )}
    </>
  );
};

export default Holiday;

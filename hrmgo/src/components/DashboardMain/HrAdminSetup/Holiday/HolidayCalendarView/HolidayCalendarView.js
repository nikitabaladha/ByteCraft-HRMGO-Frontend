import React, { useState, useEffect } from "react";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayCalendarSearchForm from "./HolidayCalendarSearchForm";
import getAPI from "../../../../../api/getAPI";
import HolidayCalendar from "./HolidayCalendar";
import HolidayList from "./HolidayList";

const HolidayCalendarView = () => {
  const [allHolidays, setAllHolidays] = useState([]); // For Calendar
  const [filteredHolidays, setFilteredHolidays] = useState([]); // For List

  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const response = await getAPI(`/holiday`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          const holidays = response.data.data;
          setAllHolidays(holidays); // Set data for Calendar
          setFilteredHolidays(holidays); // Initialize List with all data
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
    setFilteredHolidays(searchedHolidays); // Only update list data
  };

  return (
    <>
      <HolidayCalendarHeader />
      <HolidayCalendarSearchForm onSearchResults={handleSearchResults} />
      <div className="row">
        <HolidayCalendar holidays={allHolidays} />
        <HolidayList holidays={filteredHolidays} />
      </div>
    </>
  );
};

export default HolidayCalendarView;

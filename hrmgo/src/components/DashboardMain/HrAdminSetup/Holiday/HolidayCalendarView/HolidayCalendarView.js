import React, { useState, useEffect } from "react";
import HolidayCalendarHeader from "./HolidayCalendarHeader";
import HolidayCalendarSearchForm from "./HolidayCalendarSearchForm";
import getAPI from "../../../../../api/getAPI";
import HolidayCalendar from "./HolidayCalendar";
import HolidayList from "./HolidayList";

const HolidayCalendarView = () => {
  const [allHolidays, setAllHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);

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
          setAllHolidays(holidays);
          setFilteredHolidays(holidays);
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
    setFilteredHolidays(searchedHolidays);
  };

  const updateHoliday = (newUpdatedHoliday) => {
    setAllHolidays((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === newUpdatedHoliday.id ? newUpdatedHoliday : holiday
      )
    );

    setFilteredHolidays((prevFilteredHolidays) =>
      prevFilteredHolidays.map((holiday) =>
        holiday.id === newUpdatedHoliday.id ? newUpdatedHoliday : holiday
      )
    );
  };

  const addHoliday = (newHoliday) => {
    setAllHolidays((prevHolidays) => [...prevHolidays, newHoliday]);
    setFilteredHolidays((prevFilteredHolidays) => [
      ...prevFilteredHolidays,
      newHoliday,
    ]);
  };

  return (
    <>
      <HolidayCalendarHeader holidays={allHolidays} addHoliday={addHoliday} />
      <HolidayCalendarSearchForm onSearchResults={handleSearchResults} />
      <div className="row">
        <HolidayCalendar holidays={allHolidays} updateHoliday={updateHoliday} />
        <HolidayList holidays={filteredHolidays} />
      </div>
    </>
  );
};

export default HolidayCalendarView;

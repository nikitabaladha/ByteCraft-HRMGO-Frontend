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

  const [originalHolidays, setOriginalHolidays] = useState([]);

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
          setOriginalHolidays(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Holiday Data:", err);
      }
    };

    fetchHolidayData();
  }, []);

  const addHoliday = (newHoliday) => {
    setHolidays((prevHolidays) => [...prevHolidays, newHoliday]);
  };

  const updateHoliday = (newUpdatedHoliday) => {
    setHolidays((prevHolidays) =>
      prevHolidays.map((holiday) =>
        holiday.id === newUpdatedHoliday.id ? newUpdatedHoliday : holiday
      )
    );
  };

  const handleSearchResults = (searchedHolidays) => {
    setHolidays(searchedHolidays);
  };
  const resetSearch = () => {
    setHolidays(originalHolidays);
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
          <HolidayHeader holidays={holidays} addHoliday={addHoliday} />
          <HolidaySearchForm
            onSearchResults={handleSearchResults}
            resetSearch={resetSearch}
          />
          <HolidayTable
            holidays={holidays}
            setHolidays={setHolidays}
            selectedHoliday={selectedHoliday}
            setSelectedHoliday={setSelectedHoliday}
            updateHoliday={updateHoliday}
          />
        </>
      )}
    </>
  );
};

export default Holiday;

import React, { useState, useEffect } from "react";
import HolidayHeader from "./HolidayHeader";
import HolidayTable from "./HolidayTable";
import HolidaySearchForm from "./HolidaySearchForm";
import getAPI from "../../../../api/getAPI";

const Holiday = () => {
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

  // Handle search data update
  const handleSearchResults = (searchedHolidays) => {
    setHolidays(searchedHolidays);
  };

  return (
    <>
      <HolidayHeader />
      <HolidaySearchForm onSearchResults={handleSearchResults} />
      <HolidayTable
        holidays={holidays} // Pass the fetched holidays to the table
        selectedHoliday={selectedHoliday}
        setSelectedHoliday={setSelectedHoliday} // Pass the function to update selected holiday
      />
    </>
  );
};

export default Holiday;

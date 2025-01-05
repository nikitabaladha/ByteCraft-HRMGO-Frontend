import React from "react";
import WarningHeader from "./WarningHeader";
import WarningTable from "./WarningTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Warning = () => {
  const [warnings, setWarnings] = useState([]);
  const [selectedWarning, setSelectedWarning] = useState(null);

  useEffect(() => {
    const fetchWarningData = async () => {
      try {
        const response = await getAPI(`/warning`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setWarnings(response.data.data);
          console.log("Warning Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Warning Data:", err);
      }
    };

    fetchWarningData();
  }, []);

  const addWarning = (newWarning) => {
    setWarnings((prevWarnings) => [...prevWarnings, newWarning]);
  };

  const updateWarning = (newUpdatedWarning) => {
    setWarnings((prevWarnings) =>
      prevWarnings.map((warning) =>
        warning.id === newUpdatedWarning.id ? newUpdatedWarning : warning
      )
    );
  };

  return (
    <>
      <WarningHeader addWarning={addWarning} />

      <WarningTable
        warnings={warnings}
        setWarnings={setWarnings}
        selectedWarning={selectedWarning}
        setSelectedWarning={setSelectedWarning}
        updateWarning={updateWarning}
      />
    </>
  );
};

export default Warning;

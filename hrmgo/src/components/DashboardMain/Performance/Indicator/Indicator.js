import React, { useEffect, useState } from "react";
import IndicatorHeader from "./IndicatorHeader";
import IndicatorTable from "./IndicatorTable";
import getAPI from "../../../../api/getAPI";

const Indicator = () => {
  const [indicators, setIndicators] = React.useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  const fetchIndicators = async () => {
    try {
      const response = await getAPI("/indicator", {}, true);

      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setIndicators(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Indicator Data:", err);
    }
  };

  useEffect(() => {
    fetchIndicators();
  }, []);

  const addIndicator = (newIndicator) => {
    setIndicators((prevIndicators) => [...prevIndicators, newIndicator]);
  };

  const updateIndicator = (newUpdatedIndicator) => {
    setIndicators((prevIndicators) =>
      prevIndicators.map((indicator) =>
        indicator.id === newUpdatedIndicator.id
          ? newUpdatedIndicator
          : indicator
      )
    );
  };

  return (
    <>
      <IndicatorHeader addIndicator={addIndicator} />

      <IndicatorTable
        indicators={indicators}
        setIndicators={setIndicators}
        selectedIndicator={selectedIndicator}
        setSelectedIndicator={setSelectedIndicator}
        updateIndicator={updateIndicator}
      />
    </>
  );
};

export default Indicator;

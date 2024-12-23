import React from "react";
import AwardHeader from "./AwardHeader";
import AwardTable from "./AwardTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Award = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        const response = await getAPI(`/award`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAwards(response.data.data);
          console.log("Award Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Award Data:", err);
      }
    };

    fetchAwardData();
  }, []);

  return (
    <>
      <AwardHeader />

      <AwardTable
        awards={awards}
        setAwards={setAwards}
        selectedAward={selectedAward}
        setSelectedAward={setSelectedAward}
      />
    </>
  );
};

export default Award;

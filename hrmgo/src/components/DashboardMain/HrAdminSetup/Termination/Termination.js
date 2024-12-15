import React from "react";
import TerminationHeader from "./TerminationHeader";
import TerminationTable from "./TerminationTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Termination = () => {
  const [terminations, setTerminations] = useState([]);
  const [selectedTermination, setSelectedTermination] = useState(null);

  useEffect(() => {
    const fetchTerminationData = async () => {
      try {
        const response = await getAPI(`/termination`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setTerminations(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Termination Data:", err);
      }
    };

    fetchTerminationData();
  }, []);
  return (
    <>
      <TerminationHeader />

      <TerminationTable
        terminations={terminations}
        setTerminations={setTerminations}
        selectedTermination={selectedTermination}
        setSelectedTermination={setSelectedTermination}
      />
    </>
  );
};

export default Termination;

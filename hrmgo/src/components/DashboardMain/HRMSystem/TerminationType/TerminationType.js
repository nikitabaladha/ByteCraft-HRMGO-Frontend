import React from "react";
import TerminationTypeHeader from "./TerminationTypeHeader";
import TerminationTypeTable from "./TerminationTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [terminationTypes, setTerminationTypes] = useState([]);

      const fetchTerminationTypes = async () => {
        try {
          const response = await getAPI("/termination-type-get-all", true);
          if (!response.hasError) {
            setTerminationTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch termination types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching termination types.");
        }
      };

      useEffect(() => {
  
      fetchTerminationTypes();
    }, []);
  return (
    <>
      <TerminationTypeHeader fetchTerminationTypes={fetchTerminationTypes} />
      <TerminationTypeTable terminationTypes={terminationTypes} setTerminationTypes={setTerminationTypes} fetchTerminationTypes={fetchTerminationTypes}/>
    </>
  );
};

export default HRMSystem;

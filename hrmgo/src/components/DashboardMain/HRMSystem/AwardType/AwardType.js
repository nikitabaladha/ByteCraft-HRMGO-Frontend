import React from "react";
import AwardTypeHeader from "./AwardTypeHeader";
import AwardTypeTable from "./AwardTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [awardTypes, setAwardTypes] = useState([]);

  
      const fetchAwardTypes = async () => {
        try {
          const response = await getAPI("/award-type-get-all", true);
          if (!response.hasError) {
            setAwardTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch award types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching award types.");
        }
      };

      useEffect(() => {
  
      fetchAwardTypes();
    }, []);
  return (
    <>
      <AwardTypeHeader fetchAwardTypes={fetchAwardTypes}/>
      <AwardTypeTable awardTypes={awardTypes} setAwardTypes={setAwardTypes} fetchAwardTypes={fetchAwardTypes}  />
    </>
  );
};

export default HRMSystem;

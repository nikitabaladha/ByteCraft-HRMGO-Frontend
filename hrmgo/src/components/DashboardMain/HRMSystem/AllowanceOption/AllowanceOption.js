import React from "react";
import AllowanceOptionHeader from "./AllowanceOptionHeader";
import AllowanceOptionTable from "./AllowanceOptionTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [allowanceOptions, setAllowanceOptions] = useState([]);

      const fetchAllowanceOptions = async () => {
        try {
          const response = await getAPI("/allowance-option-get-all", true);
          if (!response.hasError) {
            setAllowanceOptions(response.data.data);
          } else {
            toast.error(`Failed to fetch allowance options: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching allowance options.");
        }
      };

      useEffect(() => {
  
      fetchAllowanceOptions();
    }, []);
  return (
    <>
      <AllowanceOptionHeader fetchAllowanceOptions={fetchAllowanceOptions}/>
      <AllowanceOptionTable allowanceOptions={allowanceOptions} setAllowanceOptions={setAllowanceOptions} fetchAllowanceOptions={fetchAllowanceOptions}/>
    </>
  );
};

export default HRMSystem;

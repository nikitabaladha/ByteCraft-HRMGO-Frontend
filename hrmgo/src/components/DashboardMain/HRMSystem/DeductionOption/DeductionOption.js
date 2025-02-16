import React from "react";
import DeductionOptionHeader from "./DeductionOptionHeader";
import DeductionOptionTable from "./DeductionOptionTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [deductionOptions, setDeductionOptions] = useState([]);

      const fetchDeductionOptions = async () => {
        try {
          const response = await getAPI("/deduction-option-get-all", true);
          if (!response.hasError) {
            setDeductionOptions(response.data.data);
          } else {
            toast.error(`Failed to fetch deduction options: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching deduction options.");
        }
      };

      useEffect(() => {
  
      fetchDeductionOptions();
    }, []);
  return (
    <>
      <DeductionOptionHeader fetchDeductionOptions={fetchDeductionOptions} />
      <DeductionOptionTable deductionOptions={deductionOptions} setDeductionOptions={setDeductionOptions} fetchDeductionOptions={fetchDeductionOptions}/>
    </>
  );
};

export default HRMSystem;

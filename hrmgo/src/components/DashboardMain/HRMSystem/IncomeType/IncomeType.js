import React from "react";
import IncomeTypeHeader from "./IncomeTypeHeader";
import IncomeTypeTable from "./IncomeTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [incomeTypes, setIncomeTypes] = useState([]);

      const fetchIncomeTypes = async () => {
        try {
          const response = await getAPI("/income-type-get-all", true);
          if (!response.hasError) {
            setIncomeTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch income types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching income types.");
        }
      };
  
      useEffect(() => {

      fetchIncomeTypes();
    }, []);

  return (
    <>
      <IncomeTypeHeader fetchIncomeTypes={fetchIncomeTypes}/>
      <IncomeTypeTable incomeTypes={incomeTypes} setIncomeTypes={setIncomeTypes} fetchIncomeTypes={fetchIncomeTypes}/>
    </>
  );
};

export default HRMSystem;

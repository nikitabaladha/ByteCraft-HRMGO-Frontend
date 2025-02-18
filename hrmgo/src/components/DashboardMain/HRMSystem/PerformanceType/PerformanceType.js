import React from "react";
import PerformanceTypeHeader from "./PerformanceTypeHeader";
import PerformanceTypeTable from "./PerformanceTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
   const [performanceTypes, setPerformanceTypes] = useState([]);

       const fetchPerformanceTypes = async () => {
         try {
           const response = await getAPI("/performance-type-get-all", true);
           if (!response.hasError) {
             setPerformanceTypes(response.data.data);
           } else {
             toast.error(`Failed to fetch performance types: ${response.message}`);
           }
         } catch (error) {
           toast.error("An error occurred while fetching performance types.");
         }
       };
       useEffect(() => {
       fetchPerformanceTypes();
     }, []);
  return (
    <>
      <PerformanceTypeHeader fetchPerformanceTypes={fetchPerformanceTypes}/>
      <PerformanceTypeTable performanceTypes={performanceTypes} setPerformanceTypes={setPerformanceTypes} fetchPerformanceTypes={fetchPerformanceTypes} />
    </>
  );
};

export default HRMSystem;

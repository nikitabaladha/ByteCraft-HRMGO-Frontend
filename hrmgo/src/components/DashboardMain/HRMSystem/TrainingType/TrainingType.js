import React from "react";
import TrainingTypeHeader from "./TrainingTypeHeader";
import TrainingTypeTable from "./TrainingTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [trainingTypes, setTrainingTypes] = useState([]);

   
      const fetchTrainingTypes = async () => {
        try {
          const response = await getAPI("/training-type-get-all", true);
          if (!response.hasError) {
            setTrainingTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch training types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching training types.");
        }
      };
  
      useEffect(() => {
      fetchTrainingTypes();
    }, []);

  return (
    <>
      <TrainingTypeHeader fetchTrainingTypes={fetchTrainingTypes} />
      <TrainingTypeTable trainingTypes={trainingTypes} setTrainingTypes={setTrainingTypes} fetchTrainingTypes={fetchTrainingTypes} />
    </>
  );
};

export default HRMSystem;

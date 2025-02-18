import React from "react";
import JobStageHeader from "./JobStageHeader";
import JobStageTable from "./JobStageTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [jobStages, setJobStages] = useState([]);

  
      const fetchJobStages = async () => {
        try {
          const response = await getAPI("/job-stage-get-all", true);
          if (!response.hasError) {
            setJobStages(response.data.data);
          } else {
            toast.error(`Failed to fetch job stages: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching job stages.");
        }
      };

      useEffect(() => {
      fetchJobStages();
    }, []);
  return (
    <>
      <JobStageHeader fetchJobStages={fetchJobStages}/>
      <JobStageTable jobStages={jobStages} setJobStages={setJobStages} fetchJobStages={fetchJobStages}/>
    </>
  );
};

export default HRMSystem;

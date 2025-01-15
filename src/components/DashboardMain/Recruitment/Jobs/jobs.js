import React from 'react'
import JobHeader from './JobHeader'
import JobTable from './JobTable'
import { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI";

const RecruitmentJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await getAPI(`/get-all-job`, {}, true);
      setJobs(response.data.data);
    } catch (error) {
      console.error("Failed to fetch jobs.", error);
    }
  };
  useEffect(() => {   
  fetchJobs();
}, []);

  return (
    <div>
      <JobHeader fetchJobs={fetchJobs}/>
      <JobTable jobs={jobs} setJobs={setJobs} fetchJobs={fetchJobs}/>
    </div>
  )
}

export default RecruitmentJobs

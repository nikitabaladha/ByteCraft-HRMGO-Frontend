import React from 'react'
import JobApplicationHeader from './JobApplicationHeader'
import JobApplicationMainContent from './JobApplicationMainContent'
import { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";

const JobApplication = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await getAPI(`/get-all-job-application`, {}, true);
      setApplications(response.data.data);
    } catch (error) {
      console.error("Failed to fetch applications.", error);
    }
  };
  useEffect(() => {   
  fetchApplications();
}, []);

  return (
    <div>
      <JobApplicationHeader fetchApplications={fetchApplications}/>
      <JobApplicationMainContent applications={applications} setApplications={setApplications} fetchApplications={fetchApplications}/>
    </div>
  )
}

export default JobApplication

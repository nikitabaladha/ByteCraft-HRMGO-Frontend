import React from "react";
import JobCategoryHeader from "./JobCategoryHeader"; 
import JobCategoryTable from "./JobCategoryTable"; 
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [jobCategories, setJobCategories] = useState([]);


      const fetchJobCategories = async () => {
        try {
          const response = await getAPI("/job-category-get-all", true);
          if (!response.hasError) {
            setJobCategories(response.data.data);
          } else {
            toast.error(`Failed to fetch job categories: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching job categories.");
        }
      };
  
      useEffect(() => {
      fetchJobCategories();
    }, []);
  return (
    <>
      <JobCategoryHeader fetchJobCategories={fetchJobCategories}/> 
      <JobCategoryTable jobCategories={jobCategories} setJobCategories={jobCategories} fetchJobCategories={fetchJobCategories} />
    </>
  );
};

export default HRMSystem;

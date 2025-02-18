import React from "react";
import DepartmentHeader from "./DepartmentHeader";
import DepartmentTable from "./DepartmentTable";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [departments, setDepartments] = useState([]);

 
    const fetchDepartments = async () => {
      try {
        const response = await getAPI("/department-get-all", true);
        if (!response.hasError) {
          setDepartments(response.data.data);
        } else {
          toast.error(`Failed to fetch departments: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching departments.");
      }
    };

    useEffect(() => {

    fetchDepartments();
  }, []);
  return (
    <>
      <DepartmentHeader departments={departments} fetchDepartments={fetchDepartments} />
      <DepartmentTable departments={departments} setDepartments={setDepartments} fetchDepartments={fetchDepartments}/>
    </>
  );
};

export default HRMSystem;

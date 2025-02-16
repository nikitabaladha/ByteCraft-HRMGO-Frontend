import React from "react";
import DesignationHeader from "./DesignationHeader";
import DesignationTable from "./DesignationTable";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const HRMSystem = () => {
const [designations, setDesignations] = useState([]);

    const fetchDesignations = async () => {
      try {
        const response = await getAPI("/designation-get-all", true);
        if (!response.hasError) {
          setDesignations(response.data.data);
        } else {
          toast.error(`Failed to fetch designations: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching designations.");
      }
    };
useEffect(() => {
    fetchDesignations();
  }, []);
  return (
    <>
      <DesignationHeader fetchDesignations={fetchDesignations} />
      <DesignationTable designations={designations} setDesignations={setDesignations} fetchDesignations={fetchDesignations} />
    </>
  );
};

export default HRMSystem;
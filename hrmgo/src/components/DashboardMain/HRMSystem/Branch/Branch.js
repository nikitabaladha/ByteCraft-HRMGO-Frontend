
import React from "react";
import BranchHeader from "./BranchHeader";
import BranchTable from "./BranchTable";
import { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const HRMSystem = () => {
  const [branches, setBranches] = useState([]);

  
    const fetchBranches = async () => {
      try {
        const response = await getAPI("/branch-get-all", true);
        if (!response.hasError) {
          setBranches(response.data.data);
        } else {
          toast.error(`Failed to fetch branches: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching branches.");
      }
    };
    useEffect(() => {

    fetchBranches();
  }, []);
  return (
    <>
      <BranchHeader branches={branches} fetchBranches={fetchBranches}/>
      <BranchTable branches={branches} setBranches={setBranches} fetchBranches={fetchBranches}/>
    </>
  );
};

export default HRMSystem;

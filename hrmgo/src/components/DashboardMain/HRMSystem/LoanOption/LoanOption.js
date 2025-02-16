import React from "react";
import LoanOptionHeader from "./LoanOptionHeader";
import LoanOptionTable from "./LoanOptionTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [loanOptions, setLoanOptions] = useState([]);

    const fetchLoanOptions = async () => {
      try {
        const response = await getAPI("/loan-option-get-all", true);
        if (!response.hasError) {
          setLoanOptions(response.data.data);
        } else {
          toast.error(`Failed to fetch loan options: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching loan options.");
      }
    };

     useEffect(() => {
    fetchLoanOptions();
  }, []);
  return (
    <>
      <LoanOptionHeader fetchLoanOptions={fetchLoanOptions}/>
      <LoanOptionTable loanOptions={loanOptions} setLoanOptions={setLoanOptions} fetchLoanOptions={fetchLoanOptions} />
    </>
  );
};

export default HRMSystem;

import React from "react";
import PayslipHeader from "./PayslipTypeHeader"; 
import PayslipTypeTable from "./PayslipTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [payslipTypes, setPayslipTypes] = useState([]);

  
      const fetchPayslipTypes = async () => {
        try {
          const response = await getAPI("/payslip-type-get-all", true);
          if (!response.hasError) {
            setPayslipTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch payslip types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching payslip types.");
        }
      };

      useEffect(() => {
  
      fetchPayslipTypes();
    }, []);
  return (
    <>
      <PayslipHeader fetchPayslipTypes={fetchPayslipTypes}/>
      <PayslipTypeTable payslipTypes={payslipTypes} setPayslipTypes={setPayslipTypes} fetchPayslipTypes={fetchPayslipTypes}/>
    </>
  );
};

export default HRMSystem;

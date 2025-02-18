import React from "react";
import DepositHeader from "./DepositHeader";
import DepositTable from "./DepositeTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Payees = () => {
  const [deposits, setDeposits] = useState([]);

  
      const fetchDeposits = async () => {
        try {
          const response = await getAPI("/getall_deposit", {}, true);
          setDeposits(response.data.data);
  
        } catch (err) {
          console.log("Failed to fetch deposits");
  
        }
      };
  
      useEffect(() => {
      fetchDeposits();
    }, []);
  return (
    <>
      <DepositHeader fetchDeposits={fetchDeposits}/>
      <DepositTable deposits={deposits} setDeposits={setDeposits} fetchDeposits={fetchDeposits}/>
 
    </>
  );
};

export default Payees;
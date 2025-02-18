import React from "react";
import TransferBalanceHeader from "./TransferBalanceHeader";
import TransferBalanceTable from "./TransferBalanceTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const TransferBalance = () => {
  const [transferBalances, setTransferBalances] = useState([]);

      const fetchTransferBalances = async () => {
        try {
          const response = await getAPI("/getall_transferbalance", {}, true);
          setTransferBalances(response.data.data);
          ;
        } catch (err) {
          console.log("Failed to fetch transfer balances");
  
        }
      };
  
      useEffect(() => {
      fetchTransferBalances();
    }, []);
  return (
    <>
      <TransferBalanceHeader fetchTransferBalances={fetchTransferBalances} />
      <TransferBalanceTable transferBalances={transferBalances} setTransferBalances={setTransferBalances} fetchTransferBalances={fetchTransferBalances} />
    </>
  );
};

export default TransferBalance;

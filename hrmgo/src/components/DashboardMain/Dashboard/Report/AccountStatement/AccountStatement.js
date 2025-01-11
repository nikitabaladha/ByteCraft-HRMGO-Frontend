import React, { useState, useEffect } from "react";
import AccountStatementHeader from "./AccountStatementHeader";
import AccountStatementSearchForm from "./AccountStatementSearchForm";
import AccountStatementReport from "./AccountStatementReport";
import AccountStatementTable from "./AccountStatementTable";
import { toast } from "react-toastify";
import getAPI from "../../../../../api/getAPI";

const AccountStatement = () => {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [accountName, setAccountName] = useState("");
  const [type, setType] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleSearch = async (start, end, account, type) => {
    setStartMonth(start);
    setEndMonth(end);
    setAccountName(account);
    setType(type);
    fetchTransactions(start, end, account, type);
  };

  const fetchTransactions = async (startMonth, endMonth, account, type) => {
    console.log("Fetching transactions with parameters:", { startMonth, endMonth, account, type });
  
    let query = "";
    if (startMonth) query += `start_month=${startMonth}&`;
    if (endMonth) query += `end_month=${endMonth}&`;
    if (account) query += `account=${account}&`;
    if (type) query += `type=${type}&`;
  
    query = query.slice(0, -1); // Remove the last "&" if present
  
    try {
      const response = await getAPI(`/getaccount-by-date?${query}`, {}, true, true);
  
      if (!response.hasError && Array.isArray(response.data.data)) {
        setTransactions(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
        toast.error("Error fetching transaction data");
      }
    } catch (err) {
      console.error("Error fetching transaction data:", err);
      toast.error("Error fetching transaction data");
    }
  };

  useEffect(() => {

    fetchTransactions("", "", "", "income");
  }, []);

  const handleReset = () => {
    setStartMonth("");
    setEndMonth("");
    setAccountName("");
    setType("income"); 
    fetchTransactions("", "", "", "income")
  };

  return (
    <>
      <AccountStatementHeader transactions={transactions} />
      <div className="row">
        <AccountStatementSearchForm
          onSearch={handleSearch}
          startMonth={startMonth}
          endMonth={endMonth}
          accountName={accountName}
          type={type}
          onReset={handleReset} 
          
        />
        <AccountStatementReport   
          transactions={transactions}
          startMonth={startMonth}
          endMonth={endMonth}
          type={type}/>
        <AccountStatementTable transactions={transactions} />
      </div>
    </>
  );
};

export default AccountStatement;

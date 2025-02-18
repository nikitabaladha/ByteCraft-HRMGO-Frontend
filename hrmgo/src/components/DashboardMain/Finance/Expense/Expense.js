import React from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseTable from "./ExpenseTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react"

const Expense = () => {
   const [expenses, setExpenses] = useState([]);
   
       const fetchExpenses = async () => {
         try {
           const response = await getAPI("/getall_expense", {}, true);
           setExpenses(response.data.data);
   
         } catch (err) {
           console.log("Failed to fetch expenses");
   
         }
       };

       useEffect(() => {
   
       fetchExpenses();
     }, []);
  return (
    <>
      <ExpenseHeader fetchExpenses={fetchExpenses} />
      <ExpenseTable expenses={expenses}  setExpenses={setExpenses} fetchExpenses={fetchExpenses}/>
 
    </>
  );
};

export default Expense;
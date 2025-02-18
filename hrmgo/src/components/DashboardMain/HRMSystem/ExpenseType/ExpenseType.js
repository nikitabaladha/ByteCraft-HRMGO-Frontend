import React from "react";
import ExpenseTypeHeader from "./ExpenseTypeHeader";
import ExpenseTypeTable from "./ExpenseTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [expenseTypes, setExpenseTypes] = useState([]);

      const fetchExpenseTypes = async () => {
        try {
          const response = await getAPI("/expense-type-get-all", true);
          if (!response.hasError) {
            setExpenseTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch expense types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching expense types.");
        }
      };
  
      useEffect(() => {
      fetchExpenseTypes();
    }, []);
  return (
    <>
      <ExpenseTypeHeader fetchExpenseTypes={fetchExpenseTypes}/>
      <ExpenseTypeTable expenseTypes={expenseTypes} setExpenseTypes={setExpenseTypes} fetchExpenseTypes={fetchExpenseTypes}/>
    </>
  );
};

export default HRMSystem;

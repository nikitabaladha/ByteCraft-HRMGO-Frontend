//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpense.js

import React, { useState } from "react";
import getAPI from "../../../../../api/getAPI.js";

import IncomeVsExpenseHeader from "./IncomVsExpenseHeader";
import IncomeVsExpenseSearchForm from "./IncomeVsExpenseSearchForm";
import IncomeVsExpenseReport from "./IncomeVsExpenseReport";
import IncomeVsExpenseChart from "./IncomeVsExpenseChart";

const IncomeVsExpense = () => {
  // State to hold the data fetched from the API
  const [data, setData] = useState([]);

  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const handleSearch = async (startMonth, endMonth) => {
    if (!startMonth || !endMonth) {
      alert("Please select both start and end months.");
      return;
    }

    setStartMonth(startMonth);
    setEndMonth(endMonth);

    try {
      const response = await getAPI(
        "/income-expense-chart-get-all",
        {
          params: { start_month: startMonth, end_month: endMonth },
        },
        true,
        true
      );

      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* first row */}
      <IncomeVsExpenseHeader />

      {/* Second row */}
      <div className="row">
        {" "}
        <IncomeVsExpenseSearchForm onSearch={handleSearch} />
        {/* Third row  */}
        <div id="printableArea">
          <IncomeVsExpenseReport
            data={data}
            startMonth={startMonth}
            endMonth={endMonth}
          />

          {/* Fourth row */}
          <IncomeVsExpenseChart data={data} />
        </div>
      </div>
    </>
  );
};

export default IncomeVsExpense;

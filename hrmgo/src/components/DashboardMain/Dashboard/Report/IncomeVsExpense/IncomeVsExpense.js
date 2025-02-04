import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI.js";

import IncomeVsExpenseHeader from "./IncomVsExpenseHeader";
import IncomeVsExpenseSearchForm from "./IncomeVsExpenseSearchForm";
import IncomeVsExpenseReport from "./IncomeVsExpenseReport";
import IncomeVsExpenseChart from "./IncomeVsExpenseChart";

const IncomeVsExpense = () => {
  const [data, setData] = useState([]);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);

  const fetchData = async (startMonth, endMonth) => {
    try {
      const params = {};
      if (startMonth && endMonth) {
        params.start_month = startMonth;
        params.end_month = endMonth;
      }

      const response = await getAPI(
        "/income-expense-chart-get-all",
        { params },
        true,
        true
      );

      const responseData = response.data.data;
      setData(responseData);
      if (responseData.length) {
        const firstMonth = responseData[0].categories;
        const lastMonth = responseData[responseData.length - 1].categories;

        setStartMonth(firstMonth);
        setEndMonth(lastMonth);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (startMonth, endMonth) => {
    if (!startMonth || !endMonth) {
      alert("Please select both start and end months.");
      return;
    }
    setStartMonth(startMonth);
    setEndMonth(endMonth);
    fetchData(startMonth, endMonth);
  };

  return (
    <>
      {/* First row */}
      <IncomeVsExpenseHeader
        data={data}
        startMonth={startMonth}
        endMonth={endMonth}
      />

      {/* Second row */}
      <div className="row">
        <IncomeVsExpenseSearchForm onSearch={handleSearch} />

        {/* Third row */}
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

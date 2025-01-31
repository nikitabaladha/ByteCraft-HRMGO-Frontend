// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\IncomeVsExpense\IncomeVsExpenseChart.js

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const IncomeVsExpenseChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    categories: [],
    incomeData: [],
    expenseData: [],
  });

  useEffect(() => {
    if (data && data.length) {
      const categories = data.map((item) => {
        const date = new Date(item.categories);
        return date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
      });

      const incomeData = data.map((item) => item.incomeData);
      const expenseData = data.map((item) => item.expenseData);

      setChartData({ categories, incomeData, expenseData });
    }
  }, [data]);

  const options = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "30%",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData.categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -10,
      offsetX: -5,
      markers: {
        width: 12,
        height: 12,
        radius: 2,
        offsetX: -2,
      },
      itemMargin: { horizontal: 5, vertical: 10 },
    },
    tooltip: { shared: true, intersect: false },
    fill: { opacity: 1 },
    colors: ["#3EC9D6", "#FF3A6E"],
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
    yaxis: {
      min: 0,
      max:
        Math.max(
          ...(chartData.incomeData.length ? chartData.incomeData : [0]),
          ...(chartData.expenseData.length ? chartData.expenseData : [0])
        ) + 20, // Dynamic max value
      tickAmount: 4,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
  };

  const series = [
    { name: "Income", data: chartData.incomeData },
    { name: "Expense", data: chartData.expenseData },
  ];

  return (
    <div className="col-md-12">
      <div className="card">
        <div className="rounded p-3">
          <div id="user-chart" style={{ minHeight: "300px" }}>
            <Chart options={options} series={series} type="bar" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenseChart;

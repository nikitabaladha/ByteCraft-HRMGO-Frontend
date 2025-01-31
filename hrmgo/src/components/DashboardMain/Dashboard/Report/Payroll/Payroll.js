import React, { useEffect, useState, useCallback } from "react";
import PayrollHeader from "./PayrollHeader";
import PayrollTable from "./PayrollTable.js";
import PayrollReport from "./PayrollReport.js";
import PayrollSearchForm from "./PayrollSearchForm";
import getAPI from "../../../../../api/getAPI.js";
import { toast } from "react-toastify";

const Payroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); 
  const [searchType, setSearchType] = useState("monthly");

  const fetchCurrentMonthData = useCallback(async () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    setSelectedMonth(monthFormatted);

    try {
      const response = await getAPI(
        `/payroll-get-all?branch=${selectedBranch}&department=${selectedDepartment}&date=${monthFormatted}&type=monthly`,
        {},
        true,
        true
      );

      if (!response.hasError && Array.isArray(response.data.data)) {
        setPayrollData(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching payroll data:", err);
      toast.error("Error fetching current month's payroll data");
    }
  }, [selectedBranch, selectedDepartment]);

  useEffect(() => {
    fetchCurrentMonthData();
  }, [fetchCurrentMonthData]);

  const handleReset = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    const formattedDate = currentDate.toISOString().split("T")[0];

    setSelectedBranch("");
    setSelectedDepartment("");
    setSearchType("monthly");
    setSelectedMonth(monthFormatted);
    setSelectedDate(formattedDate); 
    fetchCurrentMonthData();
  };

  return (
    <>
      <PayrollHeader payrollData={payrollData}/>
      <div className="row">
        <PayrollSearchForm
          onDataFetched={(data) => setPayrollData(data)}
          onReset={handleReset}
          selectedBranch={selectedBranch}
          selectedDepartment={selectedDepartment}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          searchType={searchType}
          setSelectedBranch={setSelectedBranch}
          setSelectedDepartment={setSelectedDepartment}
          setSearchType={setSearchType}
          setSelectedMonth={setSelectedMonth}
          setSelectedDate={setSelectedDate} 
        />
        <PayrollReport
          payrollData={payrollData}
          branch={selectedBranch}
          department={selectedDepartment}
          searchType={searchType}
          month={selectedMonth}
          selectedDate={selectedDate} 
        />
        <PayrollTable payrollData={payrollData} />
      </div>
    </>
  );
};

export default Payroll;

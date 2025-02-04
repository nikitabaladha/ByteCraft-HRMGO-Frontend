// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\Leave\Leave.js

import React, { useEffect, useState } from "react";
import LeaveHeader from "./LeaveHeader";
import LeaveTable from "./LeaveTable";
import LeaveSearchForm from "./LeaveSearchForm";
import LeaveReport from "./LeaveReport";
import getAPI from "../../../../../api/getAPI";

const Leave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [selectedLeaveData, setSelectedLeaveData] = useState(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchType, setSearchType] = useState("monthly");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const fetchCurrentMonthData = async () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    setSelectedMonth(monthFormatted);

    try {
      const response = await getAPI(
        `/manage-leave-get-all-by-query?branch=${selectedBranch}&department=${selectedDepartment}&date=${monthFormatted}&type=monthly`,
        {},
        true,
        true
      );

      if (!response.hasError && Array.isArray(response.data.data)) {
        setLeaveData(response.data.data);
        console.log("default", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching manage leave data:", err);
    }
  };

  useEffect(() => {
    fetchCurrentMonthData();
  }, [selectedBranch, selectedDepartment]);

  const handleReset = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    const formattedYear = currentDate.toISOString().split("T")[0];

    setSelectedBranch("");
    setSelectedDepartment("");
    setSearchType("monthly");
    setSelectedMonth(monthFormatted);
    setSelectedYear(formattedYear);
    fetchCurrentMonthData();
  };

  return (
    <>
      <LeaveHeader leaveData={leaveData} />
      <div className="row">
        <LeaveSearchForm
          onDataFetched={(data) => setLeaveData(data)}
          onReset={handleReset}
          selectedBranch={selectedBranch}
          selectedDepartment={selectedDepartment}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          searchType={searchType}
          setSelectedBranch={setSelectedBranch}
          setSelectedDepartment={setSelectedDepartment}
          setSearchType={setSearchType}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />
        <div id="printableArea">
          <LeaveReport
            leaveData={leaveData}
            branch={selectedBranch}
            department={selectedDepartment}
            searchType={searchType}
            month={selectedMonth}
            selectedYear={selectedYear}
          />
        </div>

        <LeaveTable
          leaveData={leaveData}
          setLeaveData={setLeaveData}
          selectedLeaveData={selectedLeaveData}
          setSelectedLeaveData={setSelectedLeaveData}
        />
      </div>
    </>
  );
};

export default Leave;

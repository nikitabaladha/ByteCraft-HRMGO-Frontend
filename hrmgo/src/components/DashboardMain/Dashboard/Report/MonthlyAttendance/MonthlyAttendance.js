import React, { useState, useEffect } from "react";
import MonthlyAttendanceHeader from "./MonthlyAttendanceHeader";
import MonthlyAttendanceSearchForm from "./MonthlyAttendanceSearchForm";
import AttendanceReport from "./AttendanceReport";
import AttendanceTable from "./AttendanceTable";
import getAPI from "../../../../../api/getAPI.js";

const MonthlyAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonthYear, setSelectedMonthYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // Set the default month to the current month
  useEffect(() => {
    const currentDate = new Date();
    const currentMonthYear = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setSelectedMonthYear(currentMonthYear);
    fetchAttendanceData(currentMonthYear, "", "", ""); // Fetch data for the current month
  }, []);

  const fetchAttendanceData = async (
    monthYear,
    branch,
    department,
    employees
  ) => {
    try {
      const queryParams = new URLSearchParams({
        branch: branch || "",
        department: department || "",
        month: monthYear || "",
      });

      if (Array.isArray(employees) && employees.length > 0) {
        employees.forEach((employeeId) => {
          queryParams.append("employee", employeeId);
        });
      } else if (employees) {
        queryParams.append("employee", employees);
      }

      const response = await getAPI(
        `/employee-get-filter-by-month?${queryParams.toString()}`,
        {},
        true,
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        const employeesData = response.data.data;
        setAttendanceData(employeesData);
      } else {
        console.error("Error fetching attendance data:", response);
      }
    } catch (err) {
      console.error("Error in fetchAttendanceData:", err);
    }
  };

  const handleDataFetched = (data, monthYear) => {
    setAttendanceData(data);
    setSelectedMonthYear(monthYear);
  };

  const handleSearch = async () => {
    await fetchAttendanceData(
      selectedMonthYear,
      selectedBranch,
      selectedDepartment,
      selectedEmployees
    );
  };

  const handleRefresh = async () => {
    const currentDate = new Date();
    const currentMonthYear = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setSelectedMonthYear(currentMonthYear);
    await fetchAttendanceData(currentMonthYear, "", "", "");
  };

  return (
    <>
      <MonthlyAttendanceHeader
        attendanceData={attendanceData}
        selectedMonthYear={selectedMonthYear}
      />
      <div className="row">
        <MonthlyAttendanceSearchForm
          onDataFetched={handleDataFetched}
          selectedMonthYear={selectedMonthYear}
          setSelectedMonthYear={setSelectedMonthYear}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
        />
        <AttendanceReport />
        <AttendanceTable
          attendanceData={attendanceData}
          selectedMonthYear={selectedMonthYear}
        />
      </div>
    </>
  );
};

export default MonthlyAttendance;

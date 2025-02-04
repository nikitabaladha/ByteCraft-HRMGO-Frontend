// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\Attendance\BulkAttendance\BulkAttendance.js
import React, { useState, useEffect } from "react";
import BulkAttendanceHeader from "./BulkAttendanceHeader";
import BulkAttendanceTable from "./BulkAttendanceTable";
import BulkAttendanceSearchForm from "./BulkAttendanceSearchForm";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const BulkAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const fetchCurrentDateData = async () => {
    try {
      const response = await getAPI(
        `/employee-get-filter?branchId=${selectedBranch}&departmentId=${selectedDepartment}&date=${selectedDate}`,
        {},
        true,
        true
      );
      if (!response.hasError && Array.isArray(response.data.data)) {
        setAttendanceData(response.data.data);
        console.log("Attendance Data", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      toast.error("Error fetching current month's attendance data");
    }
  };

  useEffect(() => {
    fetchCurrentDateData();
  }, []);

  const handleSearch = () => {
    fetchCurrentDateData();
  };

  const handleReset = () => {
    setSelectedBranch("");
    setSelectedDepartment("");
    setSelectedDate(new Date().toISOString().split("T")[0]);
    fetchCurrentDateData();
  };

  return (
    <>
      <BulkAttendanceHeader />
      <div className="row">
        <BulkAttendanceSearchForm
          onReset={handleReset}
          selectedBranch={selectedBranch}
          selectedDepartment={selectedDepartment}
          setSelectedBranch={setSelectedBranch}
          setSelectedDepartment={setSelectedDepartment}
          onDataFetched={(data) => setAttendanceData(data)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          onSearch={handleSearch}
        />
        <BulkAttendanceTable
          attendanceData={attendanceData}
          date={selectedDate}
        />
      </div>
    </>
  );
};

export default BulkAttendance;

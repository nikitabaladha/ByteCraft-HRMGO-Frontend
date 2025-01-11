import React, { useEffect, useState } from "react";
import MarkedAttendanceHeader from "./MarkedAttendanceHeader";
import MarkedAttendanceTable from "./MarkedAttendanceTable";
import MarkedAttendanceSearchForm from "./MarkedAttendanceSearchForm";
import getAPI from "../../../../../api/getAPI.js";
import { toast } from "react-toastify";

const MarkedAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedAttendanceData, setSelectedAttendanceData] = useState(null);

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchType, setSearchType] = useState("monthly");

  const fetchCurrentMonthData = async () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    setSelectedMonth(monthFormatted);

    try {
      const response = await getAPI(
        `/marked-attendance-get-all?branch=${selectedBranch}&department=${selectedDepartment}&date=${monthFormatted}&type=monthly`,
        {},
        true,
        true
      );

      if (!response.hasError && Array.isArray(response.data.data)) {
        setAttendanceData(response.data.data);

        console.log(
          "Attendance data fetched successfully:",
          response.data.data
        );
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching attendance data:", err);
      toast.error("Error fetching current month's attendance data");
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
      <MarkedAttendanceHeader />
      <div className="row">
        <MarkedAttendanceSearchForm
          onDataFetched={(data) => setAttendanceData(data)}
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
        <MarkedAttendanceTable
          attendanceData={attendanceData}
          setAttendanceData={setAttendanceData}
          selectedAttendanceData={selectedAttendanceData}
          setSelectedAttendanceData={setSelectedAttendanceData}
        />
      </div>
    </>
  );
};

export default MarkedAttendance;

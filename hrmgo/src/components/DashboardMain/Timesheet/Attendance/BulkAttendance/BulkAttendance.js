import React, { useState, useEffect } from "react";
import BulkAttendanceHeader from "./BulkAttendanceHeader";
import BulkAttendanceTable from "./BulkAttendanceTable";
import BulkAttendanceSearchForm from "./BulkAttendanceSearchForm";

const BulkAttendance = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleDataFetched = (data, branchId, departmentId, selectedDate) => {
    setFilteredEmployees(data);
    setBranchId(branchId);
    setDepartmentId(departmentId);
    setDate(selectedDate); // Ensure selected date is passed correctly
  };

  useEffect(() => {
    console.log("Date state inside BulkAttendance:", date);
  }, [date]);

  return (
    <>
      <BulkAttendanceHeader />
      <div className="row">
        <BulkAttendanceSearchForm onDataFetched={handleDataFetched} />
        <BulkAttendanceTable
          filteredEmployees={filteredEmployees}
          date={date}
          branchId={branchId}
          departmentId={departmentId}
        />
      </div>
    </>
  );
};

export default BulkAttendance;

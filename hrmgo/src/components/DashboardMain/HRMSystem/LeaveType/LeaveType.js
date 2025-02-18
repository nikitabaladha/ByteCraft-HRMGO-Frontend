import { useState, useEffect } from "react";
import React from "react";
import LeaveTypeHeader from "./LeaveTypeHeader";
import LeaveTypeTable from "./LeaveTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const HRMSystem = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);

      const fetchLeaveTypes = async () => {
        try {
          const response = await getAPI("/leave-type-get-all", true);
          if (!response.hasError) {
            setLeaveTypes(response.data.data);
          } else {
            toast.error(`Failed to fetch leave types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching leave types.");
        }
      };
  
      useEffect(() => {
      fetchLeaveTypes();
    }, []);
  return (
    <>
      <LeaveTypeHeader fetchLeaveTypes={fetchLeaveTypes}/>
      <LeaveTypeTable leaveTypes={leaveTypes} setLeaveTypes={setLeaveTypes} fetchLeaveTypes={fetchLeaveTypes}/>
    </>
  );
};

export default HRMSystem;

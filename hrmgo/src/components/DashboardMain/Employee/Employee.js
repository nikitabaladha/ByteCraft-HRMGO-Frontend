import React from "react";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";
import getAPI from "../../../api/getAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateEmployee from "./CreateEmployee/CreateEmployee";

const Employee = () => {
  const location = useLocation();

  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI(`/employee-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setEmployeeData(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Employee Data:", err);
      }
    };

    fetchEmployeeData();
  }, []);

  const isCreateRoute = location.pathname === "/dashboard/employee/create";

  return (
    <>
      {isCreateRoute ? (
        <CreateEmployee />
      ) : (
        <>
          <EmployeeHeader />
          <EmployeeTable employeeData={employeeData} />
        </>
      )}
    </>
  );
};

export default Employee;

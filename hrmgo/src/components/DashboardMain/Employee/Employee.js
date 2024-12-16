import React from "react";
import EmployeeHeader from "./EmployeeHeader";
import EmployeeTable from "./EmployeeTable";
import getAPI from "../../../api/getAPI";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateEmployee from "./CreateEmployee/CreateEmployee";
import UpdateEmployee from "./UpdateEmployee/UpdateEmployee";

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

  const addEmployee = (newEmployee) => {
    setEmployeeData((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const isCreateRoute = location.pathname === "/dashboard/employee/create";
  const isUpdateRoute = location.pathname === "/dashboard/employee/update";

  return (
    <>
      {isCreateRoute ? (
        <CreateEmployee addEmployee={addEmployee} />
      ) : isUpdateRoute ? (
        <UpdateEmployee />
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

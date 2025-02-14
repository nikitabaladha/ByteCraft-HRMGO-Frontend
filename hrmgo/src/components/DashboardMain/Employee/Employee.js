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

  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await getAPI(`/employee-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          console.log("employee data", response.data.data);
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

  const updateEmployee = (newUpdatedEmployee) => {
    setEmployeeData((prevEmployeeData) =>
      prevEmployeeData.map((employee) =>
        employee._id === newUpdatedEmployee._id ? newUpdatedEmployee : employee
      )
    );
  };

  const isCreateRoute = location.pathname === "/dashboard/employee/create";
  const isUpdateRoute = location.pathname === "/dashboard/employee/update";

  return (
    <>
      {isCreateRoute ? (
        <CreateEmployee addEmployee={addEmployee} />
      ) : isUpdateRoute ? (
        <UpdateEmployee updateEmployee={updateEmployee} />
      ) : (
        <>
          <EmployeeHeader employeeData={employeeData} />
          <EmployeeTable
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
            selectedEmployeeData={selectedEmployeeData}
            setSelectedEmployeeData={setSelectedEmployeeData}
          />
        </>
      )}
    </>
  );
};

export default Employee;

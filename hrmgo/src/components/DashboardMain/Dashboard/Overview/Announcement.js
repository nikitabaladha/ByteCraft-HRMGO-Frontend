import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { formatDate } from "../../../../js/custom.js";
import { Link } from "react-router-dom";

const Announcement = () => {
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

  return (
    <>
      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <h5>Employee List</h5>
          </div>
          <div className="card-body" style={{ height: 270, overflow: "auto" }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Branch</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Date Of Joining</th>
                  </tr>
                </thead>
                <tbody className="list">
                  {employeeData.map((employee, index) => (
                    <tr key={index}>
                     <td>
                              <Link className="btn btn-outline-primary" to="">
                                #{employee.id}
                              </Link>
                            </td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.branchName}</td>
                            <td>{employee.departmentName}</td>
                            <td>{employee.designationName}</td>
                            <td>{formatDate(employee.dateOfJoining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;

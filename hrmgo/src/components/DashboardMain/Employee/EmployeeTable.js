import React, { useEffect, useState } from "react";
import getAPI from "../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

const EmployeeTable = () => {
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
          console.log("Employee Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Employee Data:", err);
      }
    };

    fetchEmployeeData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <table className="table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Branch</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Date Of Joining</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((employee, index) => (
                      <tr key={employee.id}>
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
                        <td>{formatDate(employee.joiningDate)}</td>
                        <td className="Action">
                          <span>
                            <div className="action-btn bg-info ms-2">
                              <Link
                                to=""
                                className="mx-3 btn btn-sm align-items-center"
                                data-bs-toggle="tooltip"
                                title="Edit"
                              >
                                <TbPencil className="text-white" />
                              </Link>
                            </div>
                            <div className="action-btn bg-danger ms-2">
                              <form
                                method="POST"
                                action={`https://demo.workdo.io/hrmgo/employee/${
                                  index + 1
                                }`}
                                acceptCharset="UTF-8"
                                id={`delete-form-${index + 1}`}
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="1VeqiEqyagA6XjCZr049aILUNogdAGa44buw9sQP"
                                />
                                <Link
                                  to="/"
                                  className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title="Delete"
                                  aria-label="Delete"
                                >
                                  <FaRegTrashAlt className="text-white" />
                                </Link>
                              </form>
                            </div>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;

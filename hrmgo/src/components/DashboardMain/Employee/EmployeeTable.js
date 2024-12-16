// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Employee\EmployeeTable.js

import React from "react";

import { Link } from "react-router-dom";

import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../../Js/custom";
import { useNavigate } from "react-router-dom";

// from main page data is passing to the table
const EmployeeTable = ({ employeeData }) => {
  const navigate = useNavigate();

  const navigateToEmployeeUpdate = (event, employee) => {
    event.preventDefault();
    navigate(`/dashboard/employee/update`, { state: { employee } });
  };

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
                      <tr key={employee._id}>
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
                        <td className="Action">
                          <span>
                            <div className="action-btn bg-info ms-2">
                              <Link
                                className="mx-3 btn btn-sm align-items-center"
                                data-bs-toggle="tooltip"
                                title="Edit"
                                onClick={(event) =>
                                  navigateToEmployeeUpdate(event, employee)
                                }
                              >
                                <TbPencil className="text-white" />
                              </Link>
                            </div>
                            <div className="action-btn bg-danger ms-2">
                              <form method="POST" acceptCharset="UTF-8">
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input name="_token" type="hidden" />
                                <Link
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

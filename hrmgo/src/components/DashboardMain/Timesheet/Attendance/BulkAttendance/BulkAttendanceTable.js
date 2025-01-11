import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import postAPI from "../../../../../api/postAPI.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const BulkAttendanceTable = ({ attendanceData, date }) => {
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [localAttendanceData, setLocalAttendanceData] = useState([]);

  useEffect(() => {
    const initialStatus = attendanceData.reduce((acc, employee) => {
      acc[employee.id] =
        employee?.attendance?.status === "Present" ? true : false;
      return acc;
    }, {});
    setAttendanceStatus(initialStatus);
    setLocalAttendanceData(attendanceData);
  }, [attendanceData]);

  const handleToggleAttendance = (employeeId, checked) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [employeeId]: checked,
    }));
  };

  const handleChange = (employeeId, type, value) => {
    if (value === "") return;

    const updatedData = localAttendanceData.map((employee) => {
      if (employee.id !== employeeId) return employee;

      const updatedAttendance = employee.attendance || {};
      const formattedDate = `${moment(date).format(
        "YYYY-MM-DD"
      )}T${value}:00.000Z`;

      if (type === "clockIn") {
        updatedAttendance.clockIn = formattedDate;
      } else if (type === "clockOut") {
        updatedAttendance.clockOut = formattedDate;
      }

      return { ...employee, attendance: updatedAttendance };
    });

    setLocalAttendanceData(updatedData);
  };

  const handleToggleAllAttendance = (event) => {
    const checked = event.target.checked;
    const newAttendanceStatus = localAttendanceData.reduce((acc, employee) => {
      acc[employee.id] = checked;
      return acc;
    }, {});
    setAttendanceStatus(newAttendanceStatus);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedAttendanceData = localAttendanceData.map((employee) => {
      const clockIn = event.target[`in-${employee.id}`]?.value || "09:00";
      const clockOut = event.target[`out-${employee.id}`]?.value || "18:00";

      const formattedClockIn = new Date(`${date}T${clockIn}:00Z`);
      const formattedClockOut = new Date(`${date}T${clockOut}:00Z`);

      return {
        employeeId: employee._id,
        date,
        status: attendanceStatus[employee.id] ? "Present" : "Absent",
        clockIn: formattedClockIn.toISOString(),
        clockOut: formattedClockOut.toISOString(),
        id: employee?.attendance?._id,
      };
    });

    try {
      const response = await postAPI(
        "/marked-attendance",
        formattedAttendanceData,
        true
      );
      toast.success("Employee attendance successfully created!");
      const updatedData = localAttendanceData.map((e) => {
        const attendanceData = response.data.data.find(
          (a) => a.employeeId === e._id
        );
        e.attendance = attendanceData;
        return e;
      });
      setLocalAttendanceData(updatedData);
    } catch (error) {
      console.error("Error saving attendance data:", error);
      toast.error("Failed to save attendance data.");
    }
  };

  console.log(localAttendanceData);

  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header card-body table-border-style">
          <form onSubmit={handleSubmit}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th width="10%">Employee Id</th>
                    <th>Employee</th>
                    <th>Branch</th>
                    <th>Department</th>
                    <th>
                      <div className="form-group my-auto">
                        <div className="custom-control">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="present_all"
                            id="present_all"
                            checked={localAttendanceData.every(
                              (employee) => attendanceStatus[employee.id]
                            )}
                            onChange={handleToggleAllAttendance}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="present_all"
                          >
                            Attendance
                          </label>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {localAttendanceData.map((employee) => (
                    <tr key={employee.id}>
                      <td className="Id">
                        <input
                          type="hidden"
                          name="employee_id[]"
                          value={employee.id}
                        />
                        <Link to="" className="btn btn-outline-primary">
                          {employee.id}
                        </Link>
                      </td>
                      <td>{employee.name}</td>
                      <td>{employee.branchName}</td>
                      <td> {employee.departmentName}</td>
                      <td>
                        <div className="row">
                          <div className="col-md-1">
                            <div className="form-group">
                              <div className="custom-control custom-checkbox">
                                <input
                                  className="form-check-input present"
                                  type="checkbox"
                                  name={`present-${employee.id}`}
                                  id={`present${employee.id}`}
                                  checked={attendanceStatus[employee.id]}
                                  onChange={(e) =>
                                    handleToggleAttendance(
                                      employee.id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor={`present${employee.id}`}
                                ></label>
                              </div>
                            </div>
                          </div>

                          <div
                            className={`col-md-8 present_check_in ${
                              attendanceStatus[employee.id] ? "" : "d-none"
                            }`}
                          >
                            <div className="row">
                              <label className="col-md-2 control-label">
                                In
                              </label>
                              <div className="col-md-4">
                                <input
                                  type="time"
                                  className="form-control"
                                  name={`in-${employee.id}`}
                                  value={
                                    employee?.attendance?.clockIn
                                      ? moment(employee.attendance.clockIn)
                                          .utc()
                                          .format("HH:mm")
                                      : "09:00"
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      employee.id,
                                      "clockIn",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                              <label
                                htmlFor="inputValue"
                                className="col-md-2 control-label"
                              >
                                Out
                              </label>
                              <div className="col-md-4">
                                <input
                                  type="time"
                                  className="form-control"
                                  name={`out-${employee.id}`}
                                  value={
                                    employee?.attendance?.clockOut
                                      ? moment(employee.attendance.clockOut)
                                          .utc()
                                          .format("HH:mm")
                                      : "18:00"
                                  }
                                  onChange={(e) =>
                                    handleChange(
                                      employee.id,
                                      "clockOut",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="attendance-btn float-end pt-4">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BulkAttendanceTable;

// ==================================================================

// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\Attendance\BulkAttendance\BulkAttendanceTable.js

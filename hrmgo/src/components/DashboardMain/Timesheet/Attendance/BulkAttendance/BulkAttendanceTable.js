import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import postAPI from "../../../../../api/postAPI.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BulkAttendanceTable = ({ filteredEmployees, date }) => {
  const [attendanceStatus, setAttendanceStatus] = useState({});

  // Handle toggling attendance for an individual employee
  const handleToggleAttendance = (employeeId, checked) => {
    setAttendanceStatus((prevState) => ({
      ...prevState,
      [employeeId]: checked,
    }));
  };

  const handleToggleAllAttendance = (event) => {
    const checked = event.target.checked;
    const newAttendanceStatus = filteredEmployees.reduce((acc, employee) => {
      acc[employee.id] = checked;
      return acc;
    }, {});
    setAttendanceStatus(newAttendanceStatus);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const attendanceData = filteredEmployees.map((employee) => {
      const clockIn = event.target[`in-${employee.id}`]?.value || "09:00";
      const clockOut = event.target[`out-${employee.id}`]?.value || "18:00";

      // Format clock-in and clock-out as Date objects
      const formattedClockIn = clockIn
        ? new Date(`${date}T${clockIn}:00Z`)
        : new Date(`${date}T09:00:00Z`);
      const formattedClockOut = clockOut
        ? new Date(`${date}T${clockOut}:00Z`)
        : new Date(`${date}T18:00:00Z`);

      return {
        employeeId: employee._id,
        date,
        status: attendanceStatus[employee.id] ? "Present" : "Absent",
        clockIn: formattedClockIn.toISOString(),
        clockOut: formattedClockOut.toISOString(),
      };
    });

    try {
      const response = await postAPI(
        "/marked-attendance",
        attendanceData,
        true
      );
      console.log("Attendance data saved:", response.data);
      toast.success("Employee attendance successfully created!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error saving attendance data:", error);
    }
  };

  useEffect(() => {
    const initialStatus = filteredEmployees.reduce((acc, employee) => {
      acc[employee.id] = employee.attendance ? true : false;
      return acc;
    }, {});
    setAttendanceStatus(initialStatus);
  }, [filteredEmployees]);

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
                            checked={filteredEmployees.every(
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
                  {filteredEmployees.map((employee) => (
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
                      <td>{employee.departmentName}</td>
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

                          {employee.attendance ? (
                            <div className="col-md-8">
                              <div className="row">
                                <label className="col-md-2 control-label">
                                  In
                                </label>
                                <div className="col-md-4">
                                  <input
                                    type="time"
                                    className="form-control"
                                    name={`in-${employee.id}`}
                                    value={new Date(
                                      employee.attendance.clockIn
                                    ).toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
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
                                    value={new Date(
                                      employee.attendance.clockOut
                                    ).toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
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
                                    className="form-control timepicker"
                                    name={`in-${employee.id}`}
                                    defaultValue="09:00"
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
                                    className="form-control timepicker"
                                    name={`out-${employee.id}`}
                                    defaultValue="18:00"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
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
      <ToastContainer />
    </div>
  );
};

export default BulkAttendanceTable;

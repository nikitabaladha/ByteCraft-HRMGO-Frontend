import React from "react";

const AttendanceTable = ({ attendanceData, selectedMonthYear }) => {
  if (!selectedMonthYear) {
    return null;
  }

  const [year, month] = selectedMonthYear.split("-").map(Number);

  const monthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(year, month - 1)
  );

  const totalDaysInMonth = new Date(year, month, 0).getDate();

  const employees = Array.isArray(attendanceData)
    ? attendanceData
    : [attendanceData].filter(Boolean);

  return (
    <div className="col">
      <div className="card">
        <div className="card-body table-border-style">
          <div className="table-responsive py-4 attendance-table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th className="active">Name</th>
                  {Array.from({ length: totalDaysInMonth }, (_, index) => (
                    <th key={index}>{String(index + 1).padStart(2, "0")}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.employeeId}>
                    <td>{employee.employeeName}</td>
                    {Array.from({ length: totalDaysInMonth }, (_, index) => {
                      const dateString = `${monthName} ${String(
                        index + 1
                      ).padStart(2, "0")}, ${year}`;

                      const attendanceRecord = employee.attendance.find(
                        (record) => record.date === dateString
                      );

                      return (
                        <td key={index}>
                          {attendanceRecord ? (
                            attendanceRecord.status === "Present" ? (
                              <i className="badge bg-success p-2">P</i>
                            ) : attendanceRecord.status === "Absent" ? (
                              <i className="badge bg-danger p-2">A</i>
                            ) : (
                              ""
                            )
                          ) : (
                            ""
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;

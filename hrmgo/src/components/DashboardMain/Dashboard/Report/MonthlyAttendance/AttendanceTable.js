import React from "react";

// Sample data structure for employees and their attendance
const employees = [
  {
    name: "Julie Lynn",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Lunea Todd",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Ida F. Mullen",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Abra Stevens",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Julie Lynn",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Lunea Todd",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Ida F. Mullen",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Abra Stevens",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Julie Lynn",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Lunea Todd",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Ida F. Mullen",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
  {
    name: "Abra Stevens",
    attendance: Array(30).fill(""), // 30 days of empty attendance
  },
];

const AttendanceTable = () => {
  return (
    <>
      <div className="col">
        <div className="card">
          <div className="card-body table-border-style">
            <div className="table-responsive py-4 attendance-table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th className="active">Name</th>
                    {/* Dynamically generate table header for dates */}
                    {Array.from({ length: 30 }, (_, index) => (
                      <th key={index}>{String(index + 1).padStart(2, "0")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Map through each employee to generate rows */}
                  {employees.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.name}</td>
                      {/* Map through each attendance for the employee */}
                      {employee.attendance.map((day, dayIndex) => (
                        <td key={dayIndex}>{day || ""}</td>
                      ))}
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

export default AttendanceTable;

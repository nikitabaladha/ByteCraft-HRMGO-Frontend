import React from "react";

import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil } from "react-icons/tb";

const MarkedAttendanceTable = ({ attendanceData }) => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header card-body table-border-style">
          <div className="table-responsive">
            <table className="table" id="pc-dt-simple">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Late</th>
                  <th>Early Leaving</th>
                  <th>Overtime</th>
                  <th width="200px">Action</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((attendance) => (
                  <tr key={attendance.id}>
                    <td>{attendance.employeeName}</td>
                    <td>{attendance.date}</td>
                    <td>{attendance.status}</td>
                    <td>{attendance.clockIn}</td>
                    <td>{attendance.clockOut}</td>
                    <td>{attendance.late}</td>
                    <td>{attendance.earlyLeaving}</td>
                    <td>{attendance.overtime}</td>
                    <td className="Action">
                      <span>
                        <div className="action-btn bg-info ms-2">
                          <Link
                            to={`/attendanceemployee/${attendance.id}/edit`}
                            className="mx-3 btn btn-sm align-items-center"
                            data-size="lg"
                            data-url={`/attendanceemployee/${attendance.id}/edit`}
                            data-ajax-popup="true"
                            data-bs-toggle="tooltip"
                            title=""
                            data-title="Edit Attendance"
                            data-bs-original-title="Edit"
                          >
                            <TbPencil className="text-white" />
                          </Link>
                        </div>
                        <div className="action-btn bg-danger ms-2">
                          <form
                            method="POST"
                            action={`/attendanceemployee/${attendance.id}`}
                            acceptCharset="UTF-8"
                            id={`delete-form-${attendance.id}`}
                          >
                            <input
                              name="_method"
                              type="hidden"
                              defaultValue="DELETE"
                            />
                            <input
                              name="_token"
                              type="hidden"
                              defaultValue="bnCk9ugiLLqBFsuzhI86sHyjDoyXy7lytE427cyy"
                            />
                            <Link
                              to="/"
                              className="mx-3 btn btn-sm align-items-center bs-pass-para"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Delete"
                              aria-label="Delete"
                            >
                              <HiOutlineTrash className="text-white text-white" />
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
  );
};

export default MarkedAttendanceTable;

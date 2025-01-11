import React ,{useState}from "react";

import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil } from "react-icons/tb";

const MarkedAttendanceTable = ({ attendanceData }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);
const [searchQuery, setSearchQuery] = useState("");

const handleEntriesPerPageChange = (event) => {
  setEntriesPerPage(Number(event.target.value));
  setCurrentPage(1);
};

const filteredAttendance = attendanceData.filter((attendance) => {
  const searchTerm = searchQuery.toLowerCase();
  const formattedDate = new Date(attendance.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).toLowerCase();

  // Normalize time strings for comparison
  const formatTime = (time) => time.toLowerCase(); 

  return (
    attendance.employeeName.toLowerCase().includes(searchTerm) ||
    attendance.status.toLowerCase().includes(searchTerm) ||
    attendance.clockIn.toLowerCase().includes(searchTerm) ||
    attendance.clockOut.toLowerCase().includes(searchTerm) ||
    formatTime(attendance.late).includes(searchTerm) ||
    formatTime(attendance.earlyLeaving).includes(searchTerm) ||
    formatTime(attendance.overtime).includes(searchTerm) ||
    formattedDate.includes(searchTerm)
  );
});


  return (
    <div className="row">
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header card-body table-border-style">
          <div className="table-responsive">
            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
              <div className="dataTable-top">
                <div className="dataTable-dropdown">
                  <label>
                    <select
                      className="dataTable-selector"
                      value={entriesPerPage}
                      onChange={handleEntriesPerPageChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>{" "}
                    entries per page
                  </label>
                </div>
                <div className="dataTable-search">
                  <input
                    className="dataTable-input"
                    placeholder="Search..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="dataTable-container">
                <table className="table dataTable-table" id="pc-dt-simple">
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
                {filteredAttendance.map((attendance) => (
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
                          <form method="POST" acceptCharset="UTF-8">
                            <Link
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
          <div className="dataTable-bottom">
  <div className="dataTable-info">
    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, attendanceData.length)}{" "}
    to {Math.min(currentPage * entriesPerPage, attendanceData.length)}{" "}
    of {attendanceData.length} entries
  </div>
  <nav className="dataTable-pagination">
    <ul className="dataTable-pagination-list">
      {currentPage > 1 && (
        <li className="page-item">
          <button
            className="page-link prev-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ‹
          </button>
        </li>
      )}

      {Array.from({ length: Math.ceil(attendanceData.length / entriesPerPage) }, (_, index) => (
        <li
          key={index + 1}
          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={() => setCurrentPage(index + 1)}
            style={{
              backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
              color: '#6FD943',
            }}
          >
            {index + 1}
          </button>
        </li>
      ))}

      {currentPage < Math.ceil(attendanceData.length / entriesPerPage) && (
        <li className="page-item">
          <button
            className="page-link next-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ›
          </button>
        </li>
      )}
    </ul>
  </nav>
</div>

        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default MarkedAttendanceTable;

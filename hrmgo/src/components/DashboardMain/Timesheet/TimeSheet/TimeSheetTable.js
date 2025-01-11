import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil } from "react-icons/tb";
import { formatDate } from "../../../../Js/custom.js";

const TimeSheetTable = ({ filters }) => {
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTimeSheets = timeSheetData.filter((timeSheet) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(timeSheet.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).toLowerCase();
    return (
      timeSheet.employeeName.toLowerCase().includes(searchTerm) ||
      timeSheet.remark.toLowerCase().includes(searchTerm) ||
      // timeSheet.taskDescription.toLowerCase().includes(searchTerm) || 
      formattedDate.includes(searchTerm)
    );
  });


  useEffect(() => {
    const fetchTimeSheetData = async () => {
      try {
        const response = await getAPI("/timesheet-get-all", {}, true);

        if (!response.hasError && Array.isArray(response.data.data)) {
          const data = response.data.data;

          // Filter data based on the filters state
          const filteredData = data.filter((entry) => {
            const isEmployeeMatch =
              !filters.employeeId || entry.employeeId === filters.employeeId;
            const isStartDateMatch =
              !filters.startDate ||
              new Date(entry.date) >= new Date(filters.startDate);
            const isEndDateMatch =
              !filters.endDate ||
              new Date(entry.date) <= new Date(filters.endDate);

            return isEmployeeMatch && isStartDateMatch && isEndDateMatch;
          });

          setTimeSheetData(filteredData);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching TimeSheetData:", err);
      }
    };

    fetchTimeSheetData();
  }, [filters]);

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
                        <th>Hours</th>
                        <th>Remark</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTimeSheets.map((entry) => (
                        <tr key={entry.id}>
                          <td>{entry.employeeName}</td>
                          <td>{formatDate(entry.date)}</td>
                          <td>{entry.hours}</td>
                          <td>{entry.remark}</td>
                          <td className="Action">
                            <span>
                              <div className="action-btn bg-info ms-2">
                                <Link to="/" className="mx-3 btn btn-sm">
                                  <TbPencil className="text-white" />
                                </Link>
                              </div>
                              <div className="action-btn bg-danger ms-2">
                                <Link to="/" className="mx-3 btn btn-sm">
                                  <HiOutlineTrash className="text-white" />
                                </Link>
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, timeSheetData.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, timeSheetData.length)}{" "}
                    of {timeSheetData.length} entries
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

                      {Array.from({ length: Math.ceil(timeSheetData.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(timeSheetData.length / entriesPerPage) && (
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

export default TimeSheetTable;

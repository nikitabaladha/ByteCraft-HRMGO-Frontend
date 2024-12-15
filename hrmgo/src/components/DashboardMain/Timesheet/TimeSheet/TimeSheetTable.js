import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";
import { TbPencil } from "react-icons/tb";
import { formatDate } from "../../../../Js/custom.js";

const TimeSheetTable = ({ filters }) => {
  const [timeSheetData, setTimeSheetData] = useState([]);

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
    <div className="col-xl-12">
      <div className="card">
        <div className="card-header card-body table-border-style">
          <div className="card-body py-0">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
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
                  {timeSheetData.map((entry) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetTable;

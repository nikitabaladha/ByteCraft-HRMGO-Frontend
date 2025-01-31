import React from "react";
import { TbCalendarEvent } from "react-icons/tb";

const LeaveList = ({ leaveData }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <h4 className="mb-4">Leaves</h4>
          <ul className="event-cards list-group list-group-flush mt-3 w-100">
            {leaveData.length > 0 ? (
              leaveData.map((leave) => (
                <li className="list-group-item card mb-3" key={leave.id}>
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto mb-3 mb-sm-0">
                      <div className="d-flex align-items-center">
                        <div className="badge theme-avtar bg-primary">
                          <TbCalendarEvent />
                        </div>
                        <div className="ms-3">
                          <h6 className="card-text small text-primary">
                            {leave.leaveType}
                          </h6>
                          <div className="card-text small text-dark">
                            Start Date: {formatDate(leave.startDate)}
                          </div>
                          <div className="card-text small text-dark">
                            End Date: {formatDate(leave.endDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center">No Leave List!</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeaveList;

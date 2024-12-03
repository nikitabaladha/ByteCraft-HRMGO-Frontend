import React from "react";
import { TbCalendarEvent } from "react-icons/tb";

const HolidayList = ({ holidays }) => {
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
          <h4 className="mb-4">Holiday List</h4>
          <ul className="event-cards list-group list-group-flush mt-3 w-100">
            {holidays.map((holiday) => (
              <li className="list-group-item card mb-3" key={holiday.id}>
                <div className="row align-items-center justify-content-between">
                  <div className="col-auto mb-3 mb-sm-0">
                    <div className="d-flex align-items-center">
                      <div className="badge theme-avtar bg-primary">
                        <TbCalendarEvent />
                      </div>
                      <div className="ms-3">
                        <h6 className="card-text small text-primary">
                          {holiday.occasion}
                        </h6>
                        <div className="card-text small text-dark">
                          Start Date: {formatDate(holiday.startDate)}
                        </div>
                        <div className="card-text small text-dark">
                          End Date: {formatDate(holiday.endDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HolidayList;

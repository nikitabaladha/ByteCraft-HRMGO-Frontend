// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Timesheet\ManageLeave\ManageLeaveCalendarView\ManageLeaveCalendar.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import StatusModal from "../StatusModal";

const ManageLeaveCalendar = ({
  leaveData,
  setLeaveData,
  selectedLeave,
  setSelectedLeave,
  handleStatusUpdate,
}) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const openStatusModal = (leave) => {
    setSelectedLeave(leave);
    setIsStatusModalOpen(true);
  };

  const events = leaveData.map((leave) => ({
    id: leave.id,
    title: leave.leaveType,
    start: leave.startDate,
    end: leave.endDate,
  }));

  const renderEventContent = (eventInfo) => {
    return (
      <div
        onClick={() =>
          openStatusModal(leaveData.find((h) => h.id === eventInfo.event.id))
        }
      >
        <Link className="fc-daygrid-event">
          <div
            className="fc-event-main"
            style={{
              color: "#fff",
              backgroundColor: "#51459d",
              padding: "5px 5px",
              borderRadius: "3px",
            }}
          >
            <div className="fc-event-title">{eventInfo.event.title}</div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-lg-6">
                <h5>Calendar</h5>
              </div>
              <div className="col-lg-6">
                <select
                  className="form-control"
                  name="calendar_type"
                  id="calendar_type"
                  style={{ float: "right", width: 155 }}
                >
                  <option value="google_calendar">Google Calendar</option>
                  <option value="local_calendar" selected>
                    Local Calendar
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div id="calendar" className="calendar">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                events={events}
                displayEventTime={false}
                eventContent={renderEventContent}
              />
            </div>
          </div>
        </div>
      </div>

      {isStatusModalOpen && selectedLeave && (
        <StatusModal
          leave={selectedLeave}
          onClose={() => setIsStatusModalOpen(false)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </>
  );
};

export default ManageLeaveCalendar;

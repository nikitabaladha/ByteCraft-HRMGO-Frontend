import React, { useState } from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UpdateHolidayModal from "./UpdateHolidayModal";

const HolidayCalendar = ({ holidays, updateHoliday }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedHoliday, setSelectedHolidayState] = useState(null);

  const handleUpdate = (holiday) => {
    setSelectedHolidayState(holiday);
    setIsUpdateModalOpen(true);
  };

  const events = holidays.map((holiday) => ({
    id: holiday.id,
    title: holiday.occasion,
    start: holiday.startDate,
    end: holiday.endDate,
  }));

  const renderEventContent = (eventInfo) => {
    const holiday = holidays.find((h) => h.id === eventInfo.event.id);

    return (
      <div>
        <Link
          onClick={() => handleUpdate(holiday)}
          className="fc-daygrid-event"
        >
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

      {isUpdateModalOpen && selectedHoliday && (
        <UpdateHolidayModal
          holiday={selectedHoliday}
          onClose={() => setIsUpdateModalOpen(false)}
          updateHoliday={updateHoliday}
        />
      )}
    </>
  );
};

export default HolidayCalendar;

import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalenderModal from "./CalenderModal.js";

const Calendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showCalendarModal, setShowCalenderModal] = useState(false);
  const [popupData, setPopupData] = useState(null);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth();
    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const response = await getAPI(`/Calendar-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          // Transform data to match FullCalendar's expected format
          const formattedEvents = response.data.data.map((event) => ({
            title: event.title,
            start: formatDate(event.startDate),
            end: formatDate(event.endDate),
            id: event._id,
          }));
          setCalendars(formattedEvents);
          console.log("Calendars fetched successfully", formattedEvents);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Calendars:", err);
      }
    };

    fetchCalendar();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEventClick = (eventInfo) => {
    setPopupData({
      date: eventInfo.event.start.toISOString().split("T")[0],
      events: [eventInfo.event.title],
    });
    setShowPopup(true);
  };

  const handlePopupClick = () => {
    if (popupData) {
      console.log("Popup clicked");
      setShowCalenderModal(true);
    }
  };

  return (
    <>
      <div className="col-xl-7">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-lg-6">
                <h5>Calendar</h5>
              </div>
              <div className="col-lg-6">
                <select
                  className="form-control"
                  name="calender_type"
                  id="calender_type"
                  style={{ float: "right", width: 155 }}
                >
                  <option value="google_calender">Google Calendar</option>
                  <option value="local_calender" selected="true">
                    Local Calendar
                  </option>
                </select>
              </div>
            </div>
            <div className="card-body">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={calendars}
                eventContent={(eventInfo) => {
                  return (
                    <>
                      <div
                        style={{
                          color: "black",
                        }}
                      >
                        1+ more
                      </div>
                    </>
                  );
                }}
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                eventClick={handleEventClick}
              />
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div
          className="popup-overlay"
          id="fc-dom-121"
          onClick={handlePopupClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <div
              className="popup-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h4>{popupData.date}</h4>
              <button
                onClick={handleClosePopup}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>
            <div className="popup-body">
              {popupData.events.length > 0 ? (
                <ul>
                  {popupData.events.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              ) : (
                <p>No events for this day.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && popupData && (
        <CalenderModal
          onClose={() => setShowCalenderModal(false)}
          popupData={popupData}
        />
      )}
    </>
  );
};

export default Calendar;

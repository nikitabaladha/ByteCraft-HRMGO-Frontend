// import React from "react";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const HolidayCalendar = ({ holidays }) => {
//   // Map holidays to FullCalendar events
//   const events = holidays.map((holiday) => ({
//     title: holiday.occasion, // Occasion name
//     start: holiday.startDate, // Start date
//   }));

//   // Custom render for events to display only the occasion name
//   const renderEventContent = (eventInfo) => {
//     return <div>{eventInfo.event.title}</div>;
//   };

//   return (
//     <>
//       <div className="col-lg-8">
//         <div className="card">
//           <div className="card-header">
//             <div className="row">
//               <div className="col-lg-6">
//                 <h5>Calendar</h5>
//               </div>
//               <div className="col-lg-6">
//                 <select
//                   className="form-control"
//                   name="calendar_type"
//                   id="calendar_type"
//                   style={{ float: "right", width: 155 }}
//                 >
//                   <option value="google_calendar">Google Calendar</option>
//                   <option value="local_calendar" selected>
//                     Local Calendar
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="card-body">
//             <div id="calendar" className="calendar">
//               <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView="dayGridMonth"
//                 headerToolbar={{
//                   left: "prev,next today",
//                   center: "title",
//                   right: "dayGridMonth,timeGridWeek,timeGridDay",
//                 }}
//                 buttonText={{
//                   today: "Today",
//                   month: "Month",
//                   week: "Week",
//                   day: "Day",
//                 }}
//                 events={events}
//                 displayEventTime={false}
//                 eventContent={renderEventContent}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HolidayCalendar;

// import React from "react";
// import { Link } from "react-router-dom";

// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const HolidayCalendar = ({ holidays }) => {
//   console.log("HolidayCalendar", holidays);

//   // [
//   //   {
//   //     occasion: "Independence Day ",
//   //     startDate: "2024-08-15T00:00:00.000Z",
//   //     endDate: "2024-08-15T00:00:00.000Z",
//   //     id: "674e45c912088dd82da1d4df",
//   //   },
//   //   {
//   //     occasion: "Krishna Janmastami",
//   //     startDate: "2024-08-20T00:00:00.000Z",
//   //     endDate: "2024-08-20T00:00:00.000Z",
//   //     id: "674e461d12088dd82da1d4e2",
//   //   },
//   //   {
//   //     occasion: "testing long",
//   //     startDate: "2024-12-04T00:00:00.000Z",
//   //     endDate: "2024-12-08T00:00:00.000Z",
//   //     id: "674f5ca7b04b94cca143c7c3",
//   //   },
//   // ];

//   const events = holidays.map((holiday) => ({
//     title: holiday.occasion,
//     start: holiday.startDate,
//     endDate: holiday.endDate,
//   }));

//   //   i want that if holiday day count is big then the starting form startDate to end date part the background color must be display to mark it as long holiday for example see testing long occasion in that start date is 2024-12-04 and end date is 2024-12-08 so for that i want css like the background color string from 4 to 8 must be in  backgroundColor: "#51459d", color just to show the holiday correctly other than that everything is perfect. see somtime it also possible that startDate and endDate must be same in that situation show only startDate background color is backgroundColor: "#51459d" so do it for me
//   const renderEventContent = (eventInfo) => {
//     return (
//       <>
//         <div>
//           <Link
//             to={`/event/${eventInfo.event.id}`}
//             className="fc-daygrid-event fc-daygrid-block-event fc-h-event fc-event fc-event-draggable fc-event-resizable fc-event-start fc-event-end"
//           >
//             <div
//               className="fc-event-main"
//               style={{
//                 color: "#fff",
//                 backgroundColor: "#51459d",
//                 padding: "5px 5px",
//                 borderRadius: "3px",
//               }}
//             >
//               <div className="fc-event-main-frame">
//                 <div className="fc-event-title-container">
//                   <div className="fc-event-title">{eventInfo.event.title}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="fc-event-resizer fc-event-resizer-end" />
//           </Link>
//         </div>
//       </>
//     );
//   };

//   return (
//     <>
//       <div className="col-lg-8">
//         <div className="card">
//           <div className="card-header">
//             <div className="row">
//               <div className="col-lg-6">
//                 <h5>Calendar</h5>
//               </div>
//               <div className="col-lg-6">
//                 <select
//                   className="form-control"
//                   name="calendar_type"
//                   id="calendar_type"
//                   style={{ float: "right", width: 155 }}
//                 >
//                   <option value="google_calendar">Google Calendar</option>
//                   <option value="local_calendar" selected>
//                     Local Calendar
//                   </option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="card-body">
//             <div id="calendar" className="calendar">
//               <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView="dayGridMonth"
//                 headerToolbar={{
//                   left: "prev,next today",
//                   center: "title",
//                   right: "dayGridMonth,timeGridWeek,timeGridDay",
//                 }}
//                 buttonText={{
//                   today: "Today",
//                   month: "Month",
//                   week: "Week",
//                   day: "Day",
//                 }}
//                 events={events}
//                 displayEventTime={false}
//                 eventContent={renderEventContent}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HolidayCalendar;

import React from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const HolidayCalendar = ({ holidays }) => {
  console.log("HolidayCalendar", holidays);

  const events = holidays.map((holiday) => {
    const { occasion, startDate, endDate } = holiday;
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in time
    const timeDiff = end - start;
    const dayDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

    return {
      title: occasion,
      start: startDate,
      end: endDate,
      extendedProps: {
        isLongHoliday: dayDiff > 0, // true if the holiday spans multiple days
      },
    };
  });

  const renderEventContent = (eventInfo) => {
    const { title } = eventInfo.event;
    const isLongHoliday = eventInfo.event.extendedProps.isLongHoliday;

    return (
      <div>
        <Link
          to={`/event/${eventInfo.event.id}`}
          className="fc-daygrid-event fc-daygrid-block-event fc-h-event fc-event fc-event-draggable fc-event-resizable fc-event-start fc-event-end"
        >
          <div
            className="fc-event-main"
            style={{
              color: "#fff",
              backgroundColor: isLongHoliday ? "#51459d" : "#51459d", // Same color for both
              padding: "5px 5px",
              borderRadius: "3px",
            }}
          >
            <div className="fc-event-main-frame">
              <div className="fc-event-title-container">
                <div className="fc-event-title">{title}</div>
              </div>
            </div>
          </div>
          <div className="fc-event-resizer fc-event-resizer-end" />
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
    </>
  );
};

export default HolidayCalendar;

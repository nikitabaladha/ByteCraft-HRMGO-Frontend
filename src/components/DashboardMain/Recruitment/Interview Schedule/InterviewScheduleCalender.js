// import React from 'react'

// const InterviewScheduleCalender = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default InterviewScheduleCalender

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { CiCalendarDate } from "react-icons/ci";
import getAPI from "../../../../api/getAPI";
import InterviewScheduleTable from "./InterviewScheduleTable";
import InterviewScheduleView from "./InterviewScheduleView";

const InterviewScheduleCalender = () => {
    const [schedules, setSchedules] = useState([]);
    // const [filteredMeetings, setFilteredMeetings] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState("");
    // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [selectedMeeting, setSelectedMeeting] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
          try {
            const response = await getAPI('/get-all-interview-schedule'); 
            setSchedules(response.data);
          } catch (error) {
            console.error('Error fetching interview schedules:', error);
          }
        };
    
        fetchSchedules();
      }, []);

    // useEffect(() => {
      
    //     const filtered = schedules.filter((schedule) => {
    //         const meetingDate = new Date(schedule.date);
    //         return meetingDate.getMonth() === currentMonth;
    //     });
    //     setFilteredMeetings(filtered);
    // }, [schedules, currentMonth]);

  
    const events = schedules.map((schedule, index) => ({
        id: `schedule-${index}`,
        title: schedule.applicatAppliedFor,
        date: schedule.date,
        extendedProps: { ...schedule },
    }));

    const handleEventClick = (clickInfo) => {
        console.log("selected", clickInfo.event.title)
        setSelectedMeeting(clickInfo.event.extendedProps);
    };

    const handleCloseModal = () => {
        setSelectedMeeting(null);
    };

    const renderEventContent = (eventInfo) => {
        return (
            <div
                style={{
                    backgroundColor: "#51459D",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "2px",
                    fontSize: "12px",
                    textAlign: "center",
                }}
            >
                
                {eventInfo.event.title}

            </div>
            
        );
        
    };

    // const handleDateChange = (dateInfo) => {
    //     setCurrentMonth(dateInfo.view.currentStart.getMonth());
    // };

    return (
        <div className="dash-content">
            <div className="row">
                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-lg-6">
                                    <h5>Calendar</h5>
                                    <input
                                        type="hidden"
                                        id="path_admin"
                                        value="https://demo.workdo.io/hrmgo"
                                    />
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
                                    eventClick={handleEventClick}
                                    displayEventTime={false}
                                    eventContent={renderEventContent}
                                    // datesSet={handleDateChange} 
                                />
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
                <InterviewScheduleTable/>
            </div>
            {selectedMeeting && (
                <InterviewScheduleView schedule={selectedMeeting} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default InterviewScheduleCalender;

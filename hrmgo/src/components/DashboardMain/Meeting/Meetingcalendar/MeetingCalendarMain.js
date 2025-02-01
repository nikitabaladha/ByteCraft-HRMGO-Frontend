import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CiCalendarDate } from "react-icons/ci";
import getAPI from "../../../../api/getAPI";

const MeetingCalendar = () => {
    const [meetings, setMeetings] = useState([]);
    const [filteredMeetings, setFilteredMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await getAPI("/meeting-getall", {}, true);
                setMeetings(response.data.meetings);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch Meetings");
                setLoading(false);
            }
        };

        fetchMeetings();
    }, []);

    useEffect(() => {
      
        const filtered = meetings.filter((meeting) => {
            const meetingDate = new Date(meeting.date);
            return meetingDate.getMonth() === currentMonth;
        });
        setFilteredMeetings(filtered);
    }, [meetings, currentMonth]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

  
    const events = meetings.map((meeting, index) => ({
        id: `meeting-${index}`,
        title: meeting.title,
        start: meeting.date,
    }));

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

    const handleDateChange = (dateInfo) => {
        setCurrentMonth(dateInfo.view.currentStart.getMonth());
    };

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
                                    displayEventTime={false}
                                    eventContent={renderEventContent}
                                    datesSet={handleDateChange} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-4">Meetings</h4>
                            <ul className="event-cards list-group list-group-flush mt-3 w-100">
                                {filteredMeetings.map((meeting, index) => (
                                    <li className="list-group-item card mb-3" key={index}>
                                        <div className="row align-items-center justify-content-between">
                                            <div className="col-auto mb-3 mb-sm-0">
                                                <div className="d-flex align-items-center">
                                                    <div className="badge theme-avtar bg-primary">
                                                        <CiCalendarDate />
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="card-text small text-primary">
                                                            {meeting.title}
                                                        </h6>
                                                        <div className="card-text small text-dark">
                                                            {new Date(meeting.date).toLocaleDateString("en-US", {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            })}
                                                            <span style={{ marginLeft: "10px" }}>
                                                                {new Date("1970-01-01T" + meeting.time)
                                                                    .toLocaleTimeString("en-IN", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        hour12: true,
                                                                    })
                                                                    .toUpperCase()}
                                                            </span>
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
            </div>
        </div>
    );
};

export default MeetingCalendar;

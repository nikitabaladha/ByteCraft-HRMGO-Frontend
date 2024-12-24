import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { CiCalendarDate } from "react-icons/ci";
import ZoomMeetingModal from "./ZoomMeetingModal";
import { useNavigate } from "react-router-dom";

const MeetingHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const goToCalendar = () => {
    navigate("/Dashboard/Zoom-meetings");  
  };

  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Zoom Meeting</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Zoom Meeting</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
              <button
                  onClick={goToCalendar}  
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
                >
                  <CiCalendarDate />
                </button>
                <button
                  onClick={toggleModal}
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Create"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      {isModalOpen && <ZoomMeetingModal onClose={toggleModal} />}
    </div>
  );
};

export default MeetingHeader;

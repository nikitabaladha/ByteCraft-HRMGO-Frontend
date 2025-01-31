import React from "react";

const CalenderModal = ({ onClose, popupData }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Event Date: {popupData?.date}</h4>
        <ul>
          {popupData?.events?.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CalenderModal;

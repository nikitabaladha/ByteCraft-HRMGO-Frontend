import React from "react";

import { TbReport } from "react-icons/tb";
import { TbSum } from "react-icons/tb";
import { TbFileReport } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdAlarm } from "react-icons/io";

import { formatDuration } from "../../../../../js/custom";

const AttendanceReport = ({ counts, duration }) => {
  const cardData = [
    {
      icon: <TbReport />,
      bgColor: "bg-primary",
      title: "Report",
      subtitle: "Attendance Summary",
      hiddenValue: "",
    },
    {
      icon: <TbSum />,
      bgColor: "bg-secondary",
      title: "Duration",
      subtitle: formatDuration(duration),
    },
    {
      icon: <TbFileReport />,
      bgColor: "bg-primary",
      title: "Attendance",
      content: [
        `Total present: ${counts.present}`,
        `Total absent: ${counts.absent}`,
      ],
    },
    {
      icon: <FaRegClock />,
      bgColor: "bg-secondary",
      title: "Overtime",
      content: [`Total overtime in hours : ${counts.overtime}`],
    },
    {
      icon: <BsInfoCircle />,
      bgColor: "bg-primary",
      title: "Early leave",
      content: [`Total early leave in hours : ${counts.earlyLeave}`],
    },
    {
      icon: <IoMdAlarm />,
      bgColor: "bg-secondary",
      title: "Employee late",
      content: [`Total late in hours : ${counts.late}`],
    },
  ];
  return (
    <div id="printableArea">
      {/* First row */}
      <div className="row">
        {cardData.slice(0, 2).map((card, index) => (
          <div key={index} className="col">
            <div className="card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className={`theme-avtar ${card.bgColor}`}>
                      {card.icon}
                    </div>
                    <div className="ms-3">
                      {card.hiddenValue && (
                        <input
                          type="hidden"
                          defaultValue={card.hiddenValue}
                          id="filename"
                        />
                      )}
                      <h5 className="mb-0">{card.title}</h5>
                      <p className="text-muted text-sm mb-0">{card.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Second row */}
      <div className="row">
        {cardData.slice(2).map((card, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            <div className="card mon-card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className={`theme-avtar ${card.bgColor}`}>
                      {card.icon}
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">{card.title}</h5>
                      {card.content &&
                        card.content.map((item, idx) => (
                          <p key={idx} className="text-muted text-sm mb-0">
                            {item}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceReport;

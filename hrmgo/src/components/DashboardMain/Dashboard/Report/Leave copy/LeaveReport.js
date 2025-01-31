// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\Leave\LeaveReport.js

import React from "react";
import {
  TbReport,
  TbCircleCheck,
  TbCircleX,
  TbCircleMinus,
} from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

const cardData = [
  {
    id: 1,
    icon: <TbReport />,
    backgroundColor: "bg-primary",
    title: "Report",
    subtitle: "Monthly Leave Summary",
    isLarge: true,
  },
  {
    id: 2,
    icon: <CiCalendarDate />,
    backgroundColor: "bg-secondary",
    title: "Duration",
    subtitle: "Nov-2024",
    isLarge: true,
  },
  {
    id: 3,
    icon: <TbCircleCheck />,
    backgroundColor: "bg-primary",
    title: "Approved Leaves",
    subtitle: "3",
    isLarge: false,
  },
  {
    id: 4,
    icon: <TbCircleX />,
    backgroundColor: "bg-secondary",
    title: "Rejected Leave",
    subtitle: "4",
    isLarge: false,
  },
  {
    id: 5,
    icon: <TbCircleMinus />,
    backgroundColor: "bg-primary",
    title: "Pending Leaves",
    subtitle: "5",
    isLarge: false,
  },
];

const Card = ({ icon, backgroundColor, title, subtitle, isLarge }) => (
  <div className={`col-md-${isLarge ? 6 : 4} col-lg-${isLarge ? 6 : 4}`}>
    <div className="card">
      <div className="card-body p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <div className={`theme-avtar ${backgroundColor}`}>{icon}</div>
            <div className="ms-3">
              <h5 className="mb-0">{title}</h5>
              <p className="text-muted text-sm mb-0">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LeaveReport = () => {
  return (
    <div id="printableArea">
      <div className="row">
        {cardData.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            backgroundColor={card.backgroundColor}
            title={card.title}
            subtitle={card.subtitle}
            isLarge={card.isLarge}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaveReport;

import React from "react";
import {
  TbReport,
  TbCircleCheck,
  TbCircleX,
  TbCircleMinus,
} from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

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

const LeaveReport = ({ leaveData }) => {
  console.log("leave report ", leaveData);
  const earliestStartDate = leaveData
    .flatMap((employee) =>
      employee.leaves.map((leave) => new Date(leave.startDate))
    )
    .sort((a, b) => a - b)[0];

  // Calculate counts
  const leaveCounts = leaveData.reduce(
    (acc, employee) => {
      employee.leaves.forEach((leave) => {
        acc[leave.status] = (acc[leave.status] || 0) + 1;
      });
      return acc;
    },
    { Approved: 0, Rejected: 0, Pending: 0 }
  );

  // Prepare card data
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
      subtitle: earliestStartDate
        ? earliestStartDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })
        : "",
      isLarge: true,
    },
    {
      id: 3,
      icon: <TbCircleCheck />,
      backgroundColor: "bg-primary",
      title: "Approved Leaves",
      subtitle: leaveCounts.Approved.toString(),
      isLarge: false,
    },
    {
      id: 4,
      icon: <TbCircleX />,
      backgroundColor: "bg-secondary",
      title: "Rejected Leave",
      subtitle: leaveCounts.Rejected.toString(),
      isLarge: false,
    },
    {
      id: 5,
      icon: <TbCircleMinus />,
      backgroundColor: "bg-primary",
      title: "Pending Leaves",
      subtitle: leaveCounts.Pending.toString(),
      isLarge: false,
    },
  ];

  return (
    <>
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
    </>
  );
};

export default LeaveReport;

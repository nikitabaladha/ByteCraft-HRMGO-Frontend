import React from "react";

import { TbUsers } from "react-icons/tb";
import { LuWallet } from "react-icons/lu";
import { LuTicket } from "react-icons/lu";

import { LuBriefcaseBusiness } from "react-icons/lu";

const DashboardMetrics = () => {
  const metrics = [
    {
      icon: <TbUsers />,
      title: "Staff",
      value: 24,
      color: "primary",
      link: "/staff",
    },
    {
      icon: <LuTicket />,
      title: "Ticket",
      value: 9,
      color: "info",
      link: "/tickets",
    },
    {
      icon: <LuWallet />,
      title: "Account Balance",
      value: "$2,045,619.00",
      color: "warning",
    },
    {
      icon: <LuBriefcaseBusiness />,
      title: "Jobs",
      value: 4,
      color: "primary",
      link: "/jobs",
    },
    {
      icon: (
        <img
          src="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/active.svg"
          alt="Active Jobs"
          width="25"
          height="25"
        />
      ),
      title: "Active Jobs",
      value: 4,
      color: "info",
      link: "/active-jobs",
    },
    {
      icon: (
        <img
          src="https://demo.workdo.io/hrmgo/storage/uploads/job/icons/inactive.svg"
          alt="Inactive Jobs"
          width="20"
          height="20"
        />
      ),
      title: "Inactive Jobs",
      value: 0,
      color: "warning",
      link: "/inactive-jobs",
    },
  ];

  return (
    <div className="row">
      <div className="col-xxl-12">
        <div className="row">
          {metrics.map((metric, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between">
                    <div className="col-auto mb-3 mb-sm-0">
                      <div className="d-flex align-items-center">
                        <div className={`theme-avtar bg-${metric.color}`}>
                          {metric.icon}
                        </div>
                        <div className="ms-3">
                          <small className="text-muted">Total</small>
                          <h6 className="m-0">{metric.title}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto text-end">
                      {metric.title === "Account Balance" ? (
                        <h6 className={`m-0 text-${metric.color}`}>
                          {metric.value}
                        </h6>
                      ) : (
                        <h4 className={`m-0 text-${metric.color}`}>
                          {metric.value}
                        </h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;

import React from "react";
import { TbReport, TbSitemap, TbLayoutList } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

const data = [
  {
    type: "card",
    icon: <TbReport />,
    bgColor: "bg-primary",
    title: "Report",
    subtitle: "Account Statement Summary",
  },
  {
    type: "card",
    icon: <TbSitemap />,
    bgColor: "bg-secondary",
    title: "Transaction Type",
    subtitle: "Income",
  },
  {
    type: "card",
    icon: <CiCalendarDate />,
    bgColor: "bg-primary",
    title: "Duration",
    subtitle: "Nov-2024 to Jun-2024",
  },
  {
    type: "transaction",
    icon: <TbLayoutList />,
    bgColor: "bg-primary",
    title: "Benjamin Adams",
    subtitle: "Total Credit: $1,600.00",
  },
  {
    type: "transaction",
    icon: <TbLayoutList />,
    bgColor: "bg-primary",
    title: "Chisom Latifat",
    subtitle: "Total Credit: $12,000.00",
  },
  {
    type: "transaction",
    icon: <TbLayoutList />,
    bgColor: "bg-primary",
    title: "Earl Hane MD",
    subtitle: "Total Credit: $500.00",
  },
];

const AccountStatementReport = () => {
  return (
    <div id="printableArea">
      <div className="row">
        {data.map((item, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <div className="card">
              <div className="card-body p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className={`theme-avtar ${item.bgColor}`}>
                      {item.icon}
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-0">{item.title}</h5>
                      <p className="text-muted text-sm mb-0">{item.subtitle}</p>
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

export default AccountStatementReport;

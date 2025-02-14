import React from "react";
import { TbReport, TbSitemap, TbLayoutList } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

const AccountStatementReport = ({
  transactions,
  startMonth,
  endMonth,
  type,
}) => {
  const currentMonth =
    new Date().toLocaleString("default", { month: "short" }) +
    "-" +
    new Date().getFullYear();
  const displayStartMonth = startMonth || currentMonth;
  const displayEndMonth = endMonth || currentMonth;

  const data = transactions
    .map((account) => ({
      accountName: account.account_name,
      totalIncome: account.totalIncome,
      totalExpense: account.totalExpense,
    }))
    .filter(
      (account) => account.totalIncome !== 0 || account.totalExpense !== 0
    );

  const summaryData = [
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
      subtitle: type || "Income",
    },
    {
      type: "card",
      icon: <CiCalendarDate />,
      bgColor: "bg-primary",
      title: "Duration",
      subtitle: `${displayStartMonth} to ${displayEndMonth}`,
    },
    ...data.map((account) => ({
      type: "transaction",
      icon: <TbLayoutList />,
      bgColor: "bg-primary",
      title: account.accountName,
      subtitle:
        type === "expense"
          ? `Total Debit: ₹${account.totalExpense.toLocaleString("en-IN")}`
          : `Total Credit: ₹${account.totalIncome.toLocaleString("en-IN")}`,
    })),
  ];

  return (
    <div id="printableArea">
      <div className="row">
        {summaryData.map((item, index) => (
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

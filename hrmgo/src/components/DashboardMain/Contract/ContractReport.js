import React, { useEffect, useState } from "react";
import { formatCost } from "../../../Js/custom";

const ContractReport = ({
  totalValue,
  totalValueOfThisMonth,
  totalValueOfThisWeek,
  last30DaysValue,
}) => {
  const [contractData, setContractData] = useState([]);

  useEffect(() => {
    // Update the contractData whenever the props change
    setContractData([
      {
        title: "Total Contracts",
        value: totalValue,
        textClass: "text-primary",
        badgeClass: "bg-success",
        iconClass: "fas fa-handshake text-white",
      },
      {
        title: "This Month Total Contracts",
        value: totalValueOfThisMonth,
        textClass: "text-info",
        badgeClass: "bg-info",
        iconClass: "fas fa-handshake text-white",
      },
      {
        title: "This Week Total Contracts",
        value: totalValueOfThisWeek,
        textClass: "text-warning",
        badgeClass: "bg-warning",
        iconClass: "fas fa-handshake text-white",
      },
      {
        title: "Last 30 Days Total Contracts",
        value: last30DaysValue,
        textClass: "text-danger",
        badgeClass: "danger",
        iconClass: "fas fa-handshake text-white",
      },
    ]);
  }, [
    totalValue,
    totalValueOfThisMonth,
    totalValueOfThisWeek,
    last30DaysValue,
  ]);

  return (
    <>
      {contractData.map((data, index) => (
        <div className="col-xl-3 col-6" key={index}>
          <div className="card comp-card">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h6 className="m-b-20">{data.title}</h6>
                  <h3 className={data.textClass}> {formatCost(data.value)}</h3>
                </div>
                <div className={`badge theme-avtar ${data.badgeClass}`}>
                  <i className={data.iconClass} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContractReport;

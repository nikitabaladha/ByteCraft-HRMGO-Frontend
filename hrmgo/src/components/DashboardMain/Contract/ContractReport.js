import React, { useState } from "react";

const ContractReport = () => {
  // Dynamic data for the cards
  const [contractData, setContractData] = useState([
    {
      title: "Total Contracts",
      value: 19565.0,
      textClass: "text-primary",
      badgeClass: "bg-success",
      iconClass: "fas fa-handshake text-white",
    },
    {
      title: "This Month Total Contracts",
      value: 1116.0,
      textClass: "text-info",
      badgeClass: "bg-info",
      iconClass: "fas fa-handshake text-white",
    },
    {
      title: "This Week Total Contracts",
      value: 1000.0,
      textClass: "text-warning",
      badgeClass: "bg-warning",
      iconClass: "fas fa-handshake text-white",
    },
    {
      title: "Last 30 Days Total Contracts",
      value: 19525.0,
      textClass: "text-danger",
      badgeClass: "danger",
      iconClass: "fas fa-handshake text-white",
    },
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
                  <h3 className={data.textClass}>${data.value.toFixed(2)}</h3>
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

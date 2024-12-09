import React from "react";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const ContractDetailCard = ({ contractData }) => {
  if (!contractData) {
    return <p>Loading contract details card...</p>;
  }

  return (
    <>
      <div className="col-xxl-5">
        <div className="card report_card total_amount_card">
          <div className="card-body pt-0 ">
            <address className="mb-0 text-sm">
              <div className="row mt-3 align-items-center">
                <h6>Contract Detail</h6>
                <div className="col-sm-4 h6 text-sm">Employee Name</div>
                <div className="col-sm-8 text-sm">
                  {" "}
                  {contractData.employeeName || "N/A"}{" "}
                </div>
                <div className="col-sm-4 h6 text-sm">Subject</div>
                <div className="col-sm-8 text-sm">
                  {" "}
                  {contractData.subject || "N/A"}
                </div>
                <div className="col-sm-4 h6 text-sm"> Type</div>
                <div className="col-sm-8 text-sm">
                  {contractData.contractType || "N/A"}
                </div>
                <div className="col-sm-4 h6 text-sm">Value</div>
                <div className="col-sm-8 text-sm">
                  {" "}
                  ₹{contractData.value || "0.00"}
                </div>
                <div className="col-sm-4 h6 text-sm">Start Date</div>
                <div className="col-sm-8 text-sm">
                  {" "}
                  {formatDate(contractData.startDate) || "N/A"}
                </div>
                <div className="col-sm-4 h6 text-sm">End Date</div>
                <div className="col-sm-8 text-sm">
                  {formatDate(contractData.endDate) || "N/A"}
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailCard;

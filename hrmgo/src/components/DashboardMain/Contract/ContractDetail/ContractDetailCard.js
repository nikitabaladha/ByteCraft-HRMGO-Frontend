import React from "react";

const ContractDetailCard = () => {
  return (
    <>
      <div className="col-xxl-5">
        <div className="card report_card total_amount_card">
          <div className="card-body pt-0 ">
            <address className="mb-0 text-sm">
              <div className="row mt-3 align-items-center">
                <h6>Contract Detail</h6>
                <div className="col-sm-4 h6 text-sm">Employee Name</div>
                <div className="col-sm-8 text-sm"> Julie Lynn </div>
                <div className="col-sm-4 h6 text-sm">Subject</div>
                <div className="col-sm-8 text-sm"> At nostrum laboriosa</div>
                <div className="col-sm-4 h6 text-sm"> Type</div>
                <div className="col-sm-8 text-sm">Marketing</div>
                <div className="col-sm-4 h6 text-sm">Value</div>
                <div className="col-sm-8 text-sm">$20.00</div>
                <div className="col-sm-4 h6 text-sm">Start Date</div>
                <div className="col-sm-8 text-sm">Nov 3, 2024</div>
                <div className="col-sm-4 h6 text-sm">End Date</div>
                <div className="col-sm-8 text-sm">Dec 20, 2024</div>
              </div>
            </address>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailCard;

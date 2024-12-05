import React from "react";

const ContractDetailInfoCard = () => {
  return (
    <>
      {" "}
      <div className="col-xl-7">
        <div className="row">
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-primary">
                  <i className="ti ti-user-plus" />
                </div>
                <h6 className="mb-3 mt-4">Attachment</h6>
                <h3 className="mb-0">1</h3>
                <h3 className="mb-0" />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-info">
                  <i className="ti ti-click" />
                </div>
                <h6 className="mb-3 mt-4">Comment</h6>
                <h3 className="mb-0">2</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-warning">
                  <i className="ti ti-file" />
                </div>
                <h6 className="mb-3 mt-4 ">Notes</h6>
                <h3 className="mb-0">2</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailInfoCard;

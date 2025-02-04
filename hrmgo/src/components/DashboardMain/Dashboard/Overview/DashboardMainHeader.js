import React from "react";

const DashboardMainHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Dashboard</h4>
              </div>
              <ul className="breadcrumb"></ul>
            </div>
            <div className="col">
              <div className="float-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMainHeader;

import React from "react";

const AwardHeader = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Award</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://demo.workdo.io/hrmgo/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Award</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <a
                  href="#"
                  data-url="https://demo.workdo.io/hrmgo/award/create"
                  data-ajax-popup="true"
                  data-title="Create New Award"
                  data-size="lg"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <i className="ti ti-plus" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwardHeader;

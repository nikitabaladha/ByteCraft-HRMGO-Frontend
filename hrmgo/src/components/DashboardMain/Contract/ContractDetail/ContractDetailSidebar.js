import React from "react";

const ContractDetailSidebar = () => {
  return (
    <>
      {" "}
      <div className="col-xl-3">
        <div className="card sticky-top" style={{ top: 30 }}>
          <div className="list-group list-group-flush" id="useradd-sidenav">
            <a
              href="#general"
              className="list-group-item list-group-item-action border-0"
            >
              General{" "}
              <div className="float-end">
                <i className="ti ti-chevron-right" />
              </div>
            </a>
            <a
              href="#attachments"
              className="list-group-item list-group-item-action border-0"
            >
              Attachment{" "}
              <div className="float-end">
                <i className="ti ti-chevron-right" />
              </div>
            </a>
            <a
              href="#comment"
              className="list-group-item list-group-item-action border-0"
            >
              Comment{" "}
              <div className="float-end">
                <i className="ti ti-chevron-right" />
              </div>
            </a>
            <a
              href="#notes"
              className="list-group-item list-group-item-action border-0"
            >
              Notes{" "}
              <div className="float-end">
                <i className="ti ti-chevron-right" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailSidebar;

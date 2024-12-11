import React from "react";
import { Link } from "react-router-dom";

const ContractDetailSidebar = ({ handleScrollToSection }) => {
  return (
    <div className="col-xl-3">
      <div className="card sticky-top" style={{ top: 30 }}>
        <div className="list-group list-group-flush" id="useradd-sidenav">
          <Link
            to="#"
            className="list-group-item list-group-item-action border-0"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("general");
            }}
          >
            General
            <div className="float-end">
              <i className="ti ti-chevron-right" />
            </div>
          </Link>
          <Link
            to="#"
            className="list-group-item list-group-item-action border-0"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("attachments");
            }}
          >
            Attachment
            <div className="float-end">
              <i className="ti ti-chevron-right" />
            </div>
          </Link>
          <Link
            to="#"
            className="list-group-item list-group-item-action border-0"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("comments");
            }}
          >
            Comment
            <div className="float-end">
              <i className="ti ti-chevron-right" />
            </div>
          </Link>
          <Link
            to="#"
            className="list-group-item list-group-item-action border-0"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("notes");
            }}
          >
            Notes
            <div className="float-end">
              <i className="ti ti-chevron-right" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailSidebar;

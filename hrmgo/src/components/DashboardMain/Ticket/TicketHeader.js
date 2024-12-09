//components/DashboardMain/Report/Employee/EmployeeHeader.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { TbFileExport } from "react-icons/tb";
// import { CiFileOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import CreateTicketModal from "./CreateTicketModal"; 

const TicketHeader = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Ticket</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Manage Ticket</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  // to="/ticket/create"
                  data-title="Create New Ticket"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                  onClick={openModal}
                >
                  <FiPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
        <CreateTicketModal closeModal={closeModal} /> // Updated modal reference
      )}
      </div>
    </>
  );
};

export default TicketHeader;

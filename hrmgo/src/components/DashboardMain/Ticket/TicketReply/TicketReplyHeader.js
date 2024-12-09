import React, { useState } from "react";
import { Link } from 'react-router-dom'; 
import { useParams } from 'react-router-dom';// Import Link component
import { HiOutlinePencil } from "react-icons/hi";
import EditTicketModal from "./EditTicketModal"; 

const TicketReplyHeader = () => {
  const [showModal, setShowModal] = useState(false); 
  const { ticketId } = useParams(); 
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Ticket Reply</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link> {/* Update with proper route */}
                </li>
                <li className="breadcrumb-item">
                  <Link to="/Dashboard/ticket">Ticket</Link> {/* Update with proper route */}
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Ticket Reply
                </li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <div className="float-end">
                  <Link
                    // href="#"
                    data-size="lg"
                    // data-url="https://demo.workdo.io/hrmgo/ticket/1/edit"
                    data-ajax-popup="true"
                    data-bs-toggle="tooltip"
                    title=""
                    data-title="Edit Ticket"
                    className="btn btn-sm btn-info"
                    data-bs-original-title="Edit"
                    onClick={openModal}
                  >
                       <HiOutlinePencil />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditTicketModal closeModal={closeModal} ticketId={ticketId} /> 
      )}
    </div>
  );
};

export default TicketReplyHeader;

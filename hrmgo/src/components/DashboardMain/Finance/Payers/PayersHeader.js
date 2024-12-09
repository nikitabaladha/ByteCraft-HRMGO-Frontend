import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import CreatePayerModal from "./CreatePayerModal"; // Updated modal component import

const PayersHeader = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Payer</h4> {/* Updated heading */}
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Payer</li> {/* Updated breadcrumb */}
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  title="Create"
                  onClick={openModal} // Open modal on click
                >
                  <TiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render CreatePayerModal when showModal is true */}
      {showModal && (
        <CreatePayerModal closeModal={closeModal} /> // Updated modal reference
      )}
    </div>
  );
};

export default PayersHeader;

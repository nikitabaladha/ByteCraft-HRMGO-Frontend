import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import CreateAwardTypeModal from "./CreateAwardTypeModal";

const AwardTypeHeader = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Award Type</h4> 
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Award Type</li> 
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  onClick={openModal}
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title="Create"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <CreateAwardTypeModal closeModal={closeModal} />} 
    </>
  );
};

export default AwardTypeHeader;

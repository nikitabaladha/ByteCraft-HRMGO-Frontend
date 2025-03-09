import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
import CreateLoanOptionModal from "./CreateLoanOptionModal";

const LoanOptionHeader = ({fetchLoanOptions}) => {
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
                <h4 className="m-b-10">Manage Loan Option</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="https/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark">Loan Option</li>
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
                  {/* <FiPlus /> */}
                  <i className="ti ti-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <CreateLoanOptionModal closeModal={closeModal} fetchLoanOptions={fetchLoanOptions}/>}
    </>
  );
};

export default LoanOptionHeader;

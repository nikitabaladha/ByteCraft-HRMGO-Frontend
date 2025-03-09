import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { TiPlus } from "react-icons/ti";
import CreatePayeeModal from "./CreatePayeeModal"; 

const PayeesHeader = ({fetchPayees}) => {
  const [showModal, setShowModal] = useState(false); 

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Payee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark">Payee</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  title="Create"
                  onClick={openModal} 
                >
                  {/* <TiPlus /> */}
                  <i className="ti ti-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

   
      {showModal && (
        <CreatePayeeModal closeModal={closeModal}    fetchPayees={fetchPayees} /> 
      )}
    </div>
  );
};

export default PayeesHeader;

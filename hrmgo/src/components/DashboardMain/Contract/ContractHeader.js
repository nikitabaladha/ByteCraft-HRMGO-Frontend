import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import CreateContractModal from "./CreateContractModal";

const ContractHeader = ({ addContract }) => {
  const [isCreateContractModalOpen, setIsCreateContractModalOpen] =
    useState(false);

  const openModal = () => {
    setIsCreateContractModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateContractModalOpen(false);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Contract</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Contract</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <div className="row align-items-center m-1">
                  <Link
                    data-size="lg"
                    data-ajax-popup="true"
                    data-bs-toggle="tooltip"
                    title="Create"
                    data-title="Create New Contract"
                    className="btn btn-sm btn-primary"
                    onClick={openModal}
                  >
                    <FaPlus />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateContractModalOpen && (
        <CreateContractModal onClose={closeModal} addContract={addContract} />
      )}
    </>
  );
};

export default ContractHeader;

import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import AppraisalCreateModal from "./AppraisalCreateModal";

const AppraisalHeader = () => {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Appraisal</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="">Home</Link>
                </li>
                <li className="breadcrumb-item">Appraisal</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <button
                  onClick={openModal}
                  data-ajax-popup="true"
                  data-size="lg"
                  data-title="Create New
                  Appraisal"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn
                  btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <AppraisalCreateModal closeModal={closeModal} />}
    </>
  );
};

export default AppraisalHeader;

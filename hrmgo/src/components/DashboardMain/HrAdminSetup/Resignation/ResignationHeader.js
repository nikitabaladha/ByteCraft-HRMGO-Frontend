import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import CreateResignationModal from "./CreateResignationModal";

const ResignationHeader = ({ addResignation }) => {
  const [isCreateResignationModalOpen, setIsCreateResignationModalOpen] =
    useState(false);

  const openModal = () => {
    setIsCreateResignationModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateResignationModalOpen(false);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Resignation</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Resignation</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  data-ajax-popup="true"
                  data-title="Create New Resignation"
                  data-size="lg"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                  onClick={openModal}
                >
                  <FaPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateResignationModalOpen && (
        <CreateResignationModal
          onClose={closeModal}
          addResignation={addResignation}
        />
      )}
    </>
  );
};

export default ResignationHeader;

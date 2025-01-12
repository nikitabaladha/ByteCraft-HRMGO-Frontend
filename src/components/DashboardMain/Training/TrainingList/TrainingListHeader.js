import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import TrainingListCreateModel from "./TrainingListCreateModel";

const TrainingListHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Training</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Training List</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <a
                  href="https://demo.workdo.io/hrmgo/export/training"
                  className="btn btn-sm btn-primary me-1"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport className="text-white" />
                </a>

                <button
                  onClick={handleModalOpen}
                  className="btn btn-sm btn-primary "
                  data-bs-toggle="tooltip"
                  title="Create New Training"
                >
                  <FiPlus className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <TrainingListCreateModel onClose={handleModalClose} />}
    </>
  );
};

export default TrainingListHeader;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { FiPlus } from "react-icons/fi";
import TrainingListCreateModel from "./TrainingListCreateModel";
import * as XLSX from "xlsx";

const TrainingListHeader = ({ fetchTrainings, trainings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTrainings();
    setIsModalOpen(false);
  };

  const handleExportToExcel = () => {
    if (!trainings || trainings.length === 0) {
      alert("No data available to export!");
      return;
    }

    const formattedData = trainings.map((training, index) => ({
      ID: index + 1,  
      Branch: training.branch,
      "Trainer Option": training.trainer,
      "Trainer Type": training.trainingType,
      Trainer: training.trainer,
      "Training Cost": training.trainingCost,
      Employee: training.employee,
      "Start date": new Date(training.startDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
        "End date": new Date(training.endDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      Status: training.status,
       }));
    

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "trainings");
    XLSX.writeFile(workbook, "trianings.xlsx");
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
                  onClick={handleExportToExcel}
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

      {isModalOpen && (
        <TrainingListCreateModel
        isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleSubmit}
          fetchTrainings={fetchTrainings}
        />
      )}
    </>
  );
};

export default TrainingListHeader;

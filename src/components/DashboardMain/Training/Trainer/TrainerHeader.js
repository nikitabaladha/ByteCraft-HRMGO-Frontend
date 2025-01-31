import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbFileExport } from "react-icons/tb";
import { CiFileOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import TrainerEditModal from './TrainerEditModel';
import * as XLSX from "xlsx";

const TrainerHeader = ({fetchTrainers, trainers}) => {

  const [showModal, setShowModal] = useState(false);

  const handleCreateClick = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTrainers();
    setShowModal(false);
  };

  const handleExportToExcel = () => {
      if (!trainers || trainers.length === 0) {
        alert("No data available to export!");
        return;
      }
  
      const formattedData = trainers.map((trainerss, index) => ({
        ID: index + 1,  
        Branch: trainerss.branch,
        "First Name": trainerss.firstName,
        "Last Name": trainerss.lastName,
        "Contact Number": trainerss.contactNumber,
        Email: trainerss.email,
        Experience: trainerss.expertise,
        Address: trainerss.address,
         }));
      
  
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "trainers");
      XLSX.writeFile(workbook, "trianers.xlsx");
    };
  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Trainer</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Trainer</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <Link
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-original-title="Export"
                  className="btn btn-sm btn-primary me-1"
                  onClick={handleExportToExcel}
                >
                   <TbFileExport />
                </Link>

                <Link
                  to="/"
                  data-url="https://demo.workdo.io/hrmgo/import/training/file"
                  data-ajax-popup="true"
                  data-title="Import  employee CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary me-1"
                  data-bs-original-title="Import"
                >
                  <CiFileOn />
                </Link>
                 <Link
                  // to="https://demo.workdo.io/hrmgo/trainer/create"
                  onClick={handleCreateClick}
                  data-title="Create New Employee"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FiPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
        <TrainerEditModal onClose={handleCloseModal}  onSubmit={handleSubmit}
        fetchTrainers={fetchTrainers} />
      )}
      </div>
      
  );
};

export default TrainerHeader;


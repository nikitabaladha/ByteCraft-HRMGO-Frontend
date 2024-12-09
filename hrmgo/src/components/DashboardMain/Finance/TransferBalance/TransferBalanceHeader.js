import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TbFileExport } from "react-icons/tb";
import TransferBalanceModal from "./TransferBalanceModal"; // Import the modal

const TransferBalanceHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExportToExcel = () => {
    // Add your export logic here
  };

  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Transfer Balance</h4> {/* Updated title */}
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Transfer Balance</li> {/* Updated breadcrumb */}
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title="Export"
                  onClick={handleExportToExcel} // Call the export function
                >
                  <TbFileExport />
                </button>

                <button
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title="Create"
                  onClick={handleOpenModal}
                >
                  <TiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the Modal */}
      <TransferBalanceModal isOpen={isModalOpen} onClose={handleCloseModal} /> {/* Updated modal */}
    </div>
  );
};

export default TransferBalanceHeader;

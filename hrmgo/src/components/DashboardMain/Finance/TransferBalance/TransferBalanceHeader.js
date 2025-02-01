import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TbFileExport } from "react-icons/tb";
import TransferBalanceModal from "./TransferBalanceModal"; 
import * as XLSX from "xlsx"; 
import getAPI  from "../../../../api/getAPI"; 

const TransferBalanceHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [TransferBalance, setTransferBalance] = useState([]);


useEffect(() => {
  const fetchTransferBalance = async () => {
    try {
      const response = await getAPI("/getall_transferbalance", {}, true);  
      setTransferBalance(response.data.data);  
    } catch (err) {
      console.error("Failed to fetch transfer balance", err); 
    }
  };

  fetchTransferBalance();
}, []);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExportToExcel = () => {
    if (!TransferBalance || TransferBalance.length === 0) {
      alert("No data available to export!");
      return;
    }
    const formattedData = TransferBalance.map((transfer, index) => ({
      ID: index + 1,  
      "From Account": transfer.fromAccountId,
      "To Account": transfer.toAccountId,
      Date: new Date(transfer.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      Amount: transfer.amount,
      "Payment Type": transfer.paymentTypeId,
      "Referral Id": transfer.referalId,
      Description: transfer.description,
    }));
    
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TransferBalance");
    XLSX.writeFile(workbook, "TransferBalance.xlsx");
    
  };

  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Transfer Balance</h4> 
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Transfer Balance</li> 
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  className="btn btn-sm btn-primary me-2"
                  data-bs-toggle="tooltip"
                  title="Export"
                  onClick={handleExportToExcel} 
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

      <TransferBalanceModal isOpen={isModalOpen} onClose={handleCloseModal} /> 
    </div>
  );
};

export default TransferBalanceHeader;

import React, { useState, useEffect } from "react";
import { TiPlus } from "react-icons/ti";
import { TbFileExport } from "react-icons/tb";
import DepositModal from "./DepositModal";
import * as XLSX from "xlsx";
import getAPI  from "../../../../api/getAPI"; 

const DepositHeader = () => {
  const [deposits, setDeposits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await getAPI("/getall_deposit", {}, true);
        setDeposits(response.data.data); 
      } catch (err) {
        console.error("Failed to fetch deposits", err); 
      }
    };

    fetchDeposits();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExportToExcel = () => {
    if (!deposits || deposits.length === 0) {
      alert("No data available to export!");
      return;
    }

    const formattedData = deposits.map((deposit, index) => ({
      ID: index + 1,  
      "Account Name": deposit.account_name,
      Amount: deposit.amount,
      Date: new Date(deposit.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      "Income Category": deposit.category,
      Payer: deposit.payer_name,
      "Payment Type": deposit.payment_type,
      "Referral Id": deposit.ref,
      Description: deposit.description,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Deposits");
    XLSX.writeFile(workbook, "Deposits.xlsx");
  };

  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Deposit</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Deposit</li>
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

      <DepositModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DepositHeader;

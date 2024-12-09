import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TbFileExport } from "react-icons/tb";
import ExpenseModal from "./ExpenseModal"; // Import the modal
import * as XLSX from "xlsx"; // Import xlsx for Excel export

const ExpenseHeader = ({ expenses = [] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExportToExcel = () => {
    if (!expenses || expenses.length === 0) {
      alert("No data available to export!");
      return;
    }

    const formattedData = expenses.map((expense) => ({
      Account: expense.account_name,
      Payee: expense.payee_name,
      Amount: expense.amount,
      Category: expense.category,
      Ref: expense.ref,
      Payment: expense.payment_type,
      Date: new Date(expense.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Expense</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Expense</li>
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
      <ExpenseModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ExpenseHeader;

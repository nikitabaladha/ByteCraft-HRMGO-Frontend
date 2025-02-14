import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TbFileExport } from "react-icons/tb";
import ExpenseModal from "./ExpenseModal"; 
import * as XLSX from "xlsx"; 
import getAPI  from "../../../../api/getAPI"; 

const ExpenseHeader = () => {
const [expenses, setExpenses] = useState([]);
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const response = await getAPI("/getall_expense", {}, true); 
      setExpenses(response.data.data);  
    } catch (err) {
      console.error("Failed to fetch expenses", err); 
    }
  };

  fetchExpenses();
}, []);


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

    const formattedData = expenses.map((expense, index) => ({
      ID: index + 1,  
      "Account Name": expense.account_name,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      "Expense Category": expense.category,  
      Payee: expense.payee_name,
      "Payment Type": expense.payment_type,
      "Referral Id": expense.ref,
      Description: expense.description,
    }));
    

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
  };

  return (
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

      {/* Render the Modal */}
      <ExpenseModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ExpenseHeader;

//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpenseHeader.js

import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { TbFileExport } from "react-icons/tb";
import * as XLSX from "xlsx";

const AccountStatementHeader = ({ transactions }) => {
  const handleExportExcel = () => {
    if (transactions && transactions.length > 0) {
      const filteredTransactions = transactions.flatMap(({ transactions }) =>
        transactions.map(({ account_name, date, amount }) => ({
          account_name,
          date: new Date(date).toLocaleDateString("en-CA"),
          amount,
        }))
      );

      const formattedTransactions = filteredTransactions.map((transaction) => {
        return Object.keys(transaction).reduce((acc, key) => {
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          acc[capitalizedKey] = transaction[key];
          return acc;
        }, {});
      });

      const worksheet = XLSX.utils.json_to_sheet(formattedTransactions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Account Statement");
      XLSX.writeFile(workbook, "Account_Statement_Report.xlsx");
    } else {
      alert("No transactions available to export.");
    }
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Account Statement</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Account Statement Report</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  className="btn btn-sm btn-primary"
                  onclick="saveAsPDF()"
                  data-bs-toggle="tooltip"
                  title="Download"
                  data-original-title="Download"
                  style={{ marginRight: 5 }}
                >
                  <span className="btn-inner--icon">
                    <MdOutlineFileDownload />
                  </span>
                </Link>
                <Link
                  className="btn btn-sm btn-primary float-end"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                  onClick={handleExportExcel}
                >
                  <TbFileExport />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatementHeader;

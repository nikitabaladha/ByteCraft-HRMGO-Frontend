// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\IncomeVsExpense\IncomVsExpenseHeader.js
import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const IncomeVsExpenseHeader = () => {
  const saveAsPDF = async () => {
    const element = document.getElementById("printableArea");
    if (!element) {
      console.error("No element found with ID 'printableArea'.");
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 2 });

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvasWidth, canvasHeight],
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      pdf.save("IncomeVsExpenseReport.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Income Vs Expense</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  Manage Income Vs Expense Report
                </li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  onClick={saveAsPDF}
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Download"
                >
                  <span className="btn-inner--icon">
                    <MdOutlineFileDownload />
                    {/* i want to use this button and download pdf  */}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IncomeVsExpenseHeader;

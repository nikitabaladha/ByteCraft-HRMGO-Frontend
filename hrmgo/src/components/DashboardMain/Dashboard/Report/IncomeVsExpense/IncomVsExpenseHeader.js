import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineFileDownload } from "react-icons/md";

const IncomeVsExpenseHeader = () => {
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
                  to="/"
                  onclick="saveAsPDF()"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  title=""
                  data-bs-original-title="Download"
                >
                  <span className="btn-inner--icon">
                    <MdOutlineFileDownload />
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

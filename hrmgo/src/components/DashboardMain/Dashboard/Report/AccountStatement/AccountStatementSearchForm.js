//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpenseHeader.js

import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

const AccountStatementSearchForm = () => {
  return (
    <>
      <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
        <div className="mt-2 " id="">
          <div className="card">
            <div className="card-body">
              <form
                method="GET"
                action="/report/account-statement"
                acceptCharset="UTF-8"
                id="report_acc_filter"
              >
                <div className="d-flex align-items-center justify-content-end">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 month">
                    <div className="btn-box">
                      <label htmlFor="start_month" className="form-label">
                        Start Month
                      </label>
                      <input
                        className="month-btn form-control"
                        name="start_month"
                        type="month"
                        defaultValue="2024-11"
                        id="start_month"
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 month">
                    <div className="btn-box">
                      <label htmlFor="end_month" className="form-label">
                        End Month
                      </label>
                      <input
                        className="month-btn form-control"
                        name="end_month"
                        type="month"
                        defaultValue="2024-11"
                        id="end_month"
                      />
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 ">
                    <div className="btn-box">
                      <label htmlFor="account" className="form-label">
                        Account
                      </label>
                      <select
                        className=" form-control select"
                        id="account"
                        name="account"
                      >
                        <option value="" selected="selected">
                          All
                        </option>
                        <option value={1}>Benjamin Adams</option>
                        <option value={2}>Chisom Latifat</option>
                        <option value={3}>Earl Hane MD</option>
                        <option value={4}>Nora Price</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 ">
                    <div className="btn-box">
                      <label htmlFor="type" className="form-label">
                        Type
                      </label>
                      <select
                        className="form-control select"
                        id="type"
                        name="type"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-auto float-end ms-2 mt-4">
                    <Link
                      to="/"
                      className="btn btn-sm btn-primary"
                      onclick="document.getElementById('report_acc_filter').submit(); return false;"
                      data-bs-toggle="tooltip"
                      title="Apply"
                      data-original-title="apply"
                    >
                      <span className="btn-inner--icon">
                        <IoIosSearch />
                      </span>
                    </Link>
                    <Link
                      to="/report/account-statement"
                      className="btn btn-sm btn-danger "
                      data-bs-toggle="tooltip"
                      title="Reset"
                      data-original-title="Reset"
                    >
                      <span className="btn-inner--icon">
                        <MdOutlineDeleteForever />
                      </span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatementSearchForm;

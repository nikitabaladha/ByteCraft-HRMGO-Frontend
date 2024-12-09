//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpenseHeader.js

import React from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

const MonthlyAttendanceSearchForm = () => {
  return (
    <>
      <div className="col-sm-12">
        <div className=" mt-2 " id="multiCollapseExample1">
          <div className="card">
            <div className="card-body">
              <form
                method="GET"
                action="https://demo.workdo.io/hrmgo/report/monthly/attendance"
                acceptCharset="UTF-8"
                id="report_monthly_attendance"
              >
                <div className="row align-items-center justify-content-end">
                  <div className="col-xl-10">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box">
                          <label htmlFor="month" className="form-label">
                            {" "}
                            Month
                          </label>
                          <input
                            className="month-btn form-control current_date"
                            autoComplete="off"
                            placeholder="Select month"
                            name="month"
                            type="month"
                            defaultValue=""
                            id="month"
                          />
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box">
                          <label htmlFor="branch" className="form-label">
                            Branch
                          </label>
                          <select
                            className="form-control select branch_id"
                            id="branch-select branch_id"
                            name="branch_id"
                          >
                            <option value="" selected="selected">
                              All
                            </option>
                            <option value={1}>China</option>
                            <option value={2}>India</option>
                            <option value={3}>Canada</option>
                            <option value={4}>Greece</option>
                            <option value={5}>Italy</option>
                            <option value={6}>Japan</option>
                            <option value={7}>Malaysia</option>
                            <option value={8}>France</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box" id="department_div">
                          <label htmlFor="department" className="form-label">
                            Department
                          </label>
                          <select
                            className="form-control select department_id"
                            name="department"
                            id="department_id"
                            placeholder="Select Department"
                          ></select>
                        </div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box" id="employee_div">
                          <label htmlFor="employee" className="form-label">
                            Employee
                          </label>
                          <select
                            className="form-control select"
                            name="employee_id[]"
                            id="employee_id"
                            placeholder="Select Employee"
                          ></select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="row">
                      <div className="col-auto mt-4">
                        <Link
                          to="/"
                          className="btn btn-sm btn-primary"
                          onclick="document.getElementById('report_monthly_attendance').submit(); return false;"
                          data-bs-toggle="tooltip"
                          title="Apply"
                          data-original-title="apply"
                        >
                          <span className="btn-inner--icon">
                            <IoIosSearch />
                          </span>
                        </Link>
                        <Link
                          to="https://demo.workdo.io/hrmgo/report/monthly/attendance"
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

export default MonthlyAttendanceSearchForm;

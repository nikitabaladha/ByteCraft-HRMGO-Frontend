import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { TbRefresh } from "react-icons/tb";
// import { IoIosSearch } from "react-icons/io";

const IncomeVsExpenseSearchForm = ({ onSearch, onReset }) => {
  const [startMonth, setStartMonth] = useState("");
  const [endMonth, setEndMonth] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedMonth = today.toISOString().slice(0, 7);
    setStartMonth(formattedMonth);
    setEndMonth(formattedMonth);
  }, []);

  const handleSearch = () => {
    if (!startMonth || !endMonth) {
      toast.error("Please select both start and end months.");
      return;
    }
    onSearch(startMonth, endMonth);
  };

  const handleReset = (e) => {
    e.preventDefault();

    const today = new Date();
    const formattedMonth = today.toISOString().slice(0, 7);
    setStartMonth(formattedMonth);
    setEndMonth(formattedMonth);

    onReset();
  };

  return (
    <>
      <div className="col-sm-12">
        <div className="mt-2" id="multiCollapseExample1">
          <div className="card">
            <div className="card-body">
              <form
                method="GET"
                acceptCharset="UTF-8"
                id="report_income_expense"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="row align-items-center justify-content-end">
                  <div className="col-xl-10">
                    <div className="row">
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box"></div>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box"></div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box">
                          <label htmlFor="start_month" className="form-label">
                            Start Month
                          </label>
                          <input
                            className="month-btn form-control current_date"
                            autoComplete="off"
                            placeholder="Select start month"
                            name="start_month"
                            type="month"
                            value={startMonth}
                            id="start_month"
                            onChange={(e) => setStartMonth(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                        <div className="btn-box">
                          <label htmlFor="end_month" className="form-label">
                            End Month
                          </label>
                          <input
                            className="month-btn form-control current_date"
                            autoComplete="off"
                            placeholder="Select end month"
                            name="end_month"
                            type="month"
                            value={endMonth}
                            id="end_month"
                            onChange={(e) => setEndMonth(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="row">
                      <div className="col-auto mt-4">
                        <button
                          type="button"
                          className="btn btn-sm btn-primary mx-2"
                          onClick={handleSearch}
                          data-bs-toggle="tooltip"
                          title=""
                          data-bs-original-title="apply"
                        >
                          <span className="btn-inner--icon">
                            {/* <IoIosSearch /> */}
                            <i className="ti ti-search"></i>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          data-bs-toggle="tooltip"
                          title=""
                          data-bs-original-title="Reset"
                          onClick={handleReset}
                        >
                          <span className="btn-inner--icon">
                            {/* <TbRefresh /> */}
                            <i className="ti ti-refresh"></i>
                          </span>
                        </button>
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

export default IncomeVsExpenseSearchForm;

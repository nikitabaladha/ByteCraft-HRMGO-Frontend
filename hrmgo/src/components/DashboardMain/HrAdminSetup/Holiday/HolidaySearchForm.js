import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAPI from "../../../../api/getAPI";

const HolidaySearchForm = ({ onSearchResults, resetSearch }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setStartDate(formattedDate);
    setEndDate(formattedDate);
  }, []);

  const fetchData = async (startDate, endDate) => {
    try {
      const params = {};
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await getAPI(
        "/holiday-get-by-date",
        { params },
        true,
        true
      );

      const responseData = response.data.data;

      onSearchResults(responseData);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be later than end date.");
      return;
    }
    fetchData(startDate, endDate);
  };

  const handleReset = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10);
    setStartDate(formattedDate);
    setEndDate(formattedDate);

    resetSearch();
  };

  return (
    <>
        <div className="col-sm-12">
          <div className="mt-2" id="multiCollapseExample1">
            <div className="card">
              <div className="card-body">
                <form method="GET" acceptCharset="UTF-8" id="holiday_filter">
                <div className="row align-items-center justify-content-end">
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="start_date" className="form-label text-dark">
                          Start Date
                        </label>
                        <input
                          className="month-btn form-control current_date"
                          autoComplete="off"
                          name="startDate"
                          type="date"
                          defaultValue=""
                          id="start_date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="end_date" className="form-label text-dark">
                          End Date
                        </label>
                        <input
                          className="month-btn form-control current_date"
                          autoComplete="off"
                          name="endDate"
                          type="date"
                          defaultValue=""
                          id="end_date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="row">
                        <div className="col-auto mt-4">
                          <button
                            className="btn btn-sm btn-primary mx-2"
                            data-bs-toggle="tooltip"
                            title=""
                            data-bs-original-title="apply"
                            type="button"
                            onClick={handleSearch}
                          >
                            <span className="btn-inner--icon">
                              {/* <IoIosSearch /> */}
                              <i className="ti ti-search text-white"></i>
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
                              {/* <TbRefresh className="text-white-off " /> */}
                              <i className="ti ti-refresh text-white"></i>
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

export default HolidaySearchForm;

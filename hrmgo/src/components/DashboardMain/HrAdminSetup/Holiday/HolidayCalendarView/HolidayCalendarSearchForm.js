import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TbRefresh } from "react-icons/tb";
// import { IoIosSearch } from "react-icons/io";
import getAPI from "../../../../../api/getAPI";

const HolidayCalendarSearchForm = ({ onSearchResults }) => {
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
      if (responseData.length === 0) {
        toast.error("No Holidays found for the given criteria");
        onSearchResults([]);
      } else {
        onSearchResults(responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error(
        error.response?.data?.message ||
          "Error fetching data. Please try again later."
      );
      onSearchResults([]);
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

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
        <div className="mt-2" id="multiCollapseExample1">
          <div className="card">
            <div className="card-body">
              <form method="GET" acceptCharset="UTF-8" id="holiday_filter">
              <div className="row align-items-center justify-content-end">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <label htmlFor="start_date" className="form-label">
                        Start Date
                      </label>
                      <input
                        className="month-btn form-control current_date"
                        autoComplete="off"
                        name="start_date"
                        type="date"
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <label htmlFor="end_date" className="form-label">
                        End Date
                      </label>
                      <input
                        className="month-btn form-control current_date"
                        autoComplete="off"
                        name="end_date"
                        type="date"
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
                      className="btn btn-sm btn-primary me-2"
                      type="button"
                      onClick={handleSearch}
                    >
                      <span className="btn-inner--icon">
                        {/* <IoIosSearch /> */}
                        <i className="ti ti-search"></i>
                      </span>
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        onSearchResults([]);
                      }}
                    >
                      <span className="btn-inner--icon">
                        {/* <TbRefresh className="text-white-off " /> */}
                        <i className="ti ti-refresh text-white-off"></i>
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
      </div>
    </>
  );
};

export default HolidayCalendarSearchForm;

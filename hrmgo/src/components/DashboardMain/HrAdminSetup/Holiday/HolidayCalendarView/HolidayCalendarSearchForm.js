import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbRefresh } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
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

      onSearchResults(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data. Please try again later.");
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
      <ToastContainer autoClose={3000} />
      <div className="row">
        <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
          <div className="card">
            <div className="card-body">
              <form method="GET" acceptCharset="UTF-8" id="holiday_filter">
                <div className="d-flex align-items-center justify-content-end">
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                    <div className="btn-box">
                      <label htmlFor="start_date" className="form-label">
                        Start Date
                      </label>
                      <input
                        className="month-btn form-control current_date"
                        autoComplete="off"
                        name="start_date"
                        type="date"
                        defaultValue=""
                        id="start_date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                    <div className="btn-box">
                      <label htmlFor="end_date" className="form-label">
                        End Date
                      </label>
                      <input
                        className="month-btn form-control current_date"
                        autoComplete="off"
                        name="end_date"
                        type="date"
                        defaultValue=""
                        id="end_date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-auto float-end ms-2 mt-4">
                    <button
                      className="btn btn-sm btn-primary"
                      data-bs-toggle="tooltip"
                      title=""
                      data-bs-original-title="apply"
                      type="button"
                      onClick={handleSearch}
                    >
                      <span className="btn-inner--icon">
                        <IoIosSearch />
                      </span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      data-bs-toggle="tooltip"
                      title=""
                      data-bs-original-title="Reset"
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                        onSearchResults([]);
                      }}
                    >
                      <span className="btn-inner--icon">
                        <TbRefresh className="text-white-off " />
                      </span>
                    </button>
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

export default HolidayCalendarSearchForm;

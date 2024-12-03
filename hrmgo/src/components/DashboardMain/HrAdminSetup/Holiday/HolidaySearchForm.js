import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbRefresh } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import getAPI from "../../../../api/getAPI";

const HolidaySearchForm = ({ onSearchResults }) => {
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
      <div className="col-sm-12">
        <div className="mt-2" id="multiCollapseExample1">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="row align-items-center justify-content-end">
                  <div className="col-lg-3">
                    <label htmlFor="start_date" className="form-label">
                      Start Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      value={startDate}
                      id="start_date"
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-3">
                    <label htmlFor="end_date" className="form-label">
                      End Date
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      value={endDate}
                      id="end_date"
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleSearch}
                    >
                      <IoIosSearch />
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
                      <TbRefresh />
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

export default HolidaySearchForm;

import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
import { toast } from "react-toastify";
import { TbRefresh } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

const PayrollSearchForm = ({
  onDataFetched,
  onReset,
  selectedBranch,
  selectedDepartment,
  selectedMonth,
  selectedDate,
  searchType,
  setSelectedBranch,
  setSelectedDepartment,
  setSearchType,
  setSelectedMonth,
  setSelectedDate,
  setBranchName,
}) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const monthFormatted = `${currentDate.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}`;
    setSelectedMonth(monthFormatted);

    const formattedDate = currentDate.toISOString().split("T")[0];
    setSelectedDate(formattedDate);

    const currentYear = currentDate.getFullYear();
    const yearOptions = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      yearOptions.push(i);
    }
    setYears(yearOptions);

    setSelectedDate(currentYear.toString());
  }, [setSelectedDate, setSelectedMonth]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    if (branchId) {
      const fetchDepartmentByBranchId = async () => {
        try {
          const response = await getAPI(
            `/department-get-all-by-branch-id?branchId=${branchId}`,
            {},
            true,
            true
          );

          if (!response.hasError && Array.isArray(response.data.data)) {
            setDepartments(response.data.data);
            setBranchName(
              response.data.data.find(
                (department) => department._id === branchId
              )?.branchName || ""
            );
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching department data:", err);
        }
      };
      fetchDepartmentByBranchId();
    } else {
      setDepartments([]);
    }
  };

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching branch data:", err);
      }
    };
    fetchBranchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const date = searchType === "yearly" ? selectedDate : selectedMonth;

      if (!date) {
        toast.error("Date must be selected to view payroll data");
        return;
      }

      const response = await getAPI(
        `/payroll-get-all?branch=${selectedBranch}&department=${selectedDepartment}&date=${date}&type=${searchType}`,
        {},
        true,
        true
      );

      if (!response.hasError && Array.isArray(response.data.data)) {
        onDataFetched(response.data.data);
        console.log("Search Data", response.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching payroll data:", err);
    }
  };

  return (
    <div className="col-sm-12">
      <div className="mt-2" id="multiCollapseExample1">
        <div className="card">
          <div className="card-body">
            <form method="GET" onSubmit={handleSearch} acceptCharset="UTF-8">
              <div className="row align-items-center justify-content-end">
                <div className="col-xl-10">
                  <div className="row">
                    <div className="col-3">
                      <label className="form-label">Type</label> <br />
                      <div className="form-check form-check-inline form-group">
                        <input
                          type="radio"
                          id="monthly"
                          value="monthly"
                          name="type"
                          className="form-check-input"
                          checked={searchType === "monthly"}
                          onChange={() => setSearchType("monthly")}
                        />
                        <label className="form-check-label" htmlFor="monthly">
                          Monthly
                        </label>
                      </div>
                      <div className="form-check form-check-inline form-group">
                        <input
                          type="radio"
                          id="yearly"
                          value="yearly"
                          name="type"
                          className="form-check-input"
                          checked={searchType === "yearly"}
                          onChange={() => setSearchType("yearly")}
                        />
                        <label className="form-check-label" htmlFor="yearly">
                          Yearly
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="year" className="form-label">
                          {searchType === "monthly" ? "Month" : "Year"}
                        </label>
                        {searchType === "yearly" ? (
                          <select
                            className="form-control"
                            name="year"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          >
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            className="month-btn form-control"
                            name="month"
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="branch" className="form-label">
                          Branch
                        </label>
                        <select
                          className="form-control select"
                          id="branch_id"
                          name="branch"
                          value={selectedBranch}
                          onChange={handleBranchChange}
                        >
                          <option value="">All</option>
                          {branches.map((branch) => (
                            <option key={branch._id} value={branch._id}>
                              {branch.branchName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="form-icon-user" id="department_div">
                        <label htmlFor="department" className="form-label">
                          Department
                        </label>
                        <div className="btn-box">
                          <select
                            className="form-control select"
                            id="department_id"
                            name="department"
                            value={selectedDepartment}
                            onChange={(e) =>
                              setSelectedDepartment(e.target.value)
                            }
                          >
                            <option value="">Select Department</option>
                            {departments.map((department) => (
                              <option
                                key={department._id}
                                value={department._id}
                              >
                                {department.departmentName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto mt-4">
                  <div className="row">
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="tooltip"
                        title="Apply"
                      >
                        <span className="btn-inner--icon">
                          <IoMdSearch />
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="tooltip"
                        title="Reset"
                        onClick={onReset}
                      >
                        <span className="btn-inner--icon">
                          <TbRefresh className="text-white-off" />
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
  );
};

export default PayrollSearchForm;

// ByteCraft-HRMGO-Frontend\hrmgo\src\components\DashboardMain\Dashboard\Report\Leave\LeaveSearchForm.js

import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
import { TbRefresh } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

const LeaveSearchForm = ({
  onDataFetched,
  onReset,
  selectedBranch,
  selectedDepartment,
  selectedMonth,
  selectedYear,
  searchType,
  setSelectedBranch,
  setSelectedDepartment,
  setSearchType,
  setSelectedMonth,
  setSelectedYear,
}) => {
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

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

    let date = "";
    if (searchType === "monthly") {
      const [year, month] = selectedMonth.split("-");
      date = `${month}-${year}`;
      console.log("date", date);
    } else {
      date = selectedYear;
    }

    try {
      const response = await getAPI(
        `/manage-leave-get-all-by-query?branch=${selectedBranch}&department=${selectedDepartment}&date=${date}&type=${searchType}`,
        {},
        true,
        true
      );

      if (!response.hasError && Array.isArray(response.data.data)) {
        onDataFetched(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching manage leave data:", err);
    }
  };

  const handleTypeChange = (type) => {
    setSearchType(type);

    if (type === "yearly") {
      const currentYear = new Date().getFullYear();
      setSelectedYear(currentYear.toString());
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
                          onChange={() => handleTypeChange("yearly")}
                        />
                        <label className="form-check-label" htmlFor="yearly">
                          Yearly
                        </label>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="month" className="form-label">
                          {searchType === "monthly" ? "Month" : "Year"}
                        </label>
                        <input
                          className="month-btn form-control"
                          name="month"
                          type={searchType === "yearly" ? "text" : "month"}
                          value={
                            searchType === "monthly"
                              ? selectedMonth
                              : selectedYear
                          }
                          onChange={(e) =>
                            searchType === "monthly"
                              ? setSelectedMonth(e.target.value)
                              : setSelectedYear(e.target.value)
                          }
                        />
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
                        className="btn btn-sm btn-primary"
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

export default LeaveSearchForm;

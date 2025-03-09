import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
// import { TbRefresh } from "react-icons/tb";
// import { IoMdSearch } from "react-icons/io";
import { format } from "date-fns";

const BulkAttendanceSearchForm = ({
  onReset,
  selectedBranch,
  selectedDepartment,
  setSelectedBranch,
  setSelectedDepartment,
  onDataFetched,
  selectedDate,
  setSelectedDate,
  onSearch,
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

    const formattedDate = selectedDate
      ? format(new Date(selectedDate), "yyyy-MM-dd")
      : "";

    try {
      const response = await getAPI(
        `/employee-get-filter?branchId=${selectedBranch}&departmentId=${selectedDepartment}&date=${formattedDate}`,
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
      console.error("Error fetching attendance data:", err);
    }
  };

  return (
    <div className="col-sm-12">
      <div className="mt-2">
        <div className="card">
          <div className="card-body">
            <form
              method="GET"
              onSubmit={(e) => {
                handleSearch(e);
                onSearch();
              }}
              acceptCharset="UTF-8"
              id="bulkattendance_filter"
            >
              <div className="row align-items-center justify-content-end">
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="btn-box">
                    <label htmlFor="date" className="form-label text-dark">
                      Date
                    </label>
                    <input
                      className="month-btn form-control d_week"
                      autoComplete="off"
                      name="date"
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                  <div className="btn-box">
                    <label htmlFor="branch" className="form-label text-dark">
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
                  <label htmlFor="department" className="form-label text-dark">
                    Department
                  </label>
                  <div className="btn-box">
                    <select
                      className="form-control select"
                      id="department_id"
                      name="department"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="">Select Department</option>
                      {departments.map((department) => (
                        <option key={department._id} value={department._id}>
                          {department.departmentName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-auto mt-4">
                  <div className="row">
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary mx-2"
                        data-bs-toggle="tooltip"
                        title="Apply"
                      >
                        <span className="btn-inner--icon">
                          {/* <IoMdSearch /> */}
                          <i className="ti ti-search text-white"></i>
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
                          {/* <TbRefresh className="text-white-off" /> */}
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
  );
};

export default BulkAttendanceSearchForm;

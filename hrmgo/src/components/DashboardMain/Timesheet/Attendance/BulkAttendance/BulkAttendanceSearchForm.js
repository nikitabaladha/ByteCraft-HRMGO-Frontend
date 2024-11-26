import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { TbTrashOff } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import { format } from "date-fns";

const BulkAttendanceSearchForm = ({ onDataFetched }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

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
            console.log("Departments fetched :", response.data.data);
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
          console.log("Branches fetched :", response.data.data);
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
        onDataFetched(
          response.data.data,
          selectedBranch,
          selectedDepartment,
          formattedDate
        );
        console.log("Filtered employees:", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (error) {
      console.error("Error fetching filtered employees:", error);
    }
  };

  return (
    <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
      <div className="mt-2" id="">
        <div className="card">
          <div className="card-body">
            <form
              onSubmit={handleSearch}
              method="GET"
              acceptCharset="UTF-8"
              id="bulkattendance_filter"
            >
              <div className="d-flex align-items-center justify-content-end">
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <div className="btn-box">
                    <label htmlFor="date" className="form-label">
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

                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
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

                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <div className="btn-box">
                    <select
                      className="form-control select department_id"
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

                <div className="col-auto float-end ms-2 mt-4">
                  <button
                    className="btn btn-sm btn-primary"
                    data-bs-toggle="tooltip"
                    title=""
                    data-bs-original-title="apply"
                  >
                    <span className="btn-inner--icon">
                      <IoMdSearch />
                    </span>
                  </button>
                  <Link
                    to="/attendanceemployee/bulkattendance"
                    className="btn btn-sm btn-danger"
                    data-bs-toggle="tooltip"
                    title=""
                    data-bs-original-title="Reset"
                  >
                    <span className="btn-inner--icon">
                      <TbTrashOff />
                    </span>
                  </Link>
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

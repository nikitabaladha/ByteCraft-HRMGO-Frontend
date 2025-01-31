import React, { useEffect, useState } from "react";
import getAPI from "../../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";
import Select from "react-select";

const MonthlyAttendanceSearchForm = ({ onDataFetched, selectedMonthYear }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(selectedMonthYear);

  // Fetch branches
  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
        } else {
          console.error("Error fetching branch data");
        }
      } catch (err) {
        console.error("Error fetching branch data:", err);
      }
    };
    fetchBranchData();
  }, []);

  // Fetch departments when branch is selected
  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setSelectedDepartment(""); // Reset selected department when branch changes

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
            console.error("Error fetching departments");
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

  // Fetch employees when both branch and department are selected
  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedBranch && selectedDepartment) {
        try {
          const response = await getAPI(
            `/employee-get-by-branch-department?branchId=${selectedBranch}&departmentId=${selectedDepartment}`,
            {},
            true,
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setEmployees(response.data.data);
          } else {
            console.error("Error fetching employees");
          }
        } catch (err) {
          console.error("Error fetching employees:", err);
        }
      }
    };
    fetchEmployees();
  }, [selectedBranch, selectedDepartment]);

  // Fetch attendance data for the selected month
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Construct query parameters
      const queryParams = new URLSearchParams({
        branch: selectedBranch || "",
        department: selectedDepartment || "",
        month: selectedMonth || "",
      });

      // Handle multiple employees by checking if selectedEmployees is an array
      if (Array.isArray(selectedEmployees) && selectedEmployees.length > 0) {
        selectedEmployees.forEach((employeeId) => {
          queryParams.append("employee", employeeId); // Add each employee ID to the query
        });
      } else if (selectedEmployees) {
        queryParams.append("employee", selectedEmployees); // If a single employee is selected, add it
      }

      // Call the API
      const response = await getAPI(
        `/marked-attendance-get-all-by-query?${queryParams.toString()}`,
        {},
        true,
        true
      );

      if (!response.hasError && response.data && response.data.data) {
        const employeesData = response.data.data;
        console.log("employeesData from form", employeesData);

        // Pass the fetched data to the parent component
        onDataFetched(employeesData, selectedMonth);
      } else {
        console.error("Error fetching attendance data:", response);
      }
    } catch (err) {
      console.error("Error in handleSearch:", err);
    }
  };

  const employeeOptions = employees.map((employee) => ({
    value: employee._id,
    label: employee.name,
  }));

  return (
    <div className="col-sm-12">
      <div className="mt-2" id="multiCollapseExample1">
        <div className="card">
          <div className="card-body">
            <form
              method="GET"
              acceptCharset="UTF-8"
              id="report_monthly_attendance"
              onSubmit={handleSearch}
            >
              <div className="row align-items-center justify-content-end">
                <div className="col-xl-10">
                  <div className="row">
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                      <div className="btn-box">
                        <label htmlFor="month" className="form-label">
                          Month
                        </label>
                        <input
                          className="month-btn form-control current_date"
                          autoComplete="off"
                          placeholder="Select month"
                          name="month"
                          type="month"
                          id="month"
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Branch, Department and Employee selection */}
                  </div>
                </div>
                <div className="col-auto">
                  <div className="row">
                    <div className="col-auto mt-4">
                      <button
                        className="btn btn-sm btn-primary"
                        data-bs-toggle="tooltip"
                        title="Apply"
                        type="submit"
                      >
                        <span className="btn-inner--icon">
                          <IoIosSearch />
                        </span>
                      </button>
                      <Link
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="tooltip"
                        title="Reset"
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
  );
};

export default MonthlyAttendanceSearchForm;

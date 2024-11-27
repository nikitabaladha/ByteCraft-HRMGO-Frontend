import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { Link } from "react-router-dom";
import { TbTrashOff } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";

const TimeSheetSearchForm = ({ setFilters }) => {
  const [employeeName, setEmployeeName] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    employeeId: "",
  });

  useEffect(() => {
    const fetchEmployeeName = async () => {
      try {
        const response = await getAPI(`/employee-get-all-name`, {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setEmployeeName(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Employee Name:", err);
      }
    };
    fetchEmployeeName();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(formData);
    console.log("Search filters applied:", formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
      <div className="mt-2" id="multiCollapseExample1">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSearch}>
              <div className="d-flex align-items-center justify-content-end">
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <label htmlFor="start_date" className="form-label">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <label htmlFor="end_date" className="form-label">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <label htmlFor="employee" className="form-label">
                    Employee
                  </label>
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="">All</option>
                    {employeeName.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto float-end ms-2 mt-4">
                  <button type="submit" className="btn btn-sm btn-primary">
                    <IoMdSearch />
                  </button>
                  <Link to="/timesheet" className="btn btn-sm btn-danger ms-2">
                    <TbTrashOff />
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

export default TimeSheetSearchForm;

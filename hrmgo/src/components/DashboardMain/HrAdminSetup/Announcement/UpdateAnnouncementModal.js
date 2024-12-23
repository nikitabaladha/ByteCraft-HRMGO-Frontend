import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdateAnnouncementModal = ({
  announcement,
  onClose,
  UpdateAnnouncement,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: announcement?.title || "",
    description: announcement?.description || "",
    startDate: announcement?.startDate
      ? new Date(announcement.startDate).toISOString().split("T")[0]
      : today,
    endDate: announcement?.endDate
      ? new Date(announcement.endDate).toISOString().split("T")[0]
      : today,
    branchId: announcement?.branchId || "",
    departmentId: announcement?.departmentId || "",
    employeeId: announcement?.employeeId || [],
  });

  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching branch data:", err);
      }
    };
    fetchBranchData();
  }, []);

  useEffect(() => {
    if (formData.branchId) {
      const fetchDepartmentByBranchId = async () => {
        try {
          const response = await getAPI(
            `/department-get-all-by-branch-id?branchId=${formData.branchId}`,
            {},
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setDepartments(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching department data:", err);
        }
      };
      fetchDepartmentByBranchId();
    } else {
      setDepartments([]);
    }
  }, [formData.branchId]);

  useEffect(() => {
    if (formData.departmentId && formData.branchId) {
      const fetchEmployeesByDepartmentId = async () => {
        try {
          const response = await getAPI(
            `/employee-get-by-branch-department?branchId=${formData.branchId}&departmentId=${formData.departmentId}`,
            {},
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            const formattedEmployees = response.data.data.map((employee) => ({
              value: employee._id,
              label: employee.name,
            }));
            setEmployees(formattedEmployees);
          }
        } catch (err) {
          console.error("Error fetching employees data:", err);
        }
      };
      fetchEmployeesByDepartmentId();
    } else {
      setEmployees([]);
    }
  }, [formData.departmentId, formData.branchId]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      branchId,
      departmentId: "",
      employeeId: [],
    }));
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setFormData((prevData) => ({ ...prevData, departmentId, employeeId: [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmployeeChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFormData((prevData) => ({ ...prevData, employeeId: selectedIds }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Get existing employee IDs from the announcement
      const existingEmployeeIds = announcement.employeeId || [];

      // Filter out duplicates and store unique employee IDs
      const uniqueEmployeeIds = Array.from(
        new Set([
          ...existingEmployeeIds,
          ...formData.employeeId, // New selections
        ])
      );

      // Create the updated announcement data, ensuring no duplicate employee IDs
      const updatedData = {
        ...formData,
        employeeId: uniqueEmployeeIds, // Only store unique employee IDs
      };

      const response = await putAPI(
        `/announcement/${announcement.id}`,
        updatedData,
        true
      );

      if (response?.data?.hasError) {
        toast.error("Failed to update Announcement.");
      } else {
        toast.success("Announcement updated successfully!");

        const newUpdatedAnnouncement = {
          id: response.data.data._id,
          title: response.data.data.title,
          startDate: response.data.data.startDate,
          endDate: response.data.data.endDate,
          description: response.data.data.description,
        };

        UpdateAnnouncement(newUpdatedAnnouncement);
        onClose();
      }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalDialog = document.querySelector(".modal-dialog");

      if (modalDialog && !modalDialog.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {" "}
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        style={{ display: "block", backgroundColor: " rgba(0, 0, 0, 0.5)" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Announcement</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="body">
              <form method="POST" onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="title" className="col-form-label">
                          Announcement Title
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control"
                          placeholder="Enter Announcement Title"
                          required
                          name="title"
                          type="text"
                          id="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="branch_id" className="col-form-label">
                          Branch
                        </label>
                        <span className="text-danger">*</span>
                        <select
                          className="form-control"
                          id="branch_id"
                          name="branch"
                          value={formData.branchId}
                          onChange={handleBranchChange}
                          required
                        >
                          <option value="">Select Branch</option>
                          {branches.map((branch) => (
                            <option key={branch._id} value={branch._id}>
                              {branch.branchName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="department_id"
                          className="col-form-label"
                        >
                          Department
                        </label>
                        <span className="text-danger">*</span>
                        <select
                          className="form-control"
                          id="department_id"
                          name="department"
                          value={formData.departmentId}
                          onChange={handleDepartmentChange}
                          required
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employee_id" className="col-form-label">
                          Employee
                        </label>
                        <Select
                          isMulti
                          name="employees"
                          options={employees}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleEmployeeChange}
                          value={employees.filter((emp) =>
                            formData.employeeId.includes(emp.value)
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="start_date" className="col-form-label">
                          Start Date
                        </label>
                        <span className="text-danger">*</span>

                        <input
                          value={formData.startDate}
                          onChange={(date) => handleChange(date, "startDate")}
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          required
                          type="date"
                          name="startDate"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="end_date" className="col-form-label">
                          End Date
                        </label>
                        <span className="text-danger">*</span>

                        <input
                          value={formData.endDate}
                          onChange={(date) => handleChange(date, "endDate")}
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          required
                          type="date"
                          name="endDate"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="description" className="col-form-label">
                          Announcement Description
                        </label>
                        <span className="text-danger">*</span>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="description"
                          required
                          placeholder="Enter Announcement Description"
                          id="description"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateAnnouncementModal;

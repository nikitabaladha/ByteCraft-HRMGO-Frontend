import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

const CreateAnnouncementModal = ({ onClose, addAnnouncement }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

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

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    setFormData((prevData) => ({ ...prevData, branchId }));

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

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    setFormData((prevData) => ({ ...prevData, departmentId }));

    if (departmentId) {
      const fetchEmployeesByDepartmentId = async () => {
        try {
          const response = await getAPI(
            `/employee-get-by-branch-department?branchId=${selectedBranch}&departmentId=${departmentId}`,
            {},
            true,
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            const formattedEmployees = response.data.data.map((employee) => ({
              value: employee._id,
              label: employee.name,
            }));

            setEmployees(formattedEmployees);
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching employees data:", err);
        }
      };
      fetchEmployeesByDepartmentId();
    } else {
      setEmployees([]);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    branchId: "",
    departmentId: "",
    employeeId: [],
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEmployeeChange = (selectedOptions) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setSelectedEmployees(selectedIds);
    setFormData((prevData) => ({ ...prevData, employeeId: selectedIds }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postAPI(
        "/announcement",

        {
          title: formData.title,
          branchId: formData.branchId,
          departmentId: formData.departmentId,
          employeeId: selectedEmployees,
          startDate: formData.startDate,
          endDate: formData.endDate,
          description: formData.description,
        },
        true
      );

      if (!response.hasError) {
        toast.success("Announcement created successfully!");

        const branchName = branches.find(
          (br) => br._id === formData.branchId
        )?.branchName;

        const departmentName = departments.find(
          (dep) => dep._id === formData.departmentId
        )?.departmentName;

        const newAnnouncement = {
          id: response.data.data._id,
          title: response.data.data.title,
          startDate: response.data.data.startDate,
          endDate: response.data.data.endDate,
          description: response.data.data.description,
          branchName: branchName,
          departmentName: departmentName,
          branchId: response.data.data.branchId,
          departmentId: response.data.data.departmentId,
        };

        addAnnouncement(newAnnouncement);

        setFormData({
          title: "",
          branchId: "",
          departmentId: "",
          employeeId: [],
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0],
          description: "",
        });
        setSelectedBranch("");
        setSelectedDepartment("");
        setSelectedEmployees([]);
        onClose();
      } else {
        toast.error("Error creating announcement.");
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
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: " rgba(0, 0, 0, 0.5)",
      }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Announcement
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="body ">
            <form
              method="POST"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
            >
              <input name="_token" type="hidden" />
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
                        required="required"
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
                        value={selectedBranch}
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
                      <label htmlFor="department_id" className="col-form-label">
                        Department
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        id="department_id"
                        name="department"
                        value={selectedDepartment}
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
                      <span className="text-danger">*</span>

                      <Select
                        isMulti
                        options={employees}
                        value={employees.filter((opt) =>
                          selectedEmployees.includes(opt.value)
                        )}
                        onChange={handleEmployeeChange}
                        placeholder="Select Employees"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date" className="col-form-label">
                        Announcement start Date
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        value={formData.startDate}
                        required
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        autoComplete="off"
                        type="date"
                        name="startDate"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-form-label">
                        Announcement End Date
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        value={formData.endDate}
                        required
                        onChange={handleChange}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        autoComplete="off"
                        type="date"
                        name="endDate"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description" className="col-form-label">
                      Announcement Description
                    </label>
                    <span className="text-danger">*</span>
                    <textarea
                      className="form-control"
                      placeholder="Enter Announcement Description"
                      rows={3}
                      required="required"
                      name="description"
                      cols={50}
                      id="description"
                      defaultValue={""}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input
                  type="button"
                  defaultValue="Cancel"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                />
                <input
                  type="submit"
                  defaultValue="Create"
                  className="btn  btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;

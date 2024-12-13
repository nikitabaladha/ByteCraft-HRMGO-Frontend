import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompetencyRating from "./CompetencyRating.js";

const IndicatorCreateModal = ({ closeModal }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [designations, setDesignation] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [competencyRatings, setCompetencyRatings] = useState({});

  const handleRatingChange = (competency, rating) => {
    setCompetencyRatings((prevRatings) => ({
      ...prevRatings,
      [competency]: rating,
    }));
  };

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

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);

    if (departmentId) {
      const fetchDesignationByDepartmentId = async () => {
        try {
          const response = await getAPI(
            `/designation-get-all-by-department-id?departmentId=${departmentId}`,
            {},
            true,
            true
          );
          if (!response.hasError && Array.isArray(response.data.data)) {
            setDesignation(response.data.data);
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching designation data:", err);
        }
      };
      fetchDesignationByDepartmentId();
    } else {
      setDesignation([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBranch || !selectedDepartment || !selectedDesignation) {
      toast.error("Please select Branch, Department, and Designation.");
      return;
    }

    const groupedCompetencies = {
      organizational: [
        { name: "Leadership", rating: competencyRatings.leadership || 0 },
        {
          name: "Project Management",
          rating: competencyRatings.projectManagement || 0,
        },
      ],
      technical: [
        {
          name: "Allocating Resources",
          rating: competencyRatings.allocatingResources || 0,
        },
      ],
      behavioural: [
        {
          name: "Business Process",
          rating: competencyRatings.businessProcess || 0,
        },
        {
          name: "Oral Communication",
          rating: competencyRatings.oralCommunication || 0,
        },
      ],
    };

    const data = {
      branchId: selectedBranch,
      departmentId: selectedDepartment,
      designationId: selectedDesignation,
      addedById: "67334037a50a86ca6906b46a",
      competencies: groupedCompetencies,
    };

    try {
      const response = await postAPI("/indicator", data, true);
      if (!response.hasError) {
        toast.success("Indicator created successfully!");
        closeModal();
      } else {
        toast.error("Error creating indicator: " + response.message);
      }
    } catch (error) {
      console.error("Error creating indicator: " + error.message);
    }
  };

  return (
    <>
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
                Create New Indicator
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="body ">
              <form
                method="POST"
                acceptCharset="UTF-8"
                id="ratingForm"
                className="needs-validation"
                noValidate=""
                onSubmit={handleSubmit}
              >
                <input name="_token" type="hidden" />
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="branch_id" className="form-label">
                          Select Branch
                        </label>
                        <span className="text-danger">*</span>
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
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="department_id" className="form-label">
                          Select Department
                        </label>
                        <span className="text-danger">*</span>
                        <select
                          className="form-control select"
                          id="department_id"
                          name="department"
                          value={selectedDepartment}
                          onChange={handleDepartmentChange}
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
                        <label htmlFor="designation_id" className="form-label">
                          Select Designation
                        </label>
                        <span className="text-danger">*</span>

                        <select
                          className="form-control select"
                          id="designation_id"
                          name="designation"
                          value={selectedDesignation}
                          onChange={(e) =>
                            setSelectedDesignation(e.target.value)
                          }
                        >
                          <option value="">Select Designation</option>
                          {designations.map((designation) => (
                            <option
                              key={designation._id}
                              value={designation._id}
                            >
                              {designation.designationName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <CompetencyRating onRatingChange={handleRatingChange} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    defaultValue="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    defaultValue="Create"
                    className="btn btn-primary"
                  >
                    Create
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

export default IndicatorCreateModal;

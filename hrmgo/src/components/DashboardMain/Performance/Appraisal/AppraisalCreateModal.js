import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RatingComponent = ({ name, value, onChange, disabled }) => {
  return (
    <fieldset className="rate">
      {[5, 4, 3, 2, 1].map((val) => (
        <React.Fragment key={val}>
          <input
            type="radio"
            id={`${name}-${val}`}
            name={name}
            value={val}
            checked={value === val}
            onChange={() => onChange(val)}
            disabled={disabled}
          />
          <label className="full" htmlFor={`${name}-${val}`}></label>
        </React.Fragment>
      ))}
    </fieldset>
  );
};

const AppraisalCreateModal = ({ closeModal, addAppraisal }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [indicatorData, setIndicatorData] = useState(null);
  const [competencyRatings, setCompetencyRatings] = useState({
    leadership: 0,
    project_management: 0,
    allocating_resources: 0,
    business_process: 0,
    oral_communication: 0,
  });
  const [remarks, setRemarks] = useState("");

  const handleRatingChange = (competency, rating) => {
    const normalizedKey = competency.toLowerCase().replace(/ /g, "_");
    setCompetencyRatings((prevRatings) => ({
      ...prevRatings,
      [normalizedKey]: rating,
    }));
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

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);

    if (branchId) {
      const fetchEmployeeByBranchId = async () => {
        try {
          const response = await getAPI(
            `/employee-get-filter?branchId=${branchId}`,
            {},
            true,
            true
          );

          if (!response.hasError && Array.isArray(response.data.data)) {
            setEmployees(response.data.data);
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching employee data:", err);
        }
      };
      fetchEmployeeByBranchId();
    } else {
      setEmployees([]);
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  useEffect(() => {
    const handleAutoSearch = async () => {
      if (!selectedEmployee || !selectedDate) return;

      const selectedEmployeeData = employees.find(
        (employee) => employee._id === selectedEmployee
      );

      if (!selectedEmployeeData) {
        console.error("No employee selected or data not found.");
        return;
      }

      const { branchId, departmentId, designationId } = selectedEmployeeData;

      const formattedDate = new Date(selectedDate).toISOString().slice(0, 7);

      try {
        const response = await getAPI(
          `indicator-by-query?branchId=${branchId}&departmentId=${departmentId}&designationId=${designationId}&createdAt=${formattedDate}`,
          {},
          true,
          true
        );

        if (!response.hasError && response.data && response.data.data) {
          setIndicatorData(response.data.data);
        } else {
          console.error("Unexpected response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching indicator data:", err);
      }
    };

    handleAutoSearch();
  }, [selectedEmployee, selectedDate, employees]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedBranch || !selectedEmployee || !selectedDate || !indicatorData) {
    toast.error("Please fill all required fields before submitting.");
    return;
  }

  const selectedEmployeeData = employees.find(
    (employee) => employee._id === selectedEmployee
  );

  if (!selectedEmployeeData) {
    console.error("Selected employee data not found.");
    return;
  }

  // Ensure all ratings are at least 1
  const updatedCompetencyRatings = {
    leadership: Math.max(competencyRatings.leadership, 1),
    project_management: Math.max(competencyRatings.project_management, 1),
    allocating_resources: Math.max(competencyRatings.allocating_resources, 1),
    business_process: Math.max(competencyRatings.business_process, 1),
    oral_communication: Math.max(competencyRatings.oral_communication, 1),
  };

  const appraisalCompetencies = {
    organizational: [
      { name: "Leadership", rating: updatedCompetencyRatings.leadership },
      {
        name: "Project Management",
        rating: updatedCompetencyRatings.project_management,
      },
    ],
    technical: [
      {
        name: "Allocating Resources",
        rating: updatedCompetencyRatings.allocating_resources,
      },
    ],
    behavioural: [
      {
        name: "Business Process",
        rating: updatedCompetencyRatings.business_process,
      },
      {
        name: "Oral Communication",
        rating: updatedCompetencyRatings.oral_communication,
      },
    ],
  };

  const data = {
    branchId: selectedBranch,
    employeeId: selectedEmployee,
    remarks,
    appraisalCompetencies,
    indicatorId: indicatorData._id,
  };

  try {
    const response = await postAPI("/appraisal", data, true);

    if (!response.hasError) {
      const newAppraisal = {
        id: response.data.data._id,
        branchId: response.data.data.branchId,
        employeeId: response.data.data.employeeId,
        createdAt: response.data.data.createdAt,
        branch: branches.find((b) => b._id === selectedBranch)?.branchName,
        employee: selectedEmployeeData?.name,
        overAllRating: response.data.data.overAllRating,
        remarks: response.data.data.remarks,
        indicatorId: response.data.data.indicatorId,
        appraisalCompetencies: response.data.data.appraisalCompetencies,
        department: indicatorData?.departmentName || "",
        designation: indicatorData?.designationName || "",
        indicatorCompetencies: indicatorData?.competencies || {},
        targetRating: indicatorData?.targetRating || 0,
      };

      addAppraisal(newAppraisal);
      toast.success("Appraisal created successfully!");
      closeModal();
    } else {
      toast.error("Error creating appraisal: " + response.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "An unexpected error occurred. Please try again."
    );
  }
};

return (
  <div
    className="modal fade show"
    id="commonModal"
    tabIndex={-1}
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-modal="true"
    style={{
      display: "block",
      paddingLeft: 0,
      backgroundColor: " rgba(0, 0, 0, 0.5)",
    }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Create New Appraisal</h5>
          <button
            type="button"
            className="btn-close"
            onClick={closeModal}
          ></button>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="card-footer text-end"></div>

              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="col-form-label">
                      Select Branch<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
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

                <div className="col-md-6 mt-2">
                  <div className="form-group">
                    <label className="form-label">
                      Employee<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control select"
                      id="employee_id"
                      name="employee"
                      value={selectedEmployee}
                      onChange={handleEmployeeChange}
                    >
                      <option value="">Select Employee</option>
                      {employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="appraisal_date" className="col-form-label">
                      Select Month
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      autoComplete="off"
                      required="required"
                      id="current_month"
                      name="appraisal_date"
                      type="month"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="remark" className="col-form-label">
                      Remarks
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Enter remark"
                      name="remark"
                      cols={50}
                      id="remark"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {indicatorData && (
                <div className="row" id="stares">
                  <div
                    className="col-5 text-end"
                    style={{ marginLeft: "60px" }}
                  >
                    <h5>Indicator</h5>
                  </div>
                  <div className="col-4 text-end">
                    <h5>Appraisal</h5>
                  </div>
                  <div className="col-md-12 mt-3">
                    <h6>Organizational Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicatorData.competencies.organizational.map((comp) => {
                    const normalizedKey = comp.name.toLowerCase().replace(/ /g, "_");
                    return (
                      <React.Fragment key={comp.name}>
                        <div className="col-4">{comp.name}</div>
                        <div className="col-4">
                          <RatingComponent
                            name={`indicator-${comp.name}`}
                            value={comp.rating}
                            onChange={() => {}}
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <RatingComponent
                            name={`appraisal-${comp.name}`}
                            value={competencyRatings[normalizedKey]}
                            onChange={(rating) =>
                              handleRatingChange(comp.name, rating)
                            }
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}

                  <div className="col-md-12 mt-3">
                    <h6>Technical Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicatorData.competencies.technical.map((comp) => {
                    const normalizedKey = comp.name.toLowerCase().replace(/ /g, "_");
                    return (
                      <React.Fragment key={comp.name}>
                        <div className="col-4">{comp.name}</div>
                        <div className="col-4">
                          <RatingComponent
                            name={`indicator-${comp.name}`}
                            value={comp.rating}
                            onChange={() => {}}
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <RatingComponent
                            name={`appraisal-${comp.name}`}
                            value={competencyRatings[normalizedKey]}
                            onChange={(rating) =>
                              handleRatingChange(comp.name, rating)
                            }
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}

                  <div className="col-md-12 mt-3">
                    <h6>Behavioural Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicatorData.competencies.behavioural.map((comp) => {
                    const normalizedKey = comp.name.toLowerCase().replace(/ /g, "_");
                    return (
                      <React.Fragment key={comp.name}>
                        <div className="col-4">{comp.name}</div>
                        <div className="col-4">
                          <RatingComponent
                            name={`indicator-${comp.name}`}
                            value={comp.rating}
                            onChange={() => {}}
                            disabled
                          />
                        </div>
                        <div className="col-4">
                          <RatingComponent
                            name={`appraisal-${comp.name}`}
                            value={competencyRatings[normalizedKey]}
                            onChange={(rating) =>
                              handleRatingChange(comp.name, rating)
                            }
                          />
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default AppraisalCreateModal;
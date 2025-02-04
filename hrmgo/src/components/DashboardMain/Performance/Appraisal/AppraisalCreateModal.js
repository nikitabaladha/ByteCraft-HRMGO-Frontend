import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import postAPI from "../../../../api/postAPI.js";
import IndicatorRating from "./IndicatorRating.js";
import CompetencyRating from "./CompetencyRating.js";
import CompetencyTag from "./CompetencyTag.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppraisalCreateModal = ({ closeModal, addAppraisal }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [indicatorData, setIndicatorData] = useState(null);
  const [competencyRatings, setCompetencyRatings] = useState({});
  const [remarks, setRemarks] = useState("");

  const handleRatingChange = (competency, rating) => {
    setCompetencyRatings((prevRatings) => ({
      ...prevRatings,
      [competency]: rating,
    }));
  };

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setBranches(response.data.data);
          console.log("Branches fetched:", response.data.data);
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
          const indicatorData = response.data.data;

          console.log("indicator data", indicatorData);

          setIndicatorData(indicatorData);
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

    e.preventDefault();

    if (!selectedBranch) {
      toast.error("Please select a branch before submitting.");
      return;
    }

    if (!selectedEmployee) {
      toast.error("Please select an employee before submitting.");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date before submitting.");
      return;
    }

    if (!indicatorData) {
      toast.error("No Indicator data found for selected Month.");
      return;
    }

    const selectedEmployeeData = employees.find(
      (employee) => employee._id === selectedEmployee
    );

    if (!selectedEmployeeData) {
      console.error("Selected employee data not found.");
      return;
    }

    const { branchId, employeeId } = selectedEmployeeData;

    const appraisalCompetencies = {
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
      employeeId: selectedEmployee,
      remarks,
      appraisalCompetencies: appraisalCompetencies,
      indicatorId: indicatorData._id,
    };

    try {
      const response = await postAPI("/appraisal", data, true);

      console.log("newly created appraisal", response.data);

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

        console.log("new appraisal", newAppraisal);
        addAppraisal(newAppraisal);

        toast.success("Appraisal created successfully!");
        closeModal();
      } else {
        toast.error("Error creating appraisal: " + response.message);
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
  return (
    <>
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
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Appraisal
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
                  <div className="card-footer text-end"></div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="branch" className="col-form-label">
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
                    <div className="col-md-6 mt-2">
                      <div className="form-group">
                        <label htmlFor="employee" className="form-label">
                          Employee
                        </label>
                        <span className="text-danger">*</span>
                        <div className="employee_div">
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
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="appraisal_date"
                          className="col-form-label"
                        >
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
                    <>
                      <div className="row">
                        <CompetencyTag indicatorData={indicatorData} />
                        <IndicatorRating indicatorData={indicatorData} />
                        <CompetencyRating onRatingChange={handleRatingChange} />
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    defaultValue="Cancel"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={closeModal}
                  />
                  <input
                    type="submit"
                    defaultValue="Create"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppraisalCreateModal;

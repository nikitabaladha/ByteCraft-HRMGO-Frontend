import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const AppraisalUpdateModal = ({ closeModal, updateAppraisal, appraisal }) => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [indicatorData, setIndicatorData] = useState(null);
  const [competencyRatings, setCompetencyRatings] = useState({});
  const [remarks, setRemarks] = useState("");

  // Initialize form data with existing appraisal
  useEffect(() => {
    if (appraisal) {
      setSelectedBranch(appraisal.branchId);
      setSelectedEmployee(appraisal.employeeId);
      setSelectedDate(
        new Date(appraisal.appraisalDate).toISOString().slice(0, 7)
      );
      setRemarks(appraisal.remarks);

      // Initialize competency ratings
      const ratings = {};
      Object.entries(appraisal.appraisalCompetencies).forEach(
        ([category, comps]) => {
          comps.forEach((comp) => {
            const key = comp.name.toLowerCase().replace(/ /g, "_");
            ratings[key] = comp.rating;
          });
        }
      );
      setCompetencyRatings(ratings);
    }
  }, [appraisal]);

  // Fetch branches
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

  // Fetch employees when branch changes
  useEffect(() => {
    const fetchEmployees = async () => {
      if (selectedBranch) {
        try {
          const response = await getAPI(
            `/employee-get-filter?branchId=${selectedBranch}`,
            {},
            true,
            true
          );
          if (!response.hasError) {
            setEmployees(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching employees:", err);
        }
      }
    };
    fetchEmployees();
  }, [selectedBranch]);

  // Fetch indicator data
  useEffect(() => {
    const fetchIndicatorData = async () => {
      if (appraisal?.indicatorId) {
        try {
          const response = await getAPI(
            `/indicator/${appraisal.indicatorId}`,
            {},
            true
          );
          if (!response.hasError) {
            setIndicatorData(response.data.data);
          }
        } catch (err) {
          console.error("Error fetching indicator data:", err);
        }
      }
    };
    fetchIndicatorData();
  }, [appraisal]);

  // Handle rating change
  const handleRatingChange = (competency, rating) => {
    const normalizedKey = competency.toLowerCase().replace(/ /g, "_");
    setCompetencyRatings((prev) => ({ ...prev, [normalizedKey]: rating }));
  };

  // Render star rating input
  const renderRatingInput = (name, value, onChange, disabled = false) => {
    return (
      <fieldset className="rate" disabled={disabled}>
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
            <label
              className="full"
              htmlFor={`${name}-${val}`}
              title={`${val} stars`}
            ></label>
          </React.Fragment>
        ))}
      </fieldset>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appraisalCompetencies = {
      organizational: [
        { name: "Leadership", rating: competencyRatings.leadership || 0 },
        {
          name: "Project Management",
          rating: competencyRatings.project_management || 0,
        },
      ],
      technical: [
        {
          name: "Allocating Resources",
          rating: competencyRatings.allocating_resources || 0,
        },
      ],
      behavioural: [
        {
          name: "Business Process",
          rating: competencyRatings.business_process || 0,
        },
        {
          name: "Oral Communication",
          rating: competencyRatings.oral_communication || 0,
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
      const response = await putAPI(`/appraisal/${appraisal.id}`, data, true);

      if (!response.hasError) {
        const updatedAppraisal = {
          id: response.data.data._id,
          branchId: response.data.data.branchId,
          employeeId: response.data.data.employeeId,
          appraisalDate: response.data.data.appraisalDate,
          remarks: response.data.data.remarks,
          indicatorId: response.data.data.indicatorId,
          appraisalCompetencies: response.data.data.appraisalCompetencies,
          createdAt: response.data.data.createdAt,
          indicator: indicatorData,
          branch: indicatorData.branch,
          department: indicatorData.department,
          designation: indicatorData.designation,
          indicatorCompetencies: indicatorData.competencies,
          employee: appraisal.employee,
          overAllRating: response.data.data.overAllRating,
          targetRating: indicatorData.overAllRating,
        };
        updateAppraisal(updatedAppraisal);
        toast.success("Appraisal updated successfully!");
        closeModal();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Appraisal</h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>

          <div className="body">
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
               
                <div className="row py-4">
                <div className="col-md-12">
                  <div className="info text-sm">
                    <strong>Branch: </strong>
                    <span>{appraisal.branch}</span>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="info text-sm font-style">
                    <strong>Employee: </strong>
                    <span>{appraisal.employee}</span>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="info text-sm font-style">
                    <strong>Appraisal Date: </strong>
                    <span>
                          {moment(appraisal.appraisalDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
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
                      const key = comp.name.toLowerCase().replace(/ /g, "_");
                      return (
                        <React.Fragment key={comp.name}>
                          <div className="col-4">{comp.name}</div>
                          <div className="col-4">
                            {renderRatingInput(
                              `indicator-${comp.name}`,
                              comp.rating,
                              () => {},
                              true
                            )}
                          </div>
                          <div className="col-4">
                            {renderRatingInput(
                              `appraisal-${comp.name}`,
                              competencyRatings[key] || 0,
                              (rating) => handleRatingChange(comp.name, rating)
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}

                    <div className="col-md-12 mt-3">
                      <h6>Technical Competencies</h6>
                      <hr className="mt-0" />
                    </div>
                    {indicatorData.competencies.technical.map((comp) => {
                      const key = comp.name.toLowerCase().replace(/ /g, "_");
                      return (
                        <React.Fragment key={comp.name}>
                          <div className="col-4">{comp.name}</div>
                          <div className="col-4">
                            {renderRatingInput(
                              `indicator-${comp.name}`,
                              comp.rating,
                              () => {},
                              true
                            )}
                          </div>
                          <div className="col-4">
                            {renderRatingInput(
                              `appraisal-${comp.name}`,
                              competencyRatings[key] || 0,
                              (rating) => handleRatingChange(comp.name, rating)
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}

                    <div className="col-md-12 mt-3">
                      <h6>Behavioural Competencies</h6>
                      <hr className="mt-0" />
                    </div>
                    {indicatorData.competencies.behavioural.map((comp) => {
                      const key = comp.name.toLowerCase().replace(/ /g, "_");
                      return (
                        <React.Fragment key={comp.name}>
                          <div className="col-4">{comp.name}</div>
                          <div className="col-4">
                            {renderRatingInput(
                              `indicator-${comp.name}`,
                              comp.rating,
                              () => {},
                              true
                            )}
                          </div>
                          <div className="col-4">
                            {renderRatingInput(
                              `appraisal-${comp.name}`,
                              competencyRatings[key] || 0,
                              (rating) => handleRatingChange(comp.name, rating)
                            )}
                          </div>
                        </React.Fragment>
                      );
                    })}

                  </div>
                  
                )}
                 <div className="row">
                <div className="col-md-12">
                  <hr />
                  <h6>Remark</h6>
                </div>
                <div className="col-md-12 mt-3">
                  <p className="text-sm">{remarks}</p>
                </div>
              </div>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalUpdateModal;

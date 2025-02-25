import React from "react";
import moment from "moment";

const RatingComponent = ({ name, value, disabled }) => {
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
            disabled={disabled}
          />
          <label className="full" htmlFor={`${name}-${val}`}></label>
        </React.Fragment>
      ))}
    </fieldset>
  );
};

const AppraisalDetailModal = ({ appraisal, closeModal }) => {
  if (!appraisal) return null; // Handle case where no appraisal data is passed

  const {
    branch,
    employee,
    remarks,
    indicatorCompetencies,
    appraisalCompetencies,
  } = appraisal;

  // Helper function to get the rating for a competency
  const getRating = (competencyName, type = "indicator") => {
    const competencies =
      type === "indicator" ? indicatorCompetencies : appraisalCompetencies;
    const category = Object.keys(competencies).find((key) =>
      competencies[key].some((comp) => comp.name === competencyName)
    );
    if (category) {
      const competency = competencies[category].find(
        (comp) => comp.name === competencyName
      );
      return competency ? competency.rating : 0;
    }
    return 0;
  };

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Appraisal Detail
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="body">
            <div className="modal-body">
              <div className="row py-4">
                <div className="col-md-12">
                  <div className="info text-sm">
                    <strong>Branch: </strong>
                    <span>{branch}</span>
                  </div>
                </div>
                <div className="col-md-12 mt-3">
                  <div className="info text-sm font-style">
                    <strong>Employee: </strong>
                    <span>{employee}</span>
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
              <div className="row">
                <div className="col-5 text-end" style={{ marginLeft: "51px" }}>
                  <h5>Indicator</h5>
                </div>
                <div className="col-4 text-end">
                  <h5>Appraisal</h5>
                </div>

                {/* Organizational Competencies */}
                <div className="col-md-12 mt-3">
                  <h6>Organizational Competencies</h6>
                  <hr className="mt-0" />
                </div>
                {indicatorCompetencies.organizational.map((comp) => (
                  <React.Fragment key={comp.name}>
                    <div className="col-4">{comp.name}</div>
                    <div className="col-4">
                      <RatingComponent
                        name={`indicator-${comp.name}`}
                        value={getRating(comp.name, "indicator")}
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <RatingComponent
                        name={`appraisal-${comp.name}`}
                        value={getRating(comp.name, "appraisal")}
                        disabled
                      />
                    </div>
                  </React.Fragment>
                ))}

                {/* Technical Competencies */}
                <div className="col-md-12 mt-3">
                  <h6>Technical Competencies</h6>
                  <hr className="mt-0" />
                </div>
                {indicatorCompetencies.technical.map((comp) => (
                  <React.Fragment key={comp.name}>
                    <div className="col-4">{comp.name}</div>
                    <div className="col-4">
                      <RatingComponent
                        name={`indicator-${comp.name}`}
                        value={getRating(comp.name, "indicator")}
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <RatingComponent
                        name={`appraisal-${comp.name}`}
                        value={getRating(comp.name, "appraisal")}
                        disabled
                      />
                    </div>
                  </React.Fragment>
                ))}

                {/* Behavioural Competencies */}
                <div className="col-md-12 mt-3">
                  <h6>Behavioural Competencies</h6>
                  <hr className="mt-0" />
                </div>
                {indicatorCompetencies.behavioural.map((comp) => (
                  <React.Fragment key={comp.name}>
                    <div className="col-4">{comp.name}</div>
                    <div className="col-4">
                      <RatingComponent
                        name={`indicator-${comp.name}`}
                        value={getRating(comp.name, "indicator")}
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <RatingComponent
                        name={`appraisal-${comp.name}`}
                        value={getRating(comp.name, "appraisal")}
                        disabled
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* Remarks Section */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppraisalDetailModal;
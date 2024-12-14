import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";
import moment from "moment";

import CompetencyTag from "./CompetencyTag";
import ViewIndicator from "./ViewIndicator";
import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

const AppraisalUpdateModal = ({ closeModal, appraisal, onUpdateSuccess }) => {
  const [ratings, setRatings] = useState({
    organizational: {},
    technical: {},
    behavioural: {},
  });

  useEffect(() => {
    if (appraisal) {
      setRatings({
        organizational: appraisal.appraisalCompetencies?.organizational.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
        technical: appraisal.appraisalCompetencies?.technical.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
        behavioural: appraisal.appraisalCompetencies?.behavioural.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
      });
    }
  }, [appraisal]);

  if (!appraisal) return null;

  const handleRatingChange = (category, competencyName, rating) => {
    setRatings((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [competencyName]: rating,
      },
    }));
  };

  const renderRating = (category, name, value) => {
    return (
      <fieldset id="demo1" className="rate">
        {[5, 4, 3, 2, 1].map((rating) => (
          <React.Fragment key={rating}>
            <input
              className="stars"
              type="radio"
              id={`${name}-${rating}`}
              name={`rating[${name}]`}
              value={rating}
              checked={value === rating}
              onChange={() => handleRatingChange(category, name, rating)}
            />
            <label
              className="full"
              htmlFor={`${name}-${rating}`}
              title={`${rating} star${rating > 1 ? "s" : ""}`}
            />
          </React.Fragment>
        ))}
      </fieldset>
    );
  };

  const handleUpdateAppraisal = async (e) => {
    e.preventDefault();

    const updatedCompetencies = {
      organizational: Object.entries(ratings.organizational).map(
        ([name, rating]) => ({ name, rating })
      ),
      technical: Object.entries(ratings.technical).map(([name, rating]) => ({
        name,
        rating,
      })),
      behavioural: Object.entries(ratings.behavioural).map(
        ([name, rating]) => ({ name, rating })
      ),
    };

    const updatedIndicator = { appraisalCompetencies: updatedCompetencies };

    try {
      const response = await putAPI(
        `/appraisal/${appraisal.id}`,
        updatedIndicator,
        true
      );

      if (!response.hasError) {
        toast.success("Appraisal updated successfully!");
        onUpdateSuccess(response.data.data);
        closeModal();
      } else {
        toast.error("Failed to update Appraisal.");
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
        aria-labelledby="exampleModalLabel"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Appraisal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              />
            </div>
            <div className="body">
              <form
                method="POST"
                acceptCharset="UTF-8"
                id="ratingForm"
                className="needs-validation"
                noValidate=""
                onSubmit={handleUpdateAppraisal}
              >
                <input name="_method" type="hidden" defaultValue="PUT" />
                <input name="_token" type="hidden" />
                <div className="modal-body">
                  <div className="row py-4">
                    <div className="col-md-12">
                      <div className="info text-sm">
                        <strong>Branch : </strong>
                        <span>{appraisal.branch}</span>
                      </div>
                    </div>
                    <div className="col-md-12 mt-2">
                      <div className="info text-sm font-style">
                        <strong>Employee Name : </strong>
                        <span>{appraisal.employee}</span>
                      </div>
                    </div>
                    <div className="col-md-12 mt-3">
                      <div className="info text-sm font-style">
                        <strong>Appraisal Date : </strong>

                        <span>
                          {moment(appraisal.appraisalDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <CompetencyTag />
                    <ViewIndicator appraisal={appraisal} />

                    <div className="col-md-4">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="exampleModalLabel"
                          style={{
                            marginBottom: "30px",
                          }}
                        >
                          Appraisal
                        </h5>
                      </div>
                      <div className="body">
                        <div className="modal-body">
                          <div className="row">
                            {appraisal.appraisalCompetencies?.organizational?.map(
                              (competency) => (
                                <React.Fragment key={competency.name}>
                                  <div className="col-md-12">
                                    {renderRating(
                                      "organizational",
                                      competency.name,
                                      ratings.organizational[competency.name] ||
                                        competency.rating
                                    )}
                                  </div>
                                </React.Fragment>
                              )
                            )}

                            <div className="col-md-12 mt-5">
                              <hr className="mt-0" />
                            </div>
                            {appraisal.appraisalCompetencies?.technical?.map(
                              (competency) => (
                                <React.Fragment key={competency.name}>
                                  <div className="col-md-12">
                                    {renderRating(
                                      "technical",
                                      competency.name,
                                      ratings.technical[competency.name] ||
                                        competency.rating
                                    )}
                                  </div>
                                </React.Fragment>
                              )
                            )}

                            <div className="col-md-12 mt-5">
                              <hr className="mt-0" />
                            </div>
                            {appraisal.appraisalCompetencies?.behavioural?.map(
                              (competency) => (
                                <React.Fragment key={competency.name}>
                                  <div className="col-md-12">
                                    {renderRating(
                                      "behavioural",
                                      competency.name,
                                      ratings.behavioural[competency.name] ||
                                        competency.rating
                                    )}
                                  </div>
                                </React.Fragment>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    defaultValue="Update"
                    className="btn btn-primary"
                  >
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

export default AppraisalUpdateModal;

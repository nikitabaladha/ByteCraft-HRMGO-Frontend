import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";

const IndicatorUpdateModal = ({ closeModal, indicator, onUpdateSuccess }) => {
  const [ratings, setRatings] = useState({
    organizational: {},
    technical: {},
    behavioural: {},
  });

  useEffect(() => {
    if (indicator) {
      setRatings({
        organizational: indicator.competencies?.organizational.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
        technical: indicator.competencies?.technical.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
        behavioural: indicator.competencies?.behavioural.reduce(
          (acc, competency) => {
            acc[competency.name] = competency.rating || 0;
            return acc;
          },
          {}
        ),
      });
    }
  }, [indicator]);

  if (!indicator) return null;

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
              onChange={() => handleRatingChange(category, name, rating)} // Update state on selection
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

  const handleUpdateIndicator = async (e) => {
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

    const updatedIndicator = { competencies: updatedCompetencies };

    try {
      const response = await putAPI(
        `/indicator/${indicator.id}`,
        updatedIndicator,
        true
      );

      if (!response.hasError) {
        toast.success("Indicator updated successfully!");
        onUpdateSuccess(response.data.data);
        closeModal();
      } else {
        toast.error("Failed to update indicator.");
      }
    } catch (error) {
      toast.error("An error occurred while updating indicator.");
      console.error("error", error);
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Indicator
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
              onSubmit={handleUpdateIndicator}
            >
              <input name="_method" type="hidden" defaultValue="PUT" />
              <input name="_token" type="hidden" />
              <div className="modal-body">
                <div className="row py-4">
                  <div className="col-md-12">
                    <div className="info text-sm">
                      <strong>Branch : </strong>
                      <span>{indicator.branch}</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-2">
                    <div className="info text-sm font-style">
                      <strong>Department : </strong>
                      <span>{indicator.department}</span>
                    </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="info text-sm font-style">
                      <strong>Designation : </strong>
                      <span>{indicator.designation}</span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-3">
                    <h6>Organizational Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicator.competencies?.organizational?.map((competency) => (
                    <React.Fragment key={competency.name}>
                      <div className="col-6">{competency.name}</div>
                      <div className="col-6">
                        {renderRating(
                          "organizational",
                          competency.name,
                          ratings.organizational[competency.name] ||
                            competency.rating
                        )}
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="col-md-12 mt-3">
                    <h6>Technical Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicator.competencies?.technical?.map((competency) => (
                    <React.Fragment key={competency.name}>
                      <div className="col-6">{competency.name}</div>
                      <div className="col-6">
                        {renderRating(
                          "technical",
                          competency.name,
                          ratings.technical[competency.name] ||
                            competency.rating
                        )}
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="col-md-12 mt-3">
                    <h6>Behavioural Competencies</h6>
                    <hr className="mt-0" />
                  </div>
                  {indicator.competencies?.behavioural?.map((competency) => (
                    <React.Fragment key={competency.name}>
                      <div className="col-6">{competency.name}</div>
                      <div className="col-6">
                        {renderRating(
                          "behavioural",
                          competency.name,
                          ratings.behavioural[competency.name] ||
                            competency.rating
                        )}
                      </div>
                    </React.Fragment>
                  ))}
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
  );
};

export default IndicatorUpdateModal;

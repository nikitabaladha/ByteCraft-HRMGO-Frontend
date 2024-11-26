import React from "react";
import "react-toastify/dist/ReactToastify.css";

const ViewIndicator = ({ appraisal }) => {
  if (!appraisal) {
    return null;
  }

  console.log("Appraisal data in ViewIndicator for view:", appraisal);

  const renderRating = (name, value, type = "appraisal") => {
    return (
      <fieldset id="demo1" className="rate">
        {[5, 4, 3, 2, 1].map((rating) => (
          <React.Fragment key={rating}>
            <input
              className="stars"
              type="radio"
              id={`${name}-${rating}-${type}`}
              name={`rating[${name}-${type}]`}
              value={rating}
              disabled
              checked={value === rating}
            />
            <label
              className="full"
              htmlFor={`${name}-${rating}-${type}`}
              title={`${rating} star${rating > 1 ? "s" : ""}`}
            />
          </React.Fragment>
        ))}
      </fieldset>
    );
  };

  return (
    <>
      <div className="col-md-4">
        <div className="modal-header">
          <h5
            className="modal-title"
            id="exampleModalLabel"
            style={{ marginBottom: "30px" }}
          >
            Indicator
          </h5>
        </div>
        <div className="body">
          <div className="modal-body">
            <div className="row">
              {appraisal.indicatorCompetencies?.organizational?.map(
                (competency) => (
                  <React.Fragment key={competency.name}>
                    <div className="col-md-12">
                      {renderRating(
                        competency.name,
                        competency.rating,
                        "indicator"
                      )}
                    </div>
                  </React.Fragment>
                )
              )}

              <div className="col-md-12 mt-5">
                <hr className="mt-0" />
              </div>
              {appraisal.indicatorCompetencies?.technical?.map((competency) => (
                <React.Fragment key={competency.name}>
                  <div className="col-md-12">
                    {renderRating(
                      competency.name,
                      competency.rating,
                      "indicator"
                    )}
                  </div>
                </React.Fragment>
              ))}

              <div className="col-md-12 mt-5">
                <hr className="mt-0" />
              </div>
              {appraisal.indicatorCompetencies?.behavioural?.map(
                (competency) => (
                  <React.Fragment key={competency.name}>
                    <div className="col-md-12">
                      {renderRating(
                        competency.name,
                        competency.rating,
                        "indicator"
                      )}
                    </div>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewIndicator;

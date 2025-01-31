import React from "react";

const IndicatorRating = ({ indicatorData }) => {
  console.log("Indicator from Appraisal", indicatorData);

  if (!indicatorData) return null;

  const renderRating = (name, value) => {
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
              disabled
              checked={value === rating}
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

  return (
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
        <input name="_method" type="hidden" defaultValue="PUT" />
        <input name="_token" type="hidden" />
        <div className="modal-body">
          <div className="row">
            {indicatorData.competencies?.organizational?.map((competency) => (
              <React.Fragment key={competency.name}>
                <div className="col-md-12">
                  {renderRating(competency.name, competency.rating)}
                </div>
              </React.Fragment>
            ))}

            <div className="col-md-12 mt-5">
              <hr className="mt-0" />
            </div>
            {indicatorData.competencies?.technical?.map((competency) => (
              <React.Fragment key={competency.name}>
                <div className="col-md-12">
                  {renderRating(competency.name, competency.rating)}
                </div>
              </React.Fragment>
            ))}

            <div className="col-md-12 mt-5">
              <hr className="mt-0" />
            </div>
            {indicatorData.competencies?.behavioural?.map((competency) => (
              <React.Fragment key={competency.name}>
                <div className="col-md-12">
                  {renderRating(competency.name, competency.rating)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorRating;

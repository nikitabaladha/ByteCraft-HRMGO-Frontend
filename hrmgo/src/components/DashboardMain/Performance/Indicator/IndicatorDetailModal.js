import React from "react";
import "react-toastify/dist/ReactToastify.css";

const IndicatorDetailModal = ({ closeModal, indicator }) => {
  if (!indicator) return null;

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
              Indicator Detail
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
                        {renderRating(competency.name, competency.rating)}
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
                        {renderRating(competency.name, competency.rating)}
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
                        {renderRating(competency.name, competency.rating)}
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicatorDetailModal;

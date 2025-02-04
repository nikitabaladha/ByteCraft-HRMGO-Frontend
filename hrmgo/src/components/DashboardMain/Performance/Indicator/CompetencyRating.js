import React, { useState } from "react";

const CompetencyRating = ({ onRatingChange }) => {
  const [ratings, setRatings] = useState({
    leadership: 0,
    projectManagement: 0,
    allocatingResources: 0,
    businessProcess: 0,
    oralCommunication: 0,
  });

  const handleRatingChange = (competency, rating) => {
    const updatedRatings = {
      ...ratings,
      [competency]: rating,
    };
    setRatings(updatedRatings);
    onRatingChange(competency, rating);
  };

  return (
    <div className="row">
      <div className="col-md-12 mt-3">
        <h6>Organizational Competencies</h6>
        <hr className="mt-0" />
      </div>

      <div className="col-6">Leadership</div>
      <div className="col-6">
        <fieldset className="rate">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={`leadership-${star}`}>
              <input
                className="stars"
                type="radio"
                id={`leadership-${star}`}
                name="rating[leadership]"
                checked={ratings.leadership === star}
                onChange={() => handleRatingChange("leadership", star)}
              />
              <label
                className="full"
                htmlFor={`leadership-${star}`}
                title={
                  star === 5
                    ? "Awesome - 5 stars"
                    : star === 4
                    ? "Pretty good - 4 stars"
                    : star === 3
                    ? "Meh - 3 stars"
                    : star === 2
                    ? "Kinda bad - 2 stars"
                    : "Sucks big time - 1 star"
                }
              />
            </React.Fragment>
          ))}
        </fieldset>
      </div>

      <div className="col-6">Project Management</div>
      <div className="col-6">
        <fieldset className="rate">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={`projectManagement-${star}`}>
              <input
                className="stars"
                type="radio"
                id={`projectManagement-${star}`}
                name="rating[projectManagement]"
                checked={ratings.projectManagement === star}
                onChange={() => handleRatingChange("projectManagement", star)}
              />
              <label
                className="full"
                htmlFor={`projectManagement-${star}`}
                title={
                  star === 5
                    ? "Awesome - 5 stars"
                    : star === 4
                    ? "Pretty good - 4 stars"
                    : star === 3
                    ? "Meh - 3 stars"
                    : star === 2
                    ? "Kinda bad - 2 stars"
                    : "Sucks big time - 1 star"
                }
              />
            </React.Fragment>
          ))}
        </fieldset>
      </div>

      <div className="col-md-12 mt-3">
        <h6>Technical Competencies</h6>
        <hr className="mt-0" />
      </div>

      <div className="col-6">Allocating Resources</div>
      <div className="col-6">
        <fieldset className="rate">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={`allocatingResources-${star}`}>
              <input
                className="stars"
                type="radio"
                id={`allocatingResources-${star}`}
                name="rating[allocatingResources]"
                checked={ratings.allocatingResources === star}
                onChange={() => handleRatingChange("allocatingResources", star)}
              />
              <label
                className="full"
                htmlFor={`allocatingResources-${star}`}
                title={
                  star === 5
                    ? "Awesome - 5 stars"
                    : star === 4
                    ? "Pretty good - 4 stars"
                    : star === 3
                    ? "Meh - 3 stars"
                    : star === 2
                    ? "Kinda bad - 2 stars"
                    : "Sucks big time - 1 star"
                }
              />
            </React.Fragment>
          ))}
        </fieldset>
      </div>

      <div className="col-md-12 mt-3">
        <h6>Behavioural Competencies</h6>
        <hr className="mt-0" />
      </div>

      <div className="col-6">Business Process</div>
      <div className="col-6">
        <fieldset className="rate">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={`businessProcess-${star}`}>
              <input
                className="stars"
                type="radio"
                id={`businessProcess-${star}`}
                name="rating[businessProcess]"
                checked={ratings.businessProcess === star}
                onChange={() => handleRatingChange("businessProcess", star)}
              />
              <label
                className="full"
                htmlFor={`businessProcess-${star}`}
                title={
                  star === 5
                    ? "Awesome - 5 stars"
                    : star === 4
                    ? "Pretty good - 4 stars"
                    : star === 3
                    ? "Meh - 3 stars"
                    : star === 2
                    ? "Kinda bad - 2 stars"
                    : "Sucks big time - 1 star"
                }
              />
            </React.Fragment>
          ))}
        </fieldset>
      </div>

      <div className="col-6">Oral Communication</div>
      <div className="col-6">
        <fieldset className="rate">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={`oralCommunication-${star}`}>
              <input
                className="stars"
                type="radio"
                id={`oralCommunication-${star}`}
                name="rating[oralCommunication]"
                checked={ratings.oralCommunication === star}
                onChange={() => handleRatingChange("oralCommunication", star)}
              />
              <label
                className="full"
                htmlFor={`oralCommunication-${star}`}
                title={
                  star === 5
                    ? "Awesome - 5 stars"
                    : star === 4
                    ? "Pretty good - 4 stars"
                    : star === 3
                    ? "Meh - 3 stars"
                    : star === 2
                    ? "Kinda bad - 2 stars"
                    : "Sucks big time - 1 star"
                }
              />
            </React.Fragment>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default CompetencyRating;

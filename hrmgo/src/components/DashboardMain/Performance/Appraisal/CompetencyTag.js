import React from "react";

const CompetencyTag = () => {
  return (
    <>
      <div className="col-md-4">
        <div style={{ marginTop: "68px" }}>
          <div className="col-md-12">
            <h6>Organizational Competencies</h6>
            <hr className="mt-0" />
          </div>
          <div className="mt-4">
            <div className="col-md-12 mb-4">Leadership</div>
            <div className="col-md-12">Project Management</div>
          </div>
        </div>

        <div style={{ marginTop: "45px" }}>
          <div className="col-md-12">
            <h6>Technical Competencies</h6>
            <hr className="mt-0" />
          </div>
          <div className="mt-4">
            <div className="col-md-12">Allocating Resources</div>
          </div>
        </div>

        <div style={{ marginTop: "40px" }}>
          <div className="col-md-12">
            <h6>Behavioural Competencies</h6>
            <hr className="mt-0" />
          </div>
          <div className="mt-4">
            <div className="col-md-12 mb-4">Business Process</div>
            <div className="col-md-12">Oral Communication</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompetencyTag;

import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateJobDescription = () => {
  return (
    <div>
      <div className="col-md-6">
        <div className="card card-fluid job-card">
          <div className="card-body ">
            <div className="row">
              <div className="form-group col-md-12">
                <label for="sescription" className="col-form-label">
                  Job Description
                </label>
                <span className="text-danger">*</span>
                <ReactQuill
                  value=""
                  theme="snow"
                  placeholder="Enter the description here"
                  style={{
                    height: "250px",
                    maxHeight: "300px",
                    minHeight: "200px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobDescription;

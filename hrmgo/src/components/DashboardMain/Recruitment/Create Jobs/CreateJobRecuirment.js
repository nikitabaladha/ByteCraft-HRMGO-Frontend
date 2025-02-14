import React from "react";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateJobRecuirment = () => {
  return (
    <div>
      <div className="col-md-6">
        <div className="card card-fluid job-card">
          <div className="card-body ">
            <div className="row">
              <div className="form-group col-md-12">
                <label for="requirement" className="col-form-label">
                  Job Requirement
                </label>
                <span className="text-danger">*</span>

                <Link
                  href="#"
                  data-size="md"
                  className="btn btn-primary btn-icon btn-sm float-end"
                  data-ajax-popup-over="true"
                  id="grammarCheck"
                  data-url="https://demo.workdo.io/hrmgo/grammar/grammar"
                  data-bs-placement="top"
                  data-title="Grammar check with AI"
                >
                  <i className="ti ti-rotate"></i>{" "}
                  <span>Grammar check with AI</span>
                </Link>

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

export default CreateJobRecuirment;

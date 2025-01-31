import React from 'react'
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateJobTermsAndCondition = () => {
  return (
    <div>
      <div className="col-md-12" id="termsandcondition" style={{display: 'none'}}>
        <div className="card card-fluid job-card">
          <div className="card-body ">
            <div className="row">
              <div className="form-group col-md-12">
                <label for="terms_and_conditions" className="col-form-label">
                  Terms And Conditions
                </label>
                <span className="text-danger">*</span>
                <ReactQuill
                  value=""
                  theme="snow"
                  placeholder="Enter the Terms and Condition here"
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
  )
}

export default CreateJobTermsAndCondition

import React from 'react';
import { toast } from "react-toastify";

const CompanySetting = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast("Company settings saved successfully!");
  };

  return (
    <div id="company-settings">
      <div className="card">
        <div className="card-header">
          <h5>Company Settings</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="company_name" className="col-form-label">Company Name *</label>
                <input
                  className="form-control"
                  placeholder="Enter Company Name"
                  name="company_name"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_address" className="col-form-label">Address</label>
                <input
                  className="form-control"
                  placeholder="Enter Address"
                  name="company_address"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_city" className="col-form-label">City</label>
                <input
                  className="form-control"
                  placeholder="Enter City"
                  name="company_city"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_state" className="col-form-label">State</label>
                <input
                  className="form-control"
                  placeholder="Enter State"
                  name="company_state"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_zipcode" className="col-form-label">Zip/Post Code</label>
                <input
                  className="form-control"
                  placeholder="Enter Zip/Post Code"
                  name="company_zipcode"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_country" className="col-form-label">Country</label>
                <input
                  className="form-control"
                  placeholder="Enter Country"
                  name="company_country"
                  type="text"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_telephone" className="col-form-label">Telephone</label>
                <input
                  className="form-control"
                  placeholder="Enter Telephone"
                  name="company_telephone"
                  type="text"
                />
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="company_start_time" className="col-form-label">Company Start Time *</label>
                    <input
                      className="form-control"
                      name="company_start_time"
                      type="time"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="company_end_time" className="col-form-label">Company End Time *</label>
                    <input
                      className="form-control"
                      name="company_end_time"
                      type="time"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="timezone" className="col-form-label text-dark">Timezone</label>
                <select name="timezone" className="form-control">
                  {/* You can populate this select with a list of timezones if needed */}
                  <option value="UTC">UTC</option>
                  <option value="GMT">GMT</option>
                  <option value="EST">EST</option>
                  {/* Add more timezones as required */}
                </select>
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            <button className="btn-submit btn btn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetting;

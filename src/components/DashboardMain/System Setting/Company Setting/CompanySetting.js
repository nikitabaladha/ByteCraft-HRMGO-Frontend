import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { toast } from "react-toastify";
import putAPI from '../../../../api/putAPI';
import getAPI from '../../../../api/getAPI';


const CompanySetting = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    company_address: '',
    company_city: '',
    company_state: '',
    company_zipcode: '',
    company_country: '',
    company_telephone: '',
    company_start_time: '',
    company_end_time: '',
    timezone: '',
  });

  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const fetchCompanySettings = async () => {
      try {
        const response = await getAPI('/get-company-setting');
        const system = response.data.data; 
          setFormData({
            company_name: system.company_name || '',
            company_address: system.company_address || '',
            company_city: system.company_city || '',
            company_state: system.company_state || '',
            company_zipcode: system.company_zipcode || '',
            company_country: system.company_country || '',
            company_telephone: system.company_telephone || '',
            company_start_time: system.company_start_time || '',
            company_end_time: system.company_end_time || '',
            timezone: system.timezone || '',
          }); 
      } catch (error) {
        console.error('Error fetching company settings:', error);
        toast.error('Failed to fetch company settings');
      }
    };

    const allTimezones = moment.tz.names();
    setTimezones(allTimezones);

    fetchCompanySettings(); // Fetch data on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putAPI("/update-company-setting", formData);
      if (response.data.success) {
        console.log("Company setting successfully updated:", response.data);
        toast.success("Company setting successfully updated!");
      }
    } catch (error) {
      console.error("Error updating company setting:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the company setting"
      );
    }
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
                  value={formData.company_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_address" className="col-form-label">Address</label>
                <input
                  className="form-control"
                  placeholder="Enter Address"
                  name="company_address"
                  type="text"
                  value={formData.company_address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_city" className="col-form-label">City</label>
                <input
                  className="form-control"
                  placeholder="Enter City"
                  name="company_city"
                  type="text"
                  value={formData.company_city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_state" className="col-form-label">State</label>
                <input
                  className="form-control"
                  placeholder="Enter State"
                  name="company_state"
                  type="text"
                  value={formData.company_state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_zipcode" className="col-form-label">Zip/Post Code</label>
                <input
                  className="form-control"
                  placeholder="Enter Zip/Post Code"
                  name="company_zipcode"
                  type="text"
                  value={formData.company_zipcode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_country" className="col-form-label">Country</label>
                <input
                  className="form-control"
                  placeholder="Enter Country"
                  name="company_country"
                  type="text"
                  value={formData.company_country}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="company_telephone" className="col-form-label">Telephone</label>
                <input
                  className="form-control"
                  placeholder="Enter Telephone"
                  name="company_telephone"
                  type="text"
                  value={formData.company_telephone}
                  onChange={handleInputChange}
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
                      value={formData.company_start_time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="company_end_time" className="col-form-label">Company End Time *</label>
                    <input
                      className="form-control"
                      name="company_end_time"
                      type="time"
                      value={formData.company_end_time}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="timezone" className="col-form-label text-dark">Timezone</label>
                <select
                  name="timezone"
                  className="form-control"
                  value={formData.timezone}
                  onChange={handleInputChange}
                >
                  {timezones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
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

import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import putAPI from '../../../../api/putAPI';
import getAPI from '../../../../api/getAPI'; 

const SystemSettings = () => {
  const [formData, setFormData] = useState({
    siteCurrency: '',
    siteCurrencySymbol: '',
    siteDateFormat: '',
    siteTimeFormat: '',
    employeePrefix: '',
  });

  // Fetch system settings on page load
  useEffect(() => {
    const fetchSystemSettings = async () => {
      try {
        const response = await getAPI("/get-system-setting"); 
          const settings = response.data.data;
          setFormData({
            siteCurrency: settings.siteCurrency || '',
            siteCurrencySymbol: settings.siteCurrencySymbol || '',
            siteDateFormat: settings.siteDateFormat || '',
            siteTimeFormat: settings.siteTimeFormat || '',
            employeePrefix: settings.employeePrefix || '',
          });
      } catch (error) {
        toast.error("Error fetching system settings: " + (error.response?.data?.message || error.message));
      }
    };

    fetchSystemSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await putAPI("/update-system-setting", formData); 
      if (response.data.success) {
        console.log("System settings updated successfully:", response.data);
        toast("System settings updated successfully!");

        // Reset formData with the updated values from the response
        setFormData({
          siteCurrency: response.data.data.siteCurrency,
          siteCurrencySymbol: response.data.data.siteCurrencySymbol,
          siteDateFormat: response.data.data.siteDateFormat,
          siteTimeFormat: response.data.data.siteTimeFormat,
          employeePrefix: response.data.data.employeePrefix,
        });
      }
    } catch (error) {
      toast.error("Error updating system settings:", error.response?.data || error.message);
      toast(
        error.response?.data?.message ||
          "An error occurred while updating the system settings"
      );
    }
  };

  return (
    <div>
      <div id="system-settings">
        <div className="card">
          <div className="card-header">
            <h5>System Settings</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row company-setting">
                {/* Currency */}
                <div className="form-group col-md-4">
                  <label htmlFor="site_currency" className="col-form-label">Currency *</label>
                  <input
                    className="form-control"
                    name="siteCurrency"
                    type="text"
                    value={formData.siteCurrency}
                    onChange={handleChange}
                    id="site_currency"
                  />
                  <small className="text-xs">
                    Note: Add currency code as per three-letter ISO code.
                    <a href="https://stripe.com/docs/currencies" target="_blank" rel="noopener noreferrer">
                      You can find out how to do that here.
                    </a>
                  </small>
                </div>

                {/* Currency Symbol */}
                <div className="form-group col-md-4">
                  <label htmlFor="site_currency_symbol" className="col-form-label">Currency Symbol *</label>
                  <input
                    className="form-control"
                    name="siteCurrencySymbol"
                    type="text"
                    value={formData.siteCurrencySymbol}
                    onChange={handleChange}
                    id="site_currency_symbol"
                  />
                </div>
                {/* Date Format */}
                <div className="form-group col-md-4">
                  <label htmlFor="site_date_format" className="col-form-label">Date Format</label>
                  <select
                    name="siteDateFormat"
                    className="form-control"
                    id="site_date_format"
                    value={formData.siteDateFormat}
                    onChange={handleChange}
                  >
                    <option >Select Format</option>
                    <option value="d-m-Y">dd-mm-yyyy</option>
                  </select>
                </div>

                {/* Time Format */}
                <div className="form-group col-md-4">
                  <label htmlFor="site_time_format" className="col-form-label">Time Format</label>
                  <select
                    name="siteTimeFormat"
                    className="form-control"
                    id="site_time_format"
                    value={formData.siteTimeFormat}
                    onChange={handleChange}
                  >
                    <option >Select Format</option>
                    <option value="g:i A">10:30 PM</option>
                  </select>
                </div>

                {/* Employee Prefix */}
                <div className="form-group col-md-4">
                  <label htmlFor="employee_prefix" className="col-form-label">Employee Prefix</label>
                  <input
                    className="form-control"
                    name="employeePrefix"
                    type="text"
                    value={formData.employeePrefix}
                    onChange={handleChange}
                    id="employee_prefix"
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="col-sm-12 px-2">
                <div className="text-end">
                  <button className="btn btn-xs btn-primary" type="submit">Save Changes</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

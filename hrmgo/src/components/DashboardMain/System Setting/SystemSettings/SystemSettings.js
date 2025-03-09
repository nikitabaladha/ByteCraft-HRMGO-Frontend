import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import putAPI from '../../../../api/putAPI';
import getAPI from '../../../../api/getAPI'; 

const SystemSettings = () => {
  const [formData, setFormData] = useState({
    siteCurrency: '',
    siteCurrencySymbol: '',
    employeePrefix: '',
  });

  useEffect(() => {
    const fetchSystemSettings = async () => {
      try {
        const response = await getAPI("/get-system-setting"); 
          const settings = response.data.data;
          setFormData({
            siteCurrency: settings.siteCurrency || '',
            siteCurrencySymbol: settings.siteCurrencySymbol || '',
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
      if (response.data) {
        toast("System settings updated successfully!");

        setFormData({
          siteCurrency: response.data.data.siteCurrency,
          siteCurrencySymbol: response.data.data.siteCurrencySymbol,
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
                  <label htmlFor="site_currency" className="col-form-label text-dark">Currency *</label>
                  <input
                    className="form-control"
                    name="siteCurrency"
                    type="text"
                    value={formData.siteCurrency}
                    onChange={handleChange}
                    id="site_currency"
                  />
                  
                </div>

                {/* Currency Symbol */}
                <div className="form-group col-md-4">
                  <label htmlFor="site_currency_symbol" className="col-form-label text-dark">Currency Symbol *</label>
                  <input
                    className="form-control"
                    name="siteCurrencySymbol"
                    type="text"
                    value={formData.siteCurrencySymbol}
                    onChange={handleChange}
                    id="site_currency_symbol"
                  />
                </div>
               
                <div className="form-group col-md-4">
                  <label htmlFor="employee_prefix" className="col-form-label text-dark">Employee Prefix</label>
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

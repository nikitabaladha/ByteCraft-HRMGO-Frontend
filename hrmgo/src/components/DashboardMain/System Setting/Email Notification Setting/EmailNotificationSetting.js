import getAPI from "../../../../api/getAPI";
import postAPI from "../../../../api/postAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EmailNotificationSetting = () => {
  const [settings, setSettings] = useState({
    newUser: false,
    newEmployee: false,
    newPayroll: false,
    newTicket: false,
    newAward: false,
    employeeTransfer: false,
    employeeResignation: false,
    employeeTrip: false,
    employeePromotion: false,
    employeeComplaints: false,
    employeeWarning: false,
    employeeTermination: false,
    leaveStatus: false,
    contract: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI("/get-email-notification");
        console.log("API Response:", response.data.data);
  
        const mappedData = {
          newUser: response.data.data.newUser || false,
          newEmployee: response.data.data.newEmployee || false,
          newPayroll: response.data.data.newPayroll || false,
          newTicket: response.data.data.newTicket || false,
          newAward: response.data.data.newAward || false,
          employeeTransfer: response.data.data.employeeTransfer || false,
          employeeResignation: response.data.data.employeeResignation || false,
          employeeTrip: response.data.data.employeeTrip || false,
          employeePromotion: response.data.data.employeePromotion || false,
          employeeComplaints: response.data.data.employeeComplaints || false,
          employeeWarning: response.data.data.employeeWarning || false,
          employeeTermination: response.data.data.employeeTermination || false,
          leaveStatus: response.data.data.leaveStatus || false,
          contract: response.data.data.contract || false,
        };
  
        setSettings(mappedData);
      } catch (err) {
        toast.error("Error fetching email notification settings:", err);
      }
    };
    fetchSettings();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await postAPI(
  //       "/save-update-email-notification",
  //       settings
  //     );
  //     const data = await response.json();
  //     if (data.success) {
  //       toast("Settings saved successfully!");
  //     } else {
  //       toast("Failed to save settings.");
  //     }
  //   } catch (error) {
  //     // console.error('Error saving settings:', error);
  //     toast.error("An error occurred while saving settings.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await postAPI("/save-update-email-notification", settings);
      toast.success("Email notification setting change successfully!");
    } catch (err) {
      toast.error("Failed to update email notification settings.");
    }
  };

  return (
    <div>
      <div id="email-notification-settings" className="card">
        <div className="col-md-12">
          <div className="card-header">
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-8">
                <h5>Email Notification Settings</h5>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="row">
              {/* New User */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      New User
                    </label>
                    <input
                      className="form-check-input"
                      name="newUser"
                      type="checkbox"
                      checked={settings.newUser}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* New Employee */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      New Employee
                    </label>
                    <input
                      className="form-check-input"
                      name="newEmployee"
                      type="checkbox"
                      checked={settings.newEmployee}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* New Payroll */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      New Payroll
                    </label>
                    <input
                      className="form-check-input"
                      name="newPayroll"
                      type="checkbox"
                      checked={settings.newPayroll}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Add more fields similarly */}
              {/* Example: New Ticket */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      New Ticket
                    </label>
                    <input
                      className="form-check-input"
                      name="newTicket"
                      type="checkbox"
                      checked={settings.newTicket}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      New Award
                    </label>
                    <input
                      className="form-check-input"
                      name="newAward"
                      type="checkbox"
                      checked={settings.newAward}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Transfer */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Transfer
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeTransfer"
                      type="checkbox"
                      checked={settings.employeeTransfer}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Resignation */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Resignation
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeResignation"
                      type="checkbox"
                      checked={settings.employeeResignation}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Trip */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Trip
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeTrip"
                      type="checkbox"
                      checked={settings.employeeTrip}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Promotion */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Promotion
                    </label>
                    <input
                      className="form-check-input"
                      name="employeePromotion"
                      type="checkbox"
                      checked={settings.employeePromotion}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Complaints */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Complaints
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeComplaints"
                      type="checkbox"
                      checked={settings.employeeComplaints}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Warning */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Warning
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeWarning"
                      type="checkbox"
                      checked={settings.employeeWarning}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Termination */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Employee Termination
                    </label>
                    <input
                      className="form-check-input"
                      name="employeeTermination"
                      type="checkbox"
                      checked={settings.employeeTermination}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Leave Status */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Leave Status
                    </label>
                    <input
                      className="form-check-input"
                      name="leaveStatus"
                      type="checkbox"
                      checked={settings.leaveStatus}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>

              {/* Contract */}
              <div className="col-lg-4 col-md-6 col-sm-6 form-group">
                <div className="list-group">
                  <div className="list-group-item form-switch form-switch-right">
                    <label className="form-label" style={{ marginLeft: "5%" }}>
                      Contract
                    </label>
                    <input
                      className="form-check-input"
                      name="contract"
                      type="checkbox"
                      checked={settings.contract}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-footer text-end">
            <button
              className="btn-submit btn btn-primary"
              type="button"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailNotificationSetting;

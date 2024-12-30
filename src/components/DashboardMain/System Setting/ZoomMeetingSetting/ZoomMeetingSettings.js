import React, { useState, useEffect} from 'react';
import { toast } from "react-toastify";
import putAPI from '../../../../api/putAPI';
import getAPI from '../../../../api/getAPI';

const ZoomMeetingSettings = () => {
  const [zoomAccountId, setZoomAccountId] = useState('');
  const [zoomClientId, setZoomClientId] = useState('');
  const [zoomClientSecret, setZoomClientSecret] = useState('');
  const [message, setMessage] = useState('');

  const [showAccountId, setShowAccountId] = useState(false);
  const [showClientId, setShowClientId] = useState(false);
  const [showClientSecret, setShowClientSecret] = useState(false);

  useEffect(() => {
    const fetchZoomSettings = async () => {
      try {
        const response = await getAPI('/get-zoom-setting'); 
        const { zoom_account_id, zoom_client_id, zoom_client_secret } = response.data.data;

        // Set fetched data into state
        setZoomAccountId(zoom_account_id);
        setZoomClientId(zoom_client_id);
        setZoomClientSecret(zoom_client_secret);
      } catch (error) {
        toast.error('Error fetching Zoom settings');
      }
    };

    fetchZoomSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI('/update-zoom-setting', {
        zoom_account_id: zoomAccountId,
        zoom_client_id: zoomClientId,
        zoom_client_secret: zoomClientSecret,
      });
      toast("Zoom Setting Created Successfully")
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error saving Zoom settings');
      toast('Error saving Zoom settings')
    }
  };

  const toggleVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  return (
    <div id="zoom-meeting-settings">
      <div className="card">
        <div className="card-header">
          <h5>Zoom Meeting Settings</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <label htmlFor="zoom_account_id" className="col-form-label">
                  Zoom Account ID
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Zoom Account ID"
                  name="zoom_account_id"
                  type={showAccountId ? "text" : "password"}
                  value={zoomAccountId}
                  onChange={(e) => setZoomAccountId(e.target.value)}
                  id="zoom_account_id"
                />
                <span
                    className="input-icon"
                    onClick={() => toggleVisibility(setShowAccountId)}
                    style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                  >
                    {showAccountId ? "🙈" : "👁️"}
                  </span>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <label htmlFor="zoom_client_id" className="col-form-label">
                  Zoom Client ID
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Zoom Client ID"
                  name="zoom_client_id"
                  type="password"
                  value={zoomClientId}
                  onChange={(e) => setZoomClientId(e.target.value)}
                  id="zoom_client_id"
                />
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 form-group">
                <label htmlFor="zoom_client_secret" className="col-form-label">
                  Zoom Client Secret Key
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Zoom Client Secret Key"
                  name="zoom_client_secret"
                  type="password"
                  value={zoomClientSecret}
                  onChange={(e) => setZoomClientSecret(e.target.value)}
                  id="zoom_client_secret"
                />
              </div>
            </div>
          </div>
          <div className="card-footer text-end">
            <button className="btn-submit btn btn-primary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
        {message && <div className="alert alert-info">{message}</div>}
      </div>
    </div>
  );
};

export default ZoomMeetingSettings;

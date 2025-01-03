
import React, { useState, useEffect } from 'react';
const BusinessSetting = () => {
  const [titleText, setTitleText] = useState('HRMGo');
  const [footerText, setFooterText] = useState('2024 HRMGo');
  const [defaultLanguage, setDefaultLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file);
    }
  };

  const handleDarkModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  



  return (
    <div className="card">
      <div className="card-header">
        <h5>Business Settings</h5>
      </div>
      <div className="card-body">
        <div className="row">
          {['dark', 'light', 'favicon'].map((type) => (
            <div className="col-lg-4" key={type}>
              <div className="card">
                <div className="card-header">
                  <h5>{`Logo ${type}`}</h5>
                </div>
                <div className="card-body">
                  <div className="setting-card">
                    <div className="logo-content mt-4">
                      <a
                        href={`https://demo.workdo.io/hrmgo/storage/uploads/logo/logo-${type}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          alt={`Logo ${type}`}
                          src={`https://demo.workdo.io/hrmgo/storage/uploads/logo/logo-${type}.png`}
                          width={type === 'favicon' ? 50 : 150}
                          className="big-logo"
                        />
                      </a>
                    </div>
                    <div className="choose-files mt-5">
                      <input
                        type="file"
                        id={`logo-${type}`}
                        className="d-none"
                        accept="image/png"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor={`logo-${type}`}
                        className="form-label choose-files bg-primary"
                      >
                        Choose file here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="title_text" className="col-form-label">
              Title Text
            </label>
            <input
              type="text"
              className="form-control"
              id="title_text"
              value={titleText}
              onChange={(e) => setTitleText(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="footer_text" className="col-form-label">
              Footer Text
            </label>
            <input
              type="text"
              className="form-control"
              id="footer_text"
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group col-md-3">
          <label htmlFor="default_language" className="col-form-label">Default Language</label>
          <select
            name="default_language"
            id="default_language"
            className="form-control"
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.target.value)}
          >
            <option value="ar">Arabic</option>
            <option value="zh">Chinese</option>
            <option value="da">Danish</option>
            <option value="de">German</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="he">Hebrew</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="nl">Dutch</option>
            <option value="pl">Polish</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="tr">Turkish</option>
            <option value="pt-br">Portuguese(Brazil)</option>
          </select>
        </div>

        <h5 className="mt-3 mb-3">Theme Customizer</h5>
        <div className="setting-card setting-logo-box p-3">
          <div className="col-12">
            <div className="pct-body">
              <div className="row">
                <div className="col-sm-4">
                  <h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-credit-card me-2"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Primary color Settings
                  </h6>
                  <hr className="my-2" />
                  <div className="color-wrp">
                    <div className="theme-color themes-color">
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-1"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-1"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-2"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-2"
                      />
                      <button
                        type="button"
                        className="themes-color-change active_color"
                        data-value="theme-3"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-3"
                        checked
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-4"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-4"
                      />
                      <br />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-5"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-5"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-6"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-6"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-7"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-7"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-8"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-8"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-9"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-9"
                      />
                      <button
                        type="button"
                        className="themes-color-change"
                        data-value="theme-10"
                      ></button>
                      <input
                        type="radio"
                        className="theme_color d-none"
                        name="color"
                        value="theme-10"
                      />
                    </div>
                    <div className="color-picker-wrp">
                      <input
                        type="color"
                        value="theme-3"
                        className="colorPicker"
                        name="custom_color"
                        id="color-picker"
                      />
                      <input type="hidden" name="color_flag" value="false" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-layout me-2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    Sidebar Settings
                  </h6>
                  <hr className="my-2" />
                  <div className="form-check form-switch">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="cust-theme-bg"
                      name="cust_theme_bg"
                      checked
                    />
                    <label
                      className="form-check-label f-w-600 pl-1"
                      htmlFor="cust-theme-bg"
                    >
                      Transparent layout
                    </label>
                  </div>
                </div>
                <div className="col-sm-4">
                  <h6>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-sun me-2"
                    >
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    Layout Settings
                  </h6>
                  <hr className="my-2" />
                  <div className="form-check form-switch mt-2">
                  <input
        type="checkbox"
        className="form-check-input"
        id="cust-darklayout"
        name="cust_darklayout"
        checked={isDarkMode}
        onChange={handleDarkModeChange}
        
      />
                    <label
                      className="form-check-label f-w-600 pl-1 ms-2"
                      htmlFor="cust-darklayout"
                    >
                      Dark Layout
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer text-end">
          <input
            className="btn btn-xs btn-primary"
            type="submit"
            value="Save Changes"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessSetting;

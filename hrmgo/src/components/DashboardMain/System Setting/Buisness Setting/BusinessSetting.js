import { useContext } from "react";
import { ThemeContext } from "../../../../js/ThemeProvider";
import { Link } from "react-router-dom";

const BusinessSetting = () => {
  const { isDarkLayout, activeTheme, toggleDarkLayout, changeTheme } =
    useContext(ThemeContext);

  return (
    <div className="card">
      <div className="card-header">
        <h5>Business Settings</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <h5 className="mt-3 mb-3">Theme Customizer</h5>
          <div className="setting-card setting-logo-box p-3">
            <div className="col-12">
              <div className="pct-body">
                <div className="row">
                  <div className="col-sm-4">
                    <h6>Primary Color Settings</h6>
                    <hr className="my-2" />
                    <div className="color-wrp">
                      <div className="theme-color themes-color me-2">
                        {[
                          "theme-1",
                          "theme-2",
                          "theme-3",
                          "theme-4",
                          "theme-5",
                          "theme-6",
                          "theme-7",
                          "theme-8",
                          "theme-9",
                          "theme-10",
                        ].map((theme) => (
                          <Link
                            key={theme}
                            href="#!"
                            className={`themes-color-change ${
                              activeTheme === theme ? "active_color" : ""
                            }`}
                            data-value={theme}
                            onClick={() => changeTheme(theme)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <h6>Layout Settings</h6>
                    <hr className="my-2" />
                    <div className="form-check form-switch mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="cust-darklayout"
                        name="cust_darklayout"
                        checked={isDarkLayout}
                        onChange={toggleDarkLayout}
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
        </div>
      </div>
    </div>
  );
};

export default BusinessSetting;

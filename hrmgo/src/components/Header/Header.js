import React from "react";

import { Link } from "react-router-dom";

const Header = ({ toggleSidebar, name, imagePreview, profileImage }) => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");

    window.location.href = "/login";
  };

   return (
    <header className="dash-header transprent-bg">
      <div className="header-wrapper">
        <div className="me-auto dash-mob-drp">
          <ul className="list-unstyled">
            <li className="dash-h-item mob-hamburger">
              <Link
                to="#!"
                className="dash-head-link"
                id="mobile-collapse"
                onClick={toggleSidebar}
              >
                <div className="hamburger hamburger--arrowturn">
                  <div className="hamburger-box">
                    <div className="hamburger-inner"></div>
                  </div>
                </div>
              </Link>
            </li>

            <li className="dropdown dash-h-item drp-company">
              <Link
                className="dash-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <span className="theme-avtar">
                  <img
                    alt="User Avatar"
                    src={profileImage}
                    className="img-fluid rounded border-2 border border-primary"
            style={{ width: '100%', height: '100%' }}
                  />
                </span>
                <span className="ms-2">
                  Hi, {name}
                  <i className="ti ti-chevron-down drp-arrow nocolor"></i>
                </span>
              </Link>
              <div className="dropdown-menu dash-h-dropdown">
                <Link to="/dashboard/account-setting" className="dropdown-item">
                  {/* <FiUser /> */}
                  <i className="ti ti-user"></i>
                  <span>My Profile</span>
                </Link>

                <Link className="dropdown-item" onClick={handleLogout}>
                  {/* <IoPower /> */}
                  <i className="ti ti-power"></i>
                  <span>Logout</span>
                </Link>
                <form
                  id="logout-form"
                  method="POST"
                  style={{ display: "none" }}
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="pkX4v0W6csqzjuYqeZpAhGPsJWaWz4kwSn169bGi"
                    autoComplete="off"
                  />
                </form>
              </div>
            </li>
          </ul>
        </div>

        <div className="ms-auto">
          <ul className="list-unstyled">

          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

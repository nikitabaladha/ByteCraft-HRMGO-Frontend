import React from "react";

import { Link } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { IoPower } from "react-icons/io5";
import { FaRegCommentDots } from "react-icons/fa";
import { TbMessage2 } from "react-icons/tb";

const Header = ({ toggleSidebar, name }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("toastShown");

    window.location.href = "/login";
  };

  return (
    <header className="dash-header transprent-bg">
      <div className="header-wrapper">
        <div className="me-auto dash-mob-drp">
          <ul className="list-unstyled">
            <li className="dash-h-item mob-hamburger">
              <Link
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
                    src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//owner.jpg"
                    className="img-fluid rounded-circle"
                    style={{ width: "100%" }}
                  />
                </span>
                <span className="hide-mob ms-2">
                  Hi, {name}
                  <IoIosArrowDown className="drp-arrow nocolor hide-mob" />
                </span>
              </Link>
              <div className="dropdown-menu dash-h-dropdown">
                <Link
                  to="https://demo.workdo.io/hrmgo/profile"
                  className="dropdown-item"
                >
                  <FiUser />
                  <span>My Profile</span>
                </Link>

                <Link className="dropdown-item" onClick={handleLogout}>
                  <IoPower />
                  <span>Logout</span>
                </Link>
                <form
                  id="logout-form"
                  action="https://demo.workdo.io/hrmgo/logout"
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
            <li className="dash-h-item">
              <Link
                className="dash-head-link me-0"
                to="https://demo.workdo.io/hrmgo/chats"
              >
                <i>
                  <FaRegCommentDots />
                </i>
                <span className="bg-danger dash-h-badge message-counter custom_messanger_counter">
                  0<span className="sr-only"></span>
                </span>
              </Link>
            </li>

            <li className="dropdown dash-h-item drp-notification">
              <Link
                className="dash-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i>
                  <TbMessage2 />
                </i>
                <span className="bg-danger dash-h-badge message-counter custom_messanger_counter">
                  0<span className="sr-only"></span>
                </span>
              </Link>
              <div className="dropdown-menu dash-h-dropdown dropdown-menu-end">
                <div className="noti-header">
                  <h5 className="m-0">Messages</h5>
                  <Link
                    to="#"
                    className="dash-head-link mark_all_as_read_message"
                  >
                    Clear All
                  </Link>
                </div>
                <div className="noti-body dropdown-list-message-msg">
                  <table className="count-listOfContacts"></table>
                </div>
                <div className="noti-footer">
                  <div className="d-grid">
                    <Link
                      to="https://demo.workdo.io/hrmgo/chats"
                      className="btn dash-head-link justify-content-center text-primary mx-0"
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

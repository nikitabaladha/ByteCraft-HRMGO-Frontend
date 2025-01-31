import React from "react";
import { Link } from "react-router-dom";

const CareerHeader = () => {
  return (
    <>
      <section className="job-banner">
        <nav className="navbar">
          <div className="container">
            <Link className="navbar-brand" href="#">
              <img
                src="https://demo.workdo.io/hrmgo/storage/uploads/logo//logo-light.png?1734938390"
                alt="logo"
                style={{ width: "90px" }}
              />
            </Link>
          </div>
        </nav>
        <div className="job-banner-bg">
          <img
            src="https://demo.workdo.io/hrmgo/storage/uploads/job/banner.png"
            alt=""
          />
        </div>
        <div className="container">
          <div className="job-banner-content text-center text-white">
            <h1 className="text-white mb-3">
              We help <br /> businesses grow
            </h1>
            <p>Work there. Find the dream job you’ve always wanted..</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerHeader;

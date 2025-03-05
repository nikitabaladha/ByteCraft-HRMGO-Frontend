import React from "react";
import { Link } from "react-router-dom";

const CareerHeader = () => {
  return (
    <>
      <section className="job-banner">
        <nav className="navbar">
          <div className="container d-flex">
            <Link className="navbar-brand" href="#">
              <img
                src="/storage/uploads/logo/White-Logo (2).png"
                alt="logo"
                style={{ width: "160px", height:"55px" }} 
              />
            </Link>

             <ul className="breadcrumb">
                          <li className="breadcrumb-item">
                            <a className="text-white" style={{ fontSize:"18px"}} href="/dashboard">Home</a>
                          </li>
                        </ul>
          </div>
        </nav>
        <div className="job-banner-bg">
          <img
            src="/storage/uploads/logo/banner.png"
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

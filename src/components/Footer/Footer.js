import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="dash-footer">
        <div className="footer-wrapper">
          <div className="py-1">
            <span className="text-muted">©  {new Date().getFullYear()} HRMSync</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

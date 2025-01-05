import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [fullName, setFullName] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      const userFullName = `${userDetails.firstName} ${userDetails.lastName}`;
      setFullName(userFullName);
      toast.success(`Welcome, ${userFullName}`);
    }
  }, []);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} fullName={fullName} />
      <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      <section className="dash-container">
        <div className="dash-content">
          {/* The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DashboardMain;

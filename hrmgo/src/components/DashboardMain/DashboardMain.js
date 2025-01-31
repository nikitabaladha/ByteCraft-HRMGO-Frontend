import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const DashboardMain = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [name, setName] = useState("");

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const toastShown = localStorage.getItem("toastShown");
    if (userDetails) {
      const userName = `${userDetails.name}`;
      setName(userName);
      if (toastShown !== "true") {
        toast.success(`Welcome, ${userName}!`);
        localStorage.setItem("toastShown", "true");
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Header toggleSidebar={toggleSidebar} name={name} />
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

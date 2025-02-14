import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// This function is the main component of the dashboard
const DashboardMain = () => {
  // This state variable is used to control the visibility of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // This state variable is used to store the user's name
  const [name, setName] = useState("");

  // This function is used to toggle the visibility of the sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // This useEffect hook is used to get the user's details from local storage and set the name state variable
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
      {/* This component is used to display the toast messages */}

      {/* This component is used to display the header */}
      <Header toggleSidebar={toggleSidebar} name={name} />
      {/* This component is used to display the sidebar */}
      <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />

      {/* This section is used to display the content of the dashboard */}
      <section className="dash-container">
        <div className="dash-content">
          {/* The Outlet component will render the matched child route */}
          <Outlet />
        </div>
      </section>

      {/* This component is used to display the footer */}
      <Footer />
    </>
  );
};

export default DashboardMain;

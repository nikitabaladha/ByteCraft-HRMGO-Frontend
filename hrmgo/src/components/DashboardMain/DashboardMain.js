import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import getAPI from "../../api/getAPI";

const DashboardMain = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [name, setName] = useState("");

  // const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     profile: null,
  //   });

  const [profileImage, setProfileImage] = useState(null);
  
  const [imagePreview, setImagePreview] = useState("");

   
      const fetchUserDetails = async () => {
        try {
          const response = await getAPI("/get-user-details", {}, true);
          if (!response.hasError && response.data) {
            const user = response.data.data;
            // const profile = response.data.data;
            const profilePath = user.profileImage.startsWith("/")
              ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${user.profileImage}`
              : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/Images/profilePicture/default-avatar.png`;
  
            // setFormData({
            //   name: user.name || "",
            //   email: user.email || "",
            // });
            setProfileImage(profilePath);
            setImagePreview(profilePath);
          } else {
            toast.error("Failed to fetch User data.");
          }
        } catch (error) {
          console.error("Error fetching User data:", error);
          toast.error("An error occurred while fetching User data.");
        }
      };
      useEffect(() => {
      fetchUserDetails();
    }, []);

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
      <Header toggleSidebar={toggleSidebar} name={name} imagePreview={imagePreview} profileImage={profileImage}/>

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

import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import BusinessSetting from "./Buisness Setting/BusinessSetting";
import CompanySetting from "./Company Setting/CompanySetting";
import { useMemo } from "react";
import SystemSettings from "./SystemSettings/SystemSettings";
import ZoomMeetingSettings from "./ZoomMeetingSetting/ZoomMeetingSettings";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("businessSettings");

  const menuItems = useMemo(
    () => [
      { id: "businessSettings", label: "Business Settings" },
      { id: "companySettings", label: "Company Settings" },
      { id: "systemSettings", label: "System Settings"},
      {id: "zoomMeetingSettings", label: "Zoom Meeting Settings"},
    ],
    []
  ); 

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeItem;
 
      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const { top, bottom } = section.getBoundingClientRect();
 
       
          if (top <= window.innerHeight / 2 && bottom >= window.innerHeight / 2) {
            currentSection = item.id;
          }
        }
      });
 
      if (currentSection !== activeItem) {
        setActiveItem(currentSection);
      }
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeItem, menuItems]);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="row">
      {/* Sidebar */}
      <div className="col-xl-3">
        <div className="card sticky-top">
          <div className="list-group list-group-flush" id="useradd-sidenav">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.id)}
                className={`list-group-item list-group-item-action border-0${
                  activeItem === item.id ? " active" : ""
                }`}
              >
                {item.label}
                <div className="float-end">
                  <IoIosArrowForward />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-xl-9">
        {/* Business Settings Section */}
        <div
          id="businessSettings"
        >
          <BusinessSetting />
        </div>

        {/* Company Settings Section */}
        <div
          id="companySettings"
        >
          <CompanySetting />
        </div>

        <div
          id="systemSettings"
        >
          <SystemSettings />
        </div>

        <div
          id="zoomMeetingSettings"
        >
          <ZoomMeetingSettings />
        </div>

      </div>
    </div>
  );
};

export default Sidebar;

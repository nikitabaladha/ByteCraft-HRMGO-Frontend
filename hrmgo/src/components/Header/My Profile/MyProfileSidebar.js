import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useMemo } from "react";
import PersonalInfo from "./Personal Info/PersonalInfo";
import ChangePassword from "./Change Password/ChangePassword";

const MyProfileSidebar = () => {
  const [activeItem, setActiveItem] = useState("personalInfo");

  const menuItems = useMemo(
    () => [
      { id: "personalInfo", label: "Personal Info" },
      { id: "changePassword", label: "Change Password" },
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
        <div
          id="personalInfo"
        >
          <PersonalInfo />
        </div>

        <div
          id="changePassword"
        >
          <ChangePassword />
        </div>


      </div>
    </div>
  );
};

export default MyProfileSidebar;


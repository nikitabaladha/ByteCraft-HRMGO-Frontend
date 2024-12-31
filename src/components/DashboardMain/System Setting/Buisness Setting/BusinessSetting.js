// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const BusinessSetting = () => {
//   const [isDarkLayout, setIsDarkLayout] = useState(false);
//   // const [selectedColor, setSelectedColor] = useState("#000000");

//   const handleThemeToggle = () => {
//     setIsDarkLayout((prev) => !prev);
//   };

//   useEffect(() => {
//     const themeStylesheet = document.getElementById("theme-stylesheet");
//     if (isDarkLayout) {
//       themeStylesheet.href = "/assets/css/style-dark.css";
//     } else {
//       themeStylesheet.href = "/assets/css/style.css";
//     }
//   }, [isDarkLayout]);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h5>Business Settings</h5>
//       </div>
//       <div className="card-body">
//         <div className="row">
//           <h5 className="mt-3 mb-3">Theme Customizer</h5>
//           <div className="setting-card setting-logo-box p-3">
//             <div className="col-12">
//               <div className="pct-body">
//                 <div className="row">
//                   <div className="col-sm-4">
//                     <h6 className="">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-credit-card me-2"
//                       >
//                         <rect
//                           x={1}
//                           y={4}
//                           width={22}
//                           height={16}
//                           rx={2}
//                           ry={2}
//                         />
//                         <line x1={1} y1={10} x2={23} y2={10} />
//                       </svg>
//                       Primary color Settings
//                     </h6>
//                     <hr className="my-2" />
//                     <div className="color-wrp">
//                       <div className="theme-color themes-color me-2">
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-1"
//                           onclick="check_theme('theme-1')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-1"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change  "
//                           data-value="theme-2"
//                           onclick="check_theme('theme-2')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-2"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change active_color"
//                           data-value="theme-3"
//                           onclick="check_theme('theme-3')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-3"
//                           defaultChecked=""
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-4"
//                           onclick="check_theme('theme-4')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-4"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-5"
//                           onclick="check_theme('theme-5')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-5"
//                         />
//                         <br />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-6"
//                           onclick="check_theme('theme-6')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-6"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-7"
//                           onclick="check_theme('theme-7')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-7"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-8"
//                           onclick="check_theme('theme-8')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-8"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-9"
//                           onclick="check_theme('theme-9')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-9"
//                         />
//                         <Link

//                           href="#!"
//                           className="themes-color-change "
//                           data-value="theme-10"
//                           onclick="check_theme('theme-10')"
//                         />
//                         <input
//                           type="radio"
//                           className="theme_color d-none"
//                           name="color"
//                           defaultValue="theme-10"
//                         />
//                       </div>
//                       <div className="color-picker-wrp ">
//                         <input
//                           type="color"
//                           defaultValue="theme-3"
//                           className="colorPicker "
//                           name="custom_color"
//                           id="color-picker"
//                         />
//                         <input
//                           type="hidden"
//                           name="color_flag"
//                           defaultValue="false"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-sm-4">
//                     <h6>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="feather feather-sun me-2"
//                       >
//                         <circle cx="12" cy="12" r="5"></circle>
//                         <line x1="12" y1="1" x2="12" y2="3"></line>
//                         <line x1="12" y1="21" x2="12" y2="23"></line>
//                         <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//                         <line
//                           x1="18.36"
//                           y1="18.36"
//                           x2="19.78"
//                           y2="19.78"
//                         ></line>
//                         <line x1="1" y1="12" x2="3" y2="12"></line>
//                         <line x1="21" y1="12" x2="23" y2="12"></line>
//                         <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//                         <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//                       </svg>
//                       Layout Settings
//                     </h6>
//                     <hr className="my-2" />
//                     <div className="form-check form-switch mt-2">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="cust-darklayout"
//                         name="cust_darklayout"
//                         checked={isDarkLayout}
//                         onChange={handleThemeToggle}
//                       />
//                       <label
//                         className="form-check-label f-w-600 pl-1 ms-2"
//                         htmlFor="cust-darklayout"
//                       >
//                         Dark Layout
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessSetting;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const BusinessSetting = () => {
//   const [isDarkLayout, setIsDarkLayout] = useState(false);
//   const [activeTheme, setActiveTheme] = useState("theme-10");
//   const [customColorActive, setCustomColorActive] = useState(false);

//   const handleThemeToggle = () => {
//     setIsDarkLayout((prev) => !prev);
//   };

//   const handleThemeChange = (theme) => {
//     setActiveTheme(theme);
//     setCustomColorActive(false); // Reset custom color
//     document.body.className = theme; // Apply theme to body
//   };

//   const handleCustomColorChange = () => {
//     setCustomColorActive(true);
//     setActiveTheme("custom-color");
//     document.body.className = "custom-color"; // Apply custom color to body
//   };

//   useEffect(() => {
//     const themeStylesheet = document.getElementById("theme-stylesheet");
//     themeStylesheet.href = isDarkLayout
//       ? "/assets/css/style-dark.css"
//       : "/assets/css/style.css";
//   }, [isDarkLayout]);

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h5>Business Settings</h5>
//       </div>
//       <div className="card-body">
//         <div className="row">
//           <h5 className="mt-3 mb-3">Theme Customizer</h5>
//           <div className="setting-card setting-logo-box p-3">
//             <div className="col-12">
//               <div className="pct-body">
//                 <div className="row">
//                   <div className="col-sm-4">
//                     <h6>Primary Color Settings</h6>
//                     <hr className="my-2" />
//                     <div className="color-wrp">
//                       <div className="theme-color themes-color me-2">
//                         {[
//                           "theme-1",
//                           "theme-2",
//                           "theme-3",
//                           "theme-4",
//                           "theme-5",
//                           "theme-6",
//                           "theme-7",
//                           "theme-8",
//                           "theme-9",
//                           "theme-10",
//                         ].map((theme) => (
//                           <Link
//                             key={theme}
//                             href="#!"
//                             className={`themes-color-change ${
//                               activeTheme === theme ? "active_color" : ""
//                             }`}
//                             data-value={theme}
//                             onClick={() => handleThemeChange(theme)}
//                           />
//                         ))}
//                       </div>
//                       <div className="color-picker-wrp">
//                         <input
//                           type="color"
//                           defaultValue="theme-10"
//                           className={`colorPicker ${
//                             customColorActive ? "active_color" : ""
//                           }`}
//                           name="custom_color"
//                           id="color-picker"
//                           onChange={handleCustomColorChange}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-sm-4">
//                     <h6>Layout Settings</h6>
//                     <hr className="my-2" />
//                     <div className="form-check form-switch mt-2">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         id="cust-darklayout"
//                         name="cust_darklayout"
//                         checked={isDarkLayout}
//                         onChange={handleThemeToggle}
//                       />
//                       <label
//                         className="form-check-label f-w-600 pl-1 ms-2"
//                         htmlFor="cust-darklayout"
//                       >
//                         Dark Layout
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessSetting;

import { useContext } from "react";
import { ThemeContext } from "../../../../ThemeProvider";
import { Link } from "react-router-dom";

const BusinessSetting = () => {
  const { isDarkLayout, activeTheme, toggleDarkLayout, changeTheme } =
    useContext(ThemeContext);

  return (
    <div className="card">
      <div className="card-header">
        <h5>Business Settings</h5>
      </div>
      <div className="card-body">
        <div className="row">
          <h5 className="mt-3 mb-3">Theme Customizer</h5>
          <div className="setting-card setting-logo-box p-3">
            <div className="col-12">
              <div className="pct-body">
                <div className="row">
                  <div className="col-sm-4">
                    <h6>Primary Color Settings</h6>
                    <hr className="my-2" />
                    <div className="color-wrp">
                      <div className="theme-color themes-color me-2">
                        {[
                          "theme-1",
                          "theme-2",
                          "theme-3",
                          "theme-4",
                          "theme-5",
                          "theme-6",
                          "theme-7",
                          "theme-8",
                          "theme-9",
                          "theme-10",
                        ].map((theme) => (
                          <Link
                            key={theme}
                            href="#!"
                            className={`themes-color-change ${
                              activeTheme === theme ? "active_color" : ""
                            }`}
                            data-value={theme}
                            onClick={() => changeTheme(theme)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <h6>Layout Settings</h6>
                    <hr className="my-2" />
                    <div className="form-check form-switch mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="cust-darklayout"
                        name="cust_darklayout"
                        checked={isDarkLayout}
                        onChange={toggleDarkLayout}
                      />
                      <label
                        className="form-check-label f-w-600 pl-1 ms-2"
                        htmlFor="cust-darklayout"
                      >
                        Dark Layout
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSetting;

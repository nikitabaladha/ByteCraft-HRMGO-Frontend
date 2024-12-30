import { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI";
// import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI";
import { Link } from "react-router-dom";

const BusinessSetting = () => {
  const [titleText, setTitleText] = useState("HRMGo");
  const [footerText, setFooterText] = useState("2024 HRMGo");
  const [isDarkLayout, setIsDarkLayout] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [logoDark, setLogoDark] = useState(null);
  const [logoLight, setLogoLight] = useState(null);
  const [favicon, setFavicon] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [certificatePreview, setCertificatePreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");

  const handleThemeToggle = () => {
    setIsDarkLayout((prev) => !prev);
  };
   
  useEffect(() => {
    const themeStylesheet = document.getElementById("theme-stylesheet");
    if (isDarkLayout) {
      themeStylesheet.href = "/assets/css/style-dark.css";
    } else {
      themeStylesheet.href = "/assets/css/style.css";
    }
  }, [isDarkLayout]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files.length > 0) {
      const file = files[0];

      if (name === "logoDark") {
        setLogoDark(file);

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
      } else if (name === "logoLight") {
        setLogoLight(file);
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setCertificatePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
      } else if (name === "favicon") {
        setFavicon(file);
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setResumePreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview("");
        }
      }
    } else {
      if (name === "logoDark") {
        setLogoDark(null);
        setImagePreview("");
      } else if (name === "logoLight") {
        setLogoLight(null);
        setCertificatePreview("");
      } else if (name === "favicon") {
        setFavicon(null);
        setResumePreview("");
      }
    }
  };

  useEffect(() => {
    const fetchBusinessSetting = async () => {
      try {
        const response = await getAPI("/get-business-setting");
        const {
          titleText,
          footerText,
          isDarkLayout,
          selectedColor,
          logoDark,
          logoLight,
          favicon,
        } = response.data.data;
        setTitleText(titleText || "HRMGo");
        setFooterText(footerText || "2024 HRMGo");
        setIsDarkLayout(isDarkLayout);
        setSelectedColor(selectedColor || "#000000");
        setLogoDark(logoDark || "not found");
        console.log("logoDark", logoDark)
        setLogoLight(logoLight);
        setFavicon(favicon);

        setImagePreview(logoDark || "");
        setCertificatePreview(logoLight || "");
        setResumePreview(favicon || "");
      } catch (error) {
        toast.error("Error fetching business settings");
      }
    };

    fetchBusinessSetting();
  }, []);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
    document.documentElement.style.setProperty("--primary-color", newColor);
  };

  // const handleThemeToggle = () => {
  //   setIsDarkLayout(!isDarkLayout);
  // };

  // useEffect(() => {
  //   if (isDarkLayout) {
  //     import("../../../../css/style-dark.css")
  //       // .then(() => {
  //       //   // document.body.classList.add("dark");
  //       //   // const lightThemeLink = document.querySelector(
  //       //   //   'link[href="../../../../assets/css/plugins/style.css"]'
  //       //   // );
  //       //   if (lightThemeLink) {
  //       //     lightThemeLink.remove();
  //       //   }
  //       // })
  //       // .catch((error) => {
  //       //   console.error("Failed to load dark theme CSS:", error);
  //       // });
  //   } else {
  //     import("../../../../assets/css/plugins/style.css")
  //       // .then(() => {
  //       //   document.body.classList.remove("dark");
  //       //   const darkThemeLink = document.querySelector(
  //       //     'link[href="../../../../css/style-dark.css"]'
  //       //   );
  //       //   if (darkThemeLink) {
  //       //     darkThemeLink.remove();
  //       //   }
  //       // })
  //       // .catch((error) => {
  //       //   console.error("Failed to load light theme CSS:", error);
  //       // });
  //   }
  // }, [isDarkLayout]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const dataToSubmit = new FormData();
    // Prepare the form data
    const formData = new FormData();
    formData.append("titleText", titleText);
    formData.append("footerText", footerText);
    formData.append("isDarkLayout", isDarkLayout);
    formData.append("selectedColor", selectedColor);
    if (logoDark) formData.append("logoDark", logoDark);
    if (logoLight) formData.append("logoLight", logoLight);
    if (favicon) formData.append("favicon", favicon);

    try {
      const response = await putAPI(
        "/update-business-setting",
        formData,
        { "Content-Type": "multipart/form-data" },
        true
      );
      console.log("Business setting updated:", response.data);
      toast("Business setting updated");
    } catch (error) {
      toast.error("Error updating business setting:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5>Business Settings</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Logo dark</h5>
                </div>
                <div className="card-body pt-0">
                  <div className="setting-card">
                    <div className="logo-content mt-4 setting-logo">
                      <Link
                        href={imagePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          id="imagePreview"
                          alt="Selected"
                          src={`http://localhost:3001${logoDark}`}
                          width="150px"
                          className="big-logo"
                        />
                      </Link>
                    </div>
                    <div className="choose-files mt-5">
                      <label htmlFor="logoDark">
                        <input
                          className="d-none"
                          id="logoDark"
                          name="logoDark"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <span className="form-label choose-files bg-primary">
                          Choose file here
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Logo Light</h5>
                </div>
                <div className="card-body pt-0">
                  <div className="setting-card">
                    <div className="logo-content mt-4 ">
                      <Link
                        href={certificatePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          id="certificatePreview"
                          alt="Selected"
                          src={`http://localhost:3001${logoLight}`}
                          width="150px"
                          className="big-logo"
                          style={{ filter: "drop-shadow(2px 3px 7px #011c4b)" }}
                        />
                      </Link>
                    </div>
                    <div className="choose-files mt-5">
                      <input
                        className="d-none"
                        id="logoLight"
                        name="logoLight"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <label
                        htmlFor="logoLight"
                        className="form-label choose-files bg-primary"
                      >
                        Choose file here
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 col-md-6">
              <div className="card">
                <div className="card-header">
                  <h5>Favicon</h5>
                </div>
                <div className="card-body pt-0">
                  <div className="setting-card">
                    <div className="logo-content mt-4">
                      <Link
                        href={resumePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          id="resumePreview"
                          alt="Selected"
                          src={`http://localhost:3001${favicon}`}
                          width="50px"
                          className="big-logo"
                          style={{ filter: "drop-shadow(2px 3px 7px #011c4b)" }}
                        />
                      </Link>
                    </div>
                    <div className="choose-files mt-5">
                      <label htmlFor="favicon">
                        <input
                          className="d-none"
                          id="favicon"
                          name="favicon"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <span className="form-label choose-files bg-primary">
                          Choose file here
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="title_text" className="col-form-label">
                Title Text
              </label>
              <input
                type="text"
                className="form-control"
                id="title_text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="footer_text" className="col-form-label">
                Footer Text
              </label>
              <input
                type="text"
                className="form-control"
                id="footer_text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
              />
            </div>
          </div>

          <h5 className="mt-3 mb-3">Theme Customizer</h5>
          <div className="setting-card setting-logo-box p-3">
            <div className="col-12">
              <div className="pct-body">
                <div className="row">
                  <div className="col-sm-4">
                    <h6>Primary Color Settings</h6>
                    <hr className="my-2" />
                    <div className="color-wrp">
                      <div className="color-picker-wrp">
                        <input
                          type="color"
                          value={selectedColor}
                          className="colorPicker"
                          name="custom_color"
                          id="color-picker"
                          onChange={handleColorChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <h6>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-sun me-2"
                      >
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line
                          x1="18.36"
                          y1="18.36"
                          x2="19.78"
                          y2="19.78"
                        ></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                      </svg>
                      Layout Settings
                    </h6>
                    <hr className="my-2" />
                    <div className="form-check form-switch mt-2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="cust-darklayout"
                        name="cust_darklayout"
                        checked={isDarkLayout}
                        onChange={handleThemeToggle}
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

        <div className="card-footer text-end">
          <input
            className="btn btn-xs btn-primary"
            type="submit"
            value="Save Changes"
          />
        </div>
      </form>
    </div>
  );
};

export default BusinessSetting;

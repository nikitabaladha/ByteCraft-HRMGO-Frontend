import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";

import "react-perfect-scrollbar/dist/css/styles.css";

import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { TbUsers } from "react-icons/tb";
import { LuUser } from "react-icons/lu";
import { TbReceipt } from "react-icons/tb";
import { FaRegClock } from "react-icons/fa6";
import { HiCubeTransparent } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";
import { TbSchool } from "react-icons/tb";
import { LuUserPlus } from "react-icons/lu";
import { TbLicense } from "react-icons/tb";
import { TbDeviceFloppy } from "react-icons/tb";
import { LuTicket } from "react-icons/lu";
import { TbCalendarEvent } from "react-icons/tb";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { TbMedicalCross } from "react-icons/tb";
import { CiFileOn } from "react-icons/ci";
import { TbTemplate } from "react-icons/tb";
import { TbPray } from "react-icons/tb";
import { LuMessagesSquare } from "react-icons/lu";
import { GoBell } from "react-icons/go";
import { FiTable } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { ThemeContext } from "../../js/ThemeProvider";
import { useContext } from "react";

const menuConfig = [
  {
    id: "dashboard",
    label: "Dashboard",
    iconClass: <AiOutlineHome />,
    link: "/dashboard/overview",
    subMenu: [
      {
        id: "overview",
        label: "Overview",
        link: "/dashboard/overview",
      },
      {
        id: "report",
        label: "Report",
        subMenu: [
          {
            id: "incomeExpense",
            label: "Income Vs Expense",
            link: "/dashboard/report/income-vs-expense",
          },
          {
            id: "monthlyAttendance",
            label: "Monthly Attendance",
            link: "/dashboard/report/monthly-attendance",
          },
          {
            id: "leave",
            label: "Leave",
            link: "/dashboard/report/leave",
          },
          {
            id: "accountStatement",
            label: "Account Statement",
            link: "/dashboard/report/account-statement",
          },
          {
            id: "payroll",
            label: "Payroll",
            link: "/dashboard/report/payroll",
          },
          {
            id: "timesheet",
            label: "Timesheet",
            link: "/dashboard/report/time-sheet",
          },
        ],
      },
    ],
  },

  // staff
  {
    id: "staff",
    label: "Staff",
    iconClass: <TbUsers />,
    link: "",
    subMenu: [
      {
        id: "user",
        label: "User",
        link: "/dashboard/staff/user",
      },
      {
        id: "roles",
        label: "Role",
        link: "/dashboard/staff/role",
      },
      {
        id: "employeeProfile",
        label: "Employee Profile",
        link: "/dashboard/staff/employee-profile",
      },
    ],
  },

  // employee
  {
    id: "employee",
    label: "Employee",
    iconClass: <LuUser />,
    link: "/dashboard/employee",
  },

  // pay roll
  {
    id: "payroll",
    label: "Payroll",
    iconClass: <TbReceipt />,
    link: "",
    subMenu: [
      {
        id: "setSalary",
        label: "Set Salary",
        link: "/dashboard/payroll/set-salary",
      },
      {
        id: "payslip",
        label: "Payslip",
        link: "/dashboard/payroll/payslip",
      },
    ],
  },

  // timessheet
  {
    id: "timeSheet",
    label: "Timesheet",
    iconClass: <FaRegClock />,
    link: "#!",
    subMenu: [
      {
        id: "timeSheet",
        label: "Timesheet",
        link: "/dashboard/time-sheet/time-sheet",
      },
      {
        id: "manageLeave",
        label: "Manage Leave",
        link: "/dashboard/time-sheet/manage-leave",
      },
      {
        id: "attendance",
        label: "Attendance",
        subMenu: [
          {
            id: "markedAttendance",
            label: "Marked Attendance",

            link: "/dashboard/time-sheet/attendance/marked-attendance",
          },
          {
            id: "bulkAttendance",
            label: "Bulk Attendance",
            link: "/dashboard/time-sheet/attendance/bulk-attendance",
          },
        ],
      },
    ],
  },

  // performance
  {
    id: "performance",
    label: "Performance",
    iconClass: <HiCubeTransparent />,
    link: "#!",
    subMenu: [
      {
        id: "indicator",
        label: "Indicator",
        link: "/dashboard/performance/indicator",
      },
      {
        id: "appraisal",
        label: "Appraisal",
        link: "/dashboard/performance/appraisal",
      },
      {
        id: "goalTracking",
        label: "Goal Tracking",
        link: "/dashboard/performance/goal-tracking",
      },
    ],
  },

  // finance
  {
    id: "finance",
    label: "Finance",
    iconClass: <LuWallet />,
    link: "#!",
    subMenu: [
      {
        id: "accountList",
        label: "Account List",
        link: "/dashboard/finance/account-list",
      },
      {
        id: "accountBalance",
        label: "Account Balance",
        link: "/dashboard/finance/account-balance",
      },
      {
        id: "payees",
        label: "Payees",
        link: "/dashboard/finance/payees",
      },
      {
        id: "payers",
        label: "payers",
        link: "/dashboard/finance/payer",
      },
      {
        id: "deposit",
        label: "Deposit",
        link: "/dashboard/finance/deposit",
      },
      {
        id: "expense",
        label: "Expense",
        link: "/dashboard/finance/expense",
      },
      {
        id: "transferBalance",
        label: "Transfer Balance",
        link: "/dashboard/finance/transfer-balance",
      },
    ],
  },

  // training
  {
    id: "training",
    label: "Training",
    iconClass: <TbSchool />,
    link: "#!",
    subMenu: [
      {
        id: "trainingList",
        label: "Training List",
        link: "/dashboard/training",
      },
      {
        id: "trainer",
        label: "Trainer",
        link: "/dashboard/training/trainer",
      },
    ],
  },

  // hr admin setup
  {
    id: "hrAdminSetup",
    label: "Hr Admin Setup",
    iconClass: <LuUserPlus />,
    link: "#!",
    subMenu: [
      {
        id: "award",
        label: "Award",
        link: "/dashboard/hr-admin-setup/award",
      },
      {
        id: "transfer",
        label: "Transfer",
        link: "/dashboard/hr-admin-setup/transfer",
      },
      {
        id: "resignation",
        label: "Resignation",
        link: "/dashboard/hr-admin-setup/resignation",
      },
      {
        id: "trip",
        label: "Trip",
        link: "/dashboard/hr-admin-setup/trip",
      },
      {
        id: "promotion",
        label: "Promotion",
        link: "/dashboard/hr-admin-setup/promotion",
      },

      {
        id: "complaints",
        label: "Complaints",
        link: "/dashboard/hr-admin-setup/complaint",
      },
      {
        id: "warning",
        label: "Warning",
        link: "/dashboard/hr-admin-setup/warning",
      },
      {
        id: "termination",
        label: "Termination",
        link: "/dashboard/hr-admin-setup/termination",
      },
      {
        id: "announcement",
        label: "Announcement",
        link: "/dashboard/hr-admin-setup/announcement",
      },
      {
        id: "holidays",
        label: "Holidays",
        link: "/dashboard/hr-admin-setup/holidays",
      },
    ],
  },

  // Recruitment
  {
    id: "recruitment",
    label: "Recruitment",
    iconClass: <TbLicense />,
    link: "#!",
    subMenu: [
      {
        id: "jobs",
        label: "Jobs",
        link: "/dashboard/recruitment/jobs",
      },
      {
        id: "jobCreate",
        label: "Job Create",
        link: "/dashboard/recruitment/create-job",
      },
      {
        id: "jobApplication",
        label: "Job Application",
        link: "/dashboard/recruitment/job-application",
      },
      {
        id: "jobCandidate",
        label: "Job Candidate",
        link: "/dashboard/recruitment/job-candidate",
      },
      {
        id: "jobOnboarding",
        label: "Job On-Boarding",
        link: "/dashboard/recruitment/job-on-boarding",
      },
      // {
      //   id: "customQuestion",
      //   label: "Custom Question",
      //   link: "/dashboard/recruitment/custom-question",
      // },
      {
        id: "interviewSchedule",
        label: "Interview Schedule",
        link: "/dashboard/recruitment/inrterview-schedule",
      },
      {
        id: "career",
        label: "Career",
        link: "/dashboard/recruitment/career",
        target: "_blank",
      },
    ],
  },

  // Contract
  {
    id: "contract",
    label: "Contracts",
    iconClass: <TbDeviceFloppy />,
    link: "/dashboard/contract",
  },

  // Ticket
  {
    id: "ticket",
    label: "Ticket",
    iconClass: <LuTicket />,
    link: "/dashboard/ticket",
  },

  // Event
  {
    id: "event",
    label: "Event",
    iconClass: <TbCalendarEvent />,
    link: "/dashboard/event",
  },

  // Meeting
  {
    id: "meeting",
    label: "Meeting",
    iconClass: <MdOutlineCalendarMonth />,
    link: "/dashboard/meeting",
  },

  // Zoom Meeting
  {
    id: "zoomMeeting",
    label: "Zoom Meeting",
    iconClass: <CiVideoOn />,
    link: "/dashboard/zoom-meeting",
  },

  // Assets
  {
    id: "assets",
    label: "Assets",
    iconClass: <TbMedicalCross />,
    link: "/dashboard/assets",
  },

  // Document
  {
    id: "document",
    label: "Document",
    iconClass: <CiFileOn />,
    link: "/dashboard/upload",
  },

  // Email Templates
  {
    id: "emailTemplates",
    label: "Email Templates",
    iconClass: <TbTemplate />,
    link: "/dashboard/email-templates",
  },

  // Company Policy
  {
    id: "companyPolicy",
    label: "Company Policy",
    iconClass: <TbPray />,
    link: "/dashboard/company-policy",
  },

  // Messenger
  {
    id: "messenger",
    label: "Messenger",
    iconClass: <LuMessagesSquare />,
    link: "/dashboard/messenger",
  },

  // Notification Template
  {
    id: "notificationTemplate",
    label: "Notification Template",
    iconClass: <GoBell />,
    link: "/dashboard/notification-templates",
  },

  // HRM System Setup
  {
    id: "hrmSystemSetup",
    label: "HRM System Setup",
    iconClass: <FiTable />,
    link: "/dashboard/hrm-system-branch",
  },

  // Landing Page
  {
    id: "landingPage",
    label: "Landing Page",
    iconClass: <TbLicense />,
    link: "/dashboard/landing-page",
  },

  // System Setting
  {
    id: "systemSetting",
    label: "System Setting",
    iconClass: <IoSettingsOutline />,
    link: "/dashboard/system-setting",
  },
];

const Sidebar = ({ sidebarVisible, toggleSidebar }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  // const [logoDark, setLogoDark] = useState(null);
  // const [titleText, setTitleText] = useState("HRMGo");

  const sidebarRef = useRef(null);
  const { isDarkLayout } = useContext(ThemeContext);

  // Handle clicks outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarVisible
      ) {
        toggleSidebar(); // Close the sidebar if clicking outside
      }
    };

    // Add event listener for mouse clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarVisible, toggleSidebar]);

  const toggleMenu = (menuId) => {
    setActiveMenu(activeMenu === menuId ? null : menuId);
    setActiveSubMenu(null);
  };

  const toggleSubMenu = (subMenuId) => {
    setActiveSubMenu(activeSubMenu === subMenuId ? null : subMenuId);
  };

  // useEffect(() => {
  //   const fetchBusinessSetting = async () => {
  //     try {
  //       const response = await getAPI("/get-business-setting");
  //       const {
  //         titleText,
  //         logoDark,
  //       } = response.data.data;
  //       setTitleText(titleText)
  //       setLogoDark(logoDark || "not found");
  //     } catch (error) {
  //       toast.error("Error fetching business settings");
  //     }
  //   };

  //   fetchBusinessSetting();
  // }, []);

  const renderSubMenu = (subMenu) => (
    <ul className="dash-submenu">
      {subMenu.map((item) => (
        <li key={item.id} className="dash-item">
          {item.subMenu ? (
            <div
              className="dash-link"
              onClick={() => toggleSubMenu(item.id)} // Toggle submenu
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  toggleSubMenu(item.id);
                }
              }}
            >
              <span className="dash-mtext">{item.label}</span>
              <span
                className={`dash-arrow ${
                  activeSubMenu === item.id ? "active" : ""
                }`}
                style={{
                  transform:
                    activeSubMenu === item.id
                      ? "rotate(90deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
              >
                <IoIosArrowForward />
              </span>
            </div>
          ) : (
            <Link to={item.link} className="dash-link">
              {item.label}
            </Link>
          )}
          {item.subMenu &&
            activeSubMenu === item.id &&
            renderSubMenu(item.subMenu)}
        </li>
      ))}
    </ul>
  );
  return (
    <>
      {" "}
      <nav
        ref={sidebarRef} // Attach ref here
        className={`dash-sidebar light-sidebar transprent-bg ${
          sidebarVisible ? "mob-sidebar-active" : ""
        }`}
      >
        <div className="navbar-wrapper" style={{ display: "block" }}>
          <div className="m-header main-logo">
            <Link to="/dashboard" className="b-brand">
              {/* <img
                src="/storage/uploads/logo/Black-Logo.png"
                alt="HRMSync"
                className="logo logo-lg"
                style={{height: '87px', width:'300px'}}
              />
              <img
               src="/storage/uploads/logo/White-Logo (1).png"
                alt="HRMSync"
                className="logo logo-sm"
                style={{height: '40px', width:'147px'}}
              /> */}
              <img
                src={
                  isDarkLayout
                    ? "/storage/uploads/logo/White-Logo (2).png"
                    : "/storage/uploads/logo/Black-Logo (1).png"
                }
                alt="HRMSync"
                className="logo"
                style={{
                  height: isDarkLayout ? "77px" : "77px",
                  width: isDarkLayout ? "200px" : "200px",
                }}
              />
            </Link>
          </div>

          <div
            className="navbar-content active dash-trigger"
            data-simplebar="init"
          >
            <div className="simplebar-wrapper" style={{ margin: "-10px 0px" }}>
              <div className="simplebar-height-auto-observer-wrapper">
                <div className="simplebar-height-auto-observer"></div>
              </div>
              <div className="simplebar-mask">
                <div
                  className="simplebar-offset"
                  style={{ right: "0px", bottom: "0px" }}
                >
                  <div
                    className="simplebar-content-wrapper"
                    tabIndex="0"
                    role="region"
                    aria-label="scrollable content"
                    style={{ height: "100%", overflow: "hidden scroll" }}
                  >
                    <div
                      className="simplebar-content"
                      style={{ padding: "10px 0px" }}
                    >
                      {" "}
                      <PerfectScrollbar>
                        {" "}
                        <ul className="dash-navbar">
                          {menuConfig.map((menu) => (
                            <li
                              key={menu.id}
                              className={`dash-item dash-hasmenu ${
                                activeMenu === menu.id ? "active" : ""
                              }`}
                            >
                              <Link
                                to={menu.link}
                                className="dash-link"
                                onClick={() => toggleMenu(menu.id)}
                              >
                                <span className="dash-micon">
                                  {menu.iconClass}
                                </span>
                                <span className="dash-mtext">{menu.label}</span>
                                {menu.subMenu && (
                                  <span
                                    className={`dash-arrow ${
                                      activeMenu === menu.id ? "active" : ""
                                    }`}
                                    style={{
                                      transform:
                                        activeMenu === menu.id
                                          ? "rotate(90deg)"
                                          : "rotate(0deg)",
                                      transition: "transform 0.3s ease",
                                    }}
                                  >
                                    <IoIosArrowForward />
                                  </span>
                                )}
                              </Link>
                              {menu.subMenu &&
                                activeMenu === menu.id &&
                                renderSubMenu(menu.subMenu)}
                            </li>
                          ))}
                        </ul>
                      </PerfectScrollbar>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="simplebar-placeholder"
                style={{ width: "auto", height: "1502px" }}
              ></div>
            </div>
            <div
              className="simplebar-track simplebar-horizontal"
              style={{ visibility: "hidden" }}
            >
              <div
                className="simplebar-scrollbar"
                style={{ width: "0px", display: "none" }}
              ></div>
            </div>
            <div
              className="simplebar-track simplebar-vertical"
              style={{ visibility: "visible" }}
            >
              <div
                className="simplebar-scrollbar"
                style={{
                  height: "260px",
                  transform: "translate3d(0px, 0px, 0px)",
                  display: "block",
                }}
              ></div>
            </div>
          </div>
        </div>
      </nav>
      {/* Overlay: Visible only when sidebarVisible is true */}
      {sidebarVisible && (
        <div
          className="dash-menu-overlay"
          onClick={toggleSidebar} // Close sidebar when overlay is clicked
        ></div>
      )}
    </>
  );
};

export default Sidebar;

import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../js/ThemeProvider";
import getAPI from "../../api/getAPI";
import { io } from "socket.io-client";
// import postAPI from "../../api/postAPI";

const Header = ({ toggleSidebar, name, imagePreview, profileImage }) => {
  const { isDarkLayout, toggleDarkLayout } = useContext(ThemeContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const location = useLocation(); // Use React Router's location instead of window.location
  const [currentConversationId, setCurrentConversationId] = useState(null);

  // const fetchUnreadCount = useCallback(async () => {
  //   try {
  //     const response = await getAPI(`/unread-messages/${user?.id}`);
  //     setUnreadCount(response.data.count);
  //   } catch (error) {
  //     console.error("Failed to fetch unread count", error);
  //   }
  // }, [user?.id]);

  // useEffect(() => {
  //   setSocket(io("http://localhost:3030"));
  // }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await getAPI(`/unread-messages/${user?.id}`);
      setUnreadCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  }, [user?.id]);

  useEffect(() => {
    const newSocket = io("http://localhost:3030");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, []);

  // useEffect(() => {
  //   if (!socket || !user?.id) return;

  //   socket.emit("addUser", user.id);

  //   const handleNewMessage = (data) => {
  //     // Only increment count if not in messenger or different conversation
  //     if (
  //       !location.pathname.includes("/dashboard/messenger") ||
  //       data.conversationId !== currentConversationId
  //     ) {
  //       fetchUnreadCount();
  //     }
  //   };

  //   socket.on("getMessage", handleNewMessage);
  //   socket.on("messagesRead", fetchUnreadCount);

  //   return () => {
  //     socket.off("getMessage", handleNewMessage);
  //     socket.off("messagesRead", fetchUnreadCount);
  //   };
  // }, [
  //   socket,
  //   user?.id,
  //   currentConversationId,
  //   fetchUnreadCount,
  //   location.pathname,
  // ]);

  useEffect(() => {
    if (!socket || !user?.id) return;

    socket.emit("addUser", user.id);

    const handleNewMessage = (data) => {
      if (
        !location.pathname.includes("/dashboard/messenger") ||
        data.conversationId !== currentConversationId
      ) {
        fetchUnreadCount();
      }
    };

    const handleMessagesRead = () => {
      fetchUnreadCount(); // Immediately update count when messages are read
    };

    socket.on("getMessage", handleNewMessage);
    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("getMessage", handleNewMessage);
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [socket, user?.id, currentConversationId, fetchUnreadCount, location.pathname]);

  useEffect(() => {
    if (location.pathname.includes("/dashboard/messenger")) {
      // Extract conversationId from URL or state
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get("conversationId"); // Adjust based on your routing
      setCurrentConversationId(id);
    } else {
      setCurrentConversationId(null);
    }
  }, [location]);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");
    window.location.href = "/login";
  };

  // const markMessagesAsRead = async (conversationId) => {
  //   try {
  //     await postAPI("/messages/mark-as-read", {
  //       conversationId,
  //       userId: user?.id,
  //     });
  //     setUnreadCount((prev) => prev - 1);
  //   } catch (error) {
  //     console.error("Failed to mark messages as read", error);
  //   }
  // };

  // const markMessagesAsRead = async (conversationId) => {
  //   try {
  //     const response = await postAPI("/messages/mark-as-read", {
  //       conversationId,
  //       userId: user?.id,
  //     });
      
  //     // Update count immediately from API response if available
  //     if (response.data?.count !== undefined) {
  //       setUnreadCount(response.data.count);
  //     } else {
  //       // Fallback to decrementing if count isn't returned
  //       setUnreadCount(prev => Math.max(0, prev - 1));
  //     }
      
  //     // Emit socket event to notify other clients
  //     if (socket) {
  //       socket.emit("messagesRead", {
  //         userId: user?.id,
  //         conversationId
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to mark messages as read", error);
  //   }
  // };

  return (
    <header className="dash-header transprent-bg">
      <div className="header-wrapper">
        <div className="me-auto dash-mob-drp">
          <ul className="list-unstyled">
            <li className="dash-h-item mob-hamburger">
              <Link
                to="#!"
                className="dash-head-link"
                id="mobile-collapse"
                onClick={toggleSidebar}
              >
                <div className="hamburger hamburger--arrowturn">
                  <div className="hamburger-box">
                    <div className="hamburger-inner"></div>
                  </div>
                </div>
              </Link>
            </li>

            <li className="dropdown dash-h-item drp-company">
              <Link
                className="dash-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <span className="theme-avtar">
                  <img
                    alt="User Avatar"
                    src={profileImage}
                    className="img-fluid rounded border-2 border border-primary"
                    style={{ width: "100%", height: "100%" }}
                  />
                </span>
                <span className="ms-2">
                  Hi, {name}
                  <i className="ti ti-chevron-down drp-arrow nocolor"></i>
                </span>
              </Link>
              <div className="dropdown-menu dash-h-dropdown">
                <Link to="/dashboard/account-setting" className="dropdown-item">
                  {/* <FiUser /> */}
                  <i className="ti ti-user"></i>
                  <span>My Profile</span>
                </Link>

                <Link className="dropdown-item" onClick={handleLogout}>
                  {/* <IoPower /> */}
                  <i className="ti ti-power"></i>
                  <span>Logout</span>
                </Link>
                <form
                  id="logout-form"
                  method="POST"
                  style={{ display: "none" }}
                >
                  <input
                    type="hidden"
                    name="_token"
                    value="pkX4v0W6csqzjuYqeZpAhGPsJWaWz4kwSn169bGi"
                    autoComplete="off"
                  />
                </form>
              </div>
            </li>
          </ul>
        </div>

        <div className="ms-auto">
          <ul className="list-unstyled">
            <li className="dash-h-item">
              <Link
                className="dash-head-link me-0"
                onClick={(e) => {
                  e.preventDefault();
                  toggleDarkLayout();
                }}
              >
                <i
                  className={
                    isDarkLayout
                      ? "ti ti-sun text-dark"
                      : "ti ti-moon text-dark"
                  }
                ></i>
              </Link>
            </li>

            <li className="dash-h-item">
              <Link className="dash-head-link me-0" to="/dashboard/messenger">
                <i className="ti ti-message-circle text-dark"> </i>
                {unreadCount > 0 && (
                  <span className="bg-danger dash-h-badge message-counter custom_messanger_counter">
                    {unreadCount}
                    <span className="sr-only"></span>
                  </span>
                )}
              </Link>
            </li>

            <li className="dropdown dash-h-item drp-notification">
              <Link
                className="dash-head-link dropdown-toggle arrow-none me-0"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-haspopup="false"
                aria-expanded="false"
              >
                <i className="ti ti-bell text-dark"> </i>
                <span className="bg-danger dash-h-badge message-counter custom_messanger_counter">
                  0<span className="sr-only"></span>
                </span>
              </Link>
              <div className="dropdown-menu dash-h-dropdown dropdown-menu-end">
                <div className="noti-header">
                  <h5 className="m-0">Messages</h5>
                  <Link
                    to="#"
                    className="dash-head-link mark_all_as_read_message"
                  >
                    Clear All
                  </Link>
                </div>
                <div className="noti-body dropdown-list-message-msg">
                  <table className="count-listOfContacts"></table>
                </div>
                <div className="noti-footer">
                  <div className="d-grid">
                    <Link className="btn dash-head-link justify-content-center text-primary mx-0">
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

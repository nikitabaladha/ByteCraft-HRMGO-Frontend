import React from "react";
import getAPI from "../../../api/getAPI";
import postAPI from "../../../api/postAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
// import { FaRegBookmark } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { io } from "socket.io-client";

const Messagess = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const [activeTab, setActiveTab] = useState("users");
  const [socket, setSocket] = useState(null)

  console.log("messagesss", messages)
  useEffect(() =>{
    setSocket(io('http://localhost:3030'))
  }, [])

  useEffect(() => {
    socket?.emit('addUser', user?.id)
    socket?.on('getUsers', users => {
      // setUsers(users)
      console.log('activeUsers:', users)
    })
    socket?.on('getMessage', data => {
      console.log('data: ', data)
      setMessages(prev => ({
        ...prev, 
        messages: [...prev.messages, {user: data.user, message: data.message}]
      }))
    })
  }, [socket, user?.id])

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const fetchConversations = async () => {
      try {
        const response = await getAPI(`/conversation/${userDetails?.id}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch data.", error);
      }
    };

    fetchConversations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAPI(`/users/${user?.id}`);
      setUsers(response.data);
      setCurrentView("groups");
    } catch (error) {
      console.error("Failed to fetch users.", error);
    }
  };

  const fetchMessages = async (conversationId, receiver) => {
    try {
      const response = await getAPI(`/get-message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`);
      setMessages({ messages: response.data, receiver, conversationId });
      console.log(conversationId)
    } catch (error) {
      console.error("Failed to fetch data.", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    socket?.emit('sendMessage', {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
    })

    if (!message?.trim()) {
      toast("Message cannot be empty!");
      return;
    }

    try {
      const response = await postAPI(`/message`, {
        conversationId: messages?.conversationId,
        senderId: user?.id,
        message,
        receiverId: messages?.receiver?.receiverId,
      });
      if (response.hasError) {
        toast(`Failed to send message: ${response.message}`);
        return;
      }

      console.log("Response data:", response.data);

      setMessage("");
      toast("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      toast(`An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="cards rounded-12  p-0">
            <div className="card-body">
              <div className="messenger rounded min-h-750 overflow-hidden">
                <div className="messenger-listView">
                  <div className="m-header">
                    <nav>
                      <nav className="m-header-right">
                        <Link href="#" className="listView-x">
                          <TiTimes />
                        </Link>
                      </nav>
                    </nav>
                    <input
                      type="text"
                      className="messenger-search"
                      placeholder="Search"
                    />

                    <div className="messenger-listView-tabs">
                      <Link
                        to="#"
                        className={activeTab === "users" ? "active-tab" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("users");
                          setCurrentView("default");
                        }}
                      >
                        <BiTimeFive />
                      </Link>

                      <Link
                        href="#"
                        className={activeTab === "groups" ? "active-tab" : ""}
                        data-view="groups"
                        onClick={(e) => {
                          e.preventDefault();
                          fetchUsers();
                          setActiveTab("groups");
                          setCurrentView("groups");
                        }}
                      >
                        <FaUsers />
                      </Link>
                    </div>
                  </div>
                  <div className="m-body">
                    {currentView === "default" && (
                      <div
                        className=" show scroll  messenger-tab app-scroll"
                        data-view="users"
                        style={{}}
                      >
                        <div
                          className="listOfContacts"
                          style={{
                            width: "100%",
                            height: "calc(100% - 200px)",
                            position: "relative",
                          }}
                        >
                          {conversations && Array.isArray(conversations) ? (
                            conversations.map(({ conversationId, user }) => (
                              <table
                                className="messenger-list-item"
                                data-contact={2}
                                onClick={() =>
                                  fetchMessages(conversationId, user)
                                }
                              >
                                <tbody>
                                  <tr data-action={0}>
                                    <td style={{ position: "relative" }}>
                                      <div
                                        data-id={2}
                                        data-action={0}
                                        className="avatar av-m"
                                        style={{
                                          backgroundImage: `url(http://localhost:3001${user?.profileImage})`,
                                        }}
                                      />
                                    </td>
                                    <td width="100%">
                                      <p
                                        data-id={2}
                                        data-type="user"
                                        style={{ textAlign: "start" }}
                                      >
                                        {user.name}
                                        <span>3 months ago</span>
                                      </p>
                                      <span
                                        style={{
                                          justifyContent: "left",
                                          display: "flex",
                                        }}
                                      >
                                        <span className="lastMessageIndicator">
                                          You :
                                        </span>
                                        hi
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            ))
                          ) : (
                            <p>No conversations found.</p>
                          )}
                        </div>
                      </div>
                    )}
                    {currentView === "groups" && (
                      <div
                        className="all_members messenger-tab app-scroll"
                        data-view="groups"
                        style={{ display: "block" }}
                      >
                        {users.map((item) => (
                          <table
                            className="messenger-list-item"
                            onClick={() => fetchMessages("new", item.user)}
                          >
                            <tbody>
                              <tr key={item.user.receiverId}>
                                <td style={{ position: "relative" }}>
                                  <div
                                    className="avatar av-m"
                                    style={{
                                      backgroundImage: `url(http://localhost:3001${item.user.profileImage})`,
                                    }}
                                  />
                                </td>
                                <td>
                                  <p>{item.user.name}</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        ))}
                      </div>
                    )}
                    <div
                      className="messenger-tab app-scroll"
                      data-view="search"
                      style={{ display: "none" }}
                    >
                      <p className="messenger-title">Search</p>
                      <div className="search-records">
                        <p className="message-hint center-el">
                          <span>Type to search..</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="messenger-messagingView">
                  {messages?.receiver?.name && (
                    <div className="m-header m-header-messaging">
                      <nav className="d-flex a;align-items-center justify-content-between">
                        <div style={{ display: "flex" }}>
                          <Link href="#" className="show-listView">
                            <FaArrowLeft />
                          </Link>
                          <div
                            className="avatar av-s header-avatar"
                            style={{
                              margin: "-5px 10px",
                              backgroundImage: `url(http://localhost:3001${messages?.receiver?.profileImage})`,
                            }}
                          ></div>
                          <Link href="#" className="user-name">
                            {messages?.receiver?.name}
                          </Link>
                        </div>
                        <nav className="m-header-right">
                          <Link
                            href="#"
                            className="add-to-favorite my-lg-1 my-xl-1 mx-lg-1 mx-xl-1 favorite"
                            style={{ display: "inline" }}
                          >
                            <FaStar />
                          </Link>
                          <Link
                            href="#"
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                          >
                            <FaCircleInfo />
                          </Link>
                        </nav>
                      </nav>
                    </div>
                  )}

                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div className="messages">
                      {messages?.messages?.length > 0 ? (
                        messages.messages.map(
                          ({ message, user: { id } = {} }) => {
                            if (id === user?.id) {
                              return (
                                <div
                                  className="message-card mc-sender"
                                  title="2020-10-08 09:35:19"
                                >
                                  <div
                                    className="chatify-d-flex chatify-align-items-center"
                                    style={{
                                      flexDirection: "row-reverse",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <p style={{ marginLeft: "5px" }}>
                                      {message}
                                      <sub
                                        title="2020-10-08 09:35:19"
                                        className="message-time"
                                      >
                                        <FaCheckDouble /> 4 years ago
                                      </sub>
                                    </p>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="message-card">
                                  <p>
                                    {message}
                                    <sub title="2022-08-09 16:38:31">
                                      2 years ago
                                    </sub>
                                  </p>
                                </div>
                              );
                            }
                          }
                        )
                      ) : (
                        <p
                        // style={{
                        //   fontSize: "18px",
                        //   color: "#333",
                        //   fontWeight: "bold",
                        //   textAlign: "center",
                        //   backgroundColor: "#f5f5f5",
                        //   padding: "10px 20px",
                        //   borderRadius: "5px",
                        //   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        // }}
                        >
                          {/* Start Conversation */}
                        </p>
                      )}
                    </div>
                    <div className="typing-indicator">
                      <div className="message-card typing">
                        <p>
                          <span className="typing-dots">
                            <span className="dot dot-1" />
                            <span className="dot dot-2" />
                            <span className="dot dot-3" />
                          </span>
                        </p>
                      </div>
                    </div>
                    {messages?.receiver?.name && (
                      <div
                        className="messenger-sendCard"
                        style={{ display: "block" }}
                      >
                        <form onClick={(e) => sendMessage(e)}>
                          <input type="hidden" />
                          <label>
                            <FaPaperclip />
                            <input
                              type="file"
                              className="upload-attachment"
                              name="file"
                              accept=".png, .jpg, .jpeg, .gif, .zip, .rar, .txt"
                            />
                          </label>
                          <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="m-send app-scroll"
                            placeholder="Type a message.."
                            style={{
                              overflow: "hidden",
                              overflowWrap: "break-word",
                            }}
                          />
                          <button>
                            <FaPaperPlane />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="messenger-infoView app-scroll text-center"
                  style={{ display: "none" }}
                >
                  <nav className="text-center">
                    <Link href="#">
                      <TiTimes />
                    </Link>
                  </nav>
                  <div
                    className="avatar av-l"
                    style={{
                      backgroundImage: `url(http://localhost:3001${user?.profileImage})`,
                    }}
                  ></div>
                  <p className="info-name">Teresa R McRae</p>
                  <div className="messenger-infoView-btns">
                    <Link
                      href="#"
                      className="danger delete-conversation"
                      style={{ display: "inline" }}
                    >
                      <FaRegTrashAlt /> Delete Conversation
                    </Link>
                  </div>
                  <div
                    className="messenger-infoView-shared"
                    style={{ display: "block" }}
                  >
                    <p className="messenger-title">shared photos</p>
                    <div className="shared-photos-list">
                      <p className="message-hint">
                        <span>Nothing shared yet</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagess;

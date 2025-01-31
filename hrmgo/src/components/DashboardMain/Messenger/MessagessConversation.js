import React, { useRef } from "react";
import getAPI from "../../../api/getAPI";
import postAPI from "../../../api/postAPI";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import DeleteMessage from "./DeleteMessage";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { HiOutlineDocumentDownload } from "react-icons/hi";

const Messagess = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userDetails"))
  );
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const [activeTab, setActiveTab] = useState("users");
  const [socket, setSocket] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const messageRef = useRef(null);
  const [previewMessagePDF, setPreviewMessagePDF] = useState(null);
  const [previewMessageImage, setPreviewMessageImage] = useState(null);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  // timeAgo function
  const formatTimeAgo = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSecs < 60) {
      return `${diffInSecs} sec ago`;
    } else if (diffInMins < 60) {
      return `${diffInMins} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hrs ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const handleEdit = (messages) => {
    // console.log("messages", messages)
    setSelectedTrainee(messages);
    setIsModalOpen(true);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    setSocket(io("http://localhost:3030"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", user?.id);
    socket?.on("getUsers", (users) => {
      // setUsers(users)
      console.log("activeUsers:", users);
    });
    socket?.on("getMessage", (data) => {
      // console.log("data: ", data);
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket, user?.id]);

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
      const response = await getAPI(
        `/get-message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`
      );
      setMessages({ messages: response.data, receiver, conversationId });
      console.log("messagesFile:", messages);
    } catch (error) {
      console.error("Failed to fetch data.", error);
    }
  };

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages.messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      payload.append("conversationId", messages?.conversationId || "new");
      payload.append("senderId", user?.id);
      payload.append("message", message);
      payload.append("receiverId", messages?.receiver?.receiverId);
      if (file) {
        payload.append("messageFile", file);
      }

      if (file) {
        setIsFilePreviewOpen(true);
      }

      const response = await postAPI(
        "/message",
        payload,
        {
          "Content-Type": "multipart/form-data",
        },
        true
      );

      if (response.hasError) {
        toast(`Failed to send message: ${response.message}`);
        return;
      }

      setMessage("");
      setFile(null);
      setPreviewMessageImage(null);
      setPreviewMessagePDF(null);
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
          <div className="cards rounded-12 p-0">
            <div className="card-body">
              <div
                className="messenger rounded min-h-750 overflow-hidden"
                style={{ height: "100%", overflow: "hidden" }}
              >
                <div
                  className="messenger-listView"
                  style={{ height: "75vh", overflowY: "auto" }}
                >
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
                  <div className="m-body" style={{ flexGrow: 1 }}>
                    {currentView === "default" && (
                      <div
                        className="show scroll messenger-tab app-scroll"
                        data-view="users"
                        style={{ display: "block" }}
                      >
                        <div
                          className="listOfContacts"
                          style={{
                            width: "100%",
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
                                          backgroundImage: `url(
                                          http://localhost:3001${user?.profileImage}
                                        )`,
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
                                        <span></span>
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
                                      backgroundImage: `url(
                                      http://localhost:3001${item.user.profileImage}
                                    )`,
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
                  </div>
                </div>
                <div
                  className="messenger-messagingView"
                  style={{ flexGrow: 1 }}
                >
                  {messages?.receiver?.name && (
                    <div className="m-header m-header-messaging">
                      <nav className="d-flex align-items-center justify-content-between">
                        <div style={{ display: "flex" }}>
                          <Link href="#" className="show-listView">
                            <FaArrowLeft />
                          </Link>
                          <div
                            className="avatar av-s header-avatar"
                            style={{
                              margin: "-5px 10px",
                              backgroundImage: `url(
                              http://localhost:3001${messages?.receiver?.profileImage}
                            )`,
                            }}
                          ></div>
                          <Link href="#" className="user-name">
                            {messages?.receiver?.name}
                          </Link>
                        </div>
                        <nav className="m-header-right">
                          <Link
                            href="#"
                            className="show-infoSide my-lg-1 my-xl-1 mx-lg-1 mx-xl-2"
                            onClick={() => handleEdit(messages)}
                          >
                            <FaCircleInfo />
                          </Link>
                        </nav>
                      </nav>
                    </div>
                  )}

                  <div className="m-body app-scroll" style={{ opacity: 1 }}>
                    <div
                      className="messages"
                      style={{ height: "60vh", overflowY: "auto" }}
                    >
                      {messages?.messages?.length > 0 ? (
                        messages.messages.map(
                          ({
                            message,
                            createdAt,
                            messageFile,
                            user: { id } = {},
                          }) => {
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
                                      {messageFile && (
                                        <>
                                          {messageFile.endsWith(".pdf") ? (
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                              <div
                                                style={{
                                                  border: "1px solid #ccc",
                                                  borderRadius: "10px",
                                                  padding: "10px",
                                                  backgroundColor: "#f9f9f9",
                                                  textAlign: "center",
                                                  boxShadow:
                                                    "0 4px 8px rgba(0, 0, 0, 0.1)",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    marginBottom: "10px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                  }}
                                                >
                                                  <strong
                                                    style={{
                                                      color: "#333333",
                                                      marginRight: "10px",
                                                      whiteSpace: "nowrap",
                                                      overflow: "hidden",
                                                      textOverflow: "ellipsis",
                                                    }}
                                                  >
                                                    {messageFile
                                                      .split("/")
                                                      .pop()}
                                                  </strong>
                                                  <HiOutlineDocumentDownload
                                                    size={30}
                                                    style={{
                                                      cursor: "pointer",
                                                      color: "blue",
                                                    }}
                                                    onClick={() => {
                                                      fetch(
                                                        `http://localhost:3001${messageFile}`
                                                      )
                                                        .then((response) =>
                                                          response.blob()
                                                        )
                                                        .then((blob) => {
                                                          const url =
                                                            window.URL.createObjectURL(
                                                              blob
                                                            );
                                                          const a =
                                                            document.createElement(
                                                              "a"
                                                            );
                                                          a.style.display =
                                                            "none";
                                                          a.href = url;
                                                          a.download =
                                                            messageFile
                                                              .split("/")
                                                              .pop();
                                                          document.body.appendChild(
                                                            a
                                                          );
                                                          a.click();
                                                          window.URL.revokeObjectURL(
                                                            url
                                                          );
                                                        })
                                                        .catch((error) => {
                                                          console.error(
                                                            "Error fetching the file:",
                                                            error
                                                          );
                                                        });
                                                    }}
                                                  />
                                                </div>
                                              </div>
                                            </Worker>
                                          ) : (
                                            <div
                                              style={{
                                                border: "1px solid #ccc",
                                                borderRadius: "10px",
                                                overflow: "hidden",
                                                marginTop: "10px",
                                                backgroundColor: "#f9f9f9",
                                                boxShadow:
                                                  "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              }}
                                            >
                                              <img
                                                src={`http://localhost:3001${messageFile}`}
                                                alt="Attached file"
                                                style={{
                                                  width: "100%",
                                                  height: "auto",
                                                  borderBottom:
                                                    "1px solid #ccc",
                                                }}
                                              />
                                              <div
                                                style={{
                                                  padding: "10px",
                                                  textAlign: "center",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                  }}
                                                ></div>
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      )}
                                      {message}

                                      <sub
                                        title="2020-10-08 09:35:19"
                                        className="message-time"
                                      >
                                        <FaCheckDouble />{" "}
                                        {`${formatTimeAgo(createdAt)}`}
                                      </sub>
                                    </p>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="message-card">
                                  <p>
                                    {messageFile && (
                                      <>
                                        {messageFile.endsWith(".pdf") ? (
                                          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                            <div
                                              style={{
                                                border: "1px solid #ccc",
                                                borderRadius: "10px",
                                                padding: "10px",
                                                backgroundColor: "#f9f9f9",
                                                textAlign: "center",
                                                boxShadow:
                                                  "0 4px 8px rgba(0, 0, 0, 0.1)",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  marginBottom: "10px",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                <strong
                                                  style={{
                                                    color: "#333333",
                                                    marginRight: "10px",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                  }}
                                                >
                                                  {messageFile.split("/").pop()}
                                                </strong>
                                                <HiOutlineDocumentDownload
                                                  size={30}
                                                  style={{
                                                    cursor: "pointer",
                                                    color: "blue",
                                                  }}
                                                  onClick={() => {
                                                    fetch(
                                                      `http://localhost:3001${messageFile}`
                                                    )
                                                      .then((response) =>
                                                        response.blob()
                                                      )
                                                      .then((blob) => {
                                                        const url =
                                                          window.URL.createObjectURL(
                                                            blob
                                                          );
                                                        const a =
                                                          document.createElement(
                                                            "a"
                                                          );
                                                        a.style.display =
                                                          "none";
                                                        a.href = url;
                                                        a.download = messageFile
                                                          .split("/")
                                                          .pop();
                                                        document.body.appendChild(
                                                          a
                                                        );
                                                        a.click();
                                                        window.URL.revokeObjectURL(
                                                          url
                                                        );
                                                      })
                                                      .catch((error) => {
                                                        console.error(
                                                          "Error fetching the file:",
                                                          error
                                                        );
                                                      });
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </Worker>
                                        ) : (
                                          <div
                                            style={{
                                              border: "1px solid #ccc",
                                              borderRadius: "10px",
                                              overflow: "hidden",
                                              marginTop: "10px",
                                              backgroundColor: "#f9f9f9",
                                              boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                            }}
                                          >
                                            <img
                                              src={`http://localhost:3001${messageFile}`}
                                              alt="Attached file"
                                              style={{
                                                width: "100%",
                                                height: "auto",
                                                borderBottom: "1px solid #ccc",
                                              }}
                                            />
                                            <div
                                              style={{
                                                padding: "10px",
                                                textAlign: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                }}
                                              >
                                                {/* <strong
                                                    style={{
                                                      color: "black",
                                                      marginRight: "10px",
                                                      whiteSpace: "nowrap",
                                                      overflow: "hidden",
                                                      textOverflow: "ellipsis",
                                                    }}
                                                  >
                                                    {messageFile
                                                      .split("/")
                                                      .pop()}
                                                  </strong> */}
                                                {/* <HiOutlineDocumentDownload
                                                    size={30}
                                                    style={{
                                                      cursor: "pointer",
                                                      color: "blue",
                                                    }}
                                                    onClick={() => {
                                                      fetch(
                                                        `http://localhost:3001${messageFile}`
                                                      )
                                                        .then((response) =>
                                                          response.blob()
                                                        )
                                                        .then((blob) => {
                                                          const url =
                                                            window.URL.createObjectURL(
                                                              blob
                                                            );
                                                          const a =
                                                            document.createElement(
                                                              "a"
                                                            );
                                                          a.style.display =
                                                            "none";
                                                          a.href = url;
                                                          a.download =
                                                            messageFile
                                                              .split("/")
                                                              .pop();
                                                          document.body.appendChild(
                                                            a
                                                          );
                                                          a.click();
                                                          window.URL.revokeObjectURL(
                                                            url
                                                          );
                                                        })
                                                        .catch((error) => {
                                                          console.error(
                                                            "Error fetching the file:",
                                                            error
                                                          );
                                                        });
                                                    }}
                                                  /> */}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    )}
                                    {message}
                                    <sub title="2022-08-09 16:38:31">
                                      {`${formatTimeAgo(createdAt)}`}
                                    </sub>
                                  </p>
                                </div>
                              );
                            }
                          }
                        )
                      ) : (
                        <p></p>
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
                        style={{
                          display: "block",
                          position: "sticky",
                          bottom: "0",
                          backgroundColor: "white",
                          zIndex: 10,
                        }}
                      >
                        <form onSubmit={sendMessage}>
                          <label>
                            <FaPaperclip />
                            <input
                              type="file"
                              id="panFile"
                              name="messageFile"
                              className="form-control"
                              accept="image/*,application/pdf"
                              onChange={handleChange}
                            />
                          </label>
                          <div className="emoji-container">
                            <FaSmile
                              onClick={() =>
                                setShowEmojiPicker((prev) => !prev)
                              }
                              style={{ cursor: "pointer", margin: "10px 8px" }}
                            />
                            {showEmojiPicker && (
                              <div
                                style={{
                                  position: "absolute",
                                  zIndex: 10,
                                  bottom: "50px",
                                }}
                              >
                                <EmojiPicker
                                  onEmojiClick={handleEmojiClick}
                                  height={300}
                                  width={650}
                                />
                              </div>
                            )}
                          </div>
                          <textarea
                            name="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="m-send app-scroll"
                            placeholder="Type a message..."
                            style={{
                              overflow: "hidden",
                              overflowWrap: "break-word",
                            }}
                          />

                          {/* Send Button */}
                          <button type="submit">
                            <FaPaperPlane />
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                {isModalOpen && selectedTrainee && (
                  <DeleteMessage
                    messages={selectedTrainee}
                    conversationId={selectedTrainee.conversationId}
                    setMessages={setMessages}
                    onClose={() => setIsModalOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messagess;

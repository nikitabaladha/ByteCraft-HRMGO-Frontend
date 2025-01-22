import React from "react";
import getAPI from "../../../api/getAPI";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { BiTimeFive } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
// import { FaRegBookmark } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";

const MessengerMainContent = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    console.log("userDetails", userDetails.id);
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
  console.log("conversation", conversations)
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
                      <Link href="#" className="active-tab" data-view="users">
                        <span title="Recent">
                          <BiTimeFive />
                        </span>
                      </Link>
                      <Link href="#" data-view="groups">
                        <span title="Members">
                          <FaUsers />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="m-body">
                    <div
                      className=" show scroll  messenger-tab app-scroll"
                      data-view="users"
                      style={{}}
                    >
                      {/* <p className="messenger-title">Favorites</p>
                      <div className="messenger-favorites app-scroll-thin">
                        <div className="favorite-list-item">
                          <div
                            data-id={7}
                            data-action={0}
                            className="avatar av-m"
                            style={{
                              backgroundImage:
                                'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-6.jpg")',
                            }}
                          ></div>
                          <p>Teresa..</p>
                        </div>
                        <div className="favorite-list-item">
                          <div
                            data-id={4}
                            data-action={0}
                            className="avatar av-m"
                            style={{
                              backgroundImage:
                                'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg")',
                            }}
                          ></div>
                          <p>Julie ..</p>
                        </div>
                        <div className="favorite-list-item">
                          <div
                            data-id={5}
                            data-action={0}
                            className="avatar av-m"
                            style={{
                              backgroundImage:
                                'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-2.jpg")',
                            }}
                          ></div>
                          <p>Lunea ..</p>
                        </div>
                      </div>
                      <table
                        className="messenger-list-item m-li-divider"
                        data-contact={1}
                      >
                        <tbody>
                          <tr data-action={0}>
                            <td width="100%">
                              <div
                                className="avatar av-m"
                                style={{
                                  backgroundColor: "#d9efff",
                                  textAlign: "center",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <span
                                  style={{ fontSize: "22px", color: "#68a5ff" }}
                                >
                                  <FaRegBookmark />
                                </span>
                              </div>
                            </td>
                            <td style={{ position: "relative" }} width="100%">
                              <p
                                data-id={1}
                                data-type="user"
                                style={{ textAlign: "start" }}
                              >
                                Saved Messages
                                <span>You</span>
                              </p>
                              <span
                                style={{
                                  justifyContent: "left",
                                  display: "flex",
                                }}
                              >
                                {" "}
                                Save messages secretly
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table> */}

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
                              key={conversationId}
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
                                      {user?.name}
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

                        {/* <table className="messenger-list-item" data-contact={7}>
                          <tbody>
                            <tr data-action={0}>
                              <td style={{ position: "relative" }}>
                                <div
                                  data-id={7}
                                  data-action={0}
                                  className="avatar av-m"
                                  style={{
                                    backgroundImage:
                                      'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-6.jpg")',
                                  }}
                                />
                              </td>
                              <td width="100%">
                                <p
                                  data-id={7}
                                  data-type="user"
                                  style={{ textAlign: "start" }}
                                >
                                  Teresa R McR..
                                  <span>2 years ago</span>
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
                                  “I’m sorry, I don&amp;..
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="messenger-list-item" data-contact={6}>
                          <tbody>
                            <tr data-action={0}>
                              <td style={{ position: "relative" }}>
                                <div
                                  data-id={6}
                                  data-action={0}
                                  className="avatar av-m"
                                  style={{
                                    backgroundImage:
                                      'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-3.jpg")',
                                  }}
                                />
                              </td>
                              <td width="100%">
                                <p
                                  data-id={6}
                                  data-type="user"
                                  style={{ textAlign: "start" }}
                                >
                                  Ida F. Mulle..
                                  <span>4 years ago</span>
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
                                  hello
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table> */}
                      </div>
                    </div>
                    <div
                      className="all_members  messenger-tab app-scroll"
                      data-view="groups"
                      style={{ display: "none" }}
                    >
                      <table className="messenger-list-item" data-contact={2}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={2}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg")',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={2}>hr</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="messenger-list-item" data-contact={4}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={4}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-1.jpg")',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={4}>Julie Lynn</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        className="messenger-list-item m-list-active"
                        data-contact={5}
                      >
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={5}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-2.jpg")',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={5}>Lunea Todd</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="messenger-list-item" data-contact={6}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={6}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-3.jpg")',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={6}>Ida F. Mulle..</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="messenger-list-item" data-contact={7}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={7}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/user-6.jpg")',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={7}>Teresa R McR..</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="messenger-list-item" data-contact={32}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={32}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png") !important',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={32}>Tamekah Rush</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="messenger-list-item" data-contact={35}>
                        <tbody>
                          <tr data-action={0}>
                            <td style={{ position: "relative" }}>
                              <div
                                data-id={35}
                                data-action={0}
                                className="avatar av-m"
                                style={{
                                  backgroundImage:
                                    'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png") !important',
                                }}
                              />
                            </td>
                            <td>
                              <p data-id={35}>User</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
                  <div className="m-header m-header-messaging">
                    <nav className="d-flex a;align-items-center justify-content-between">
                      <div style={{ display: "flex" }}>
                        <Link href="#" className="show-listView">
                          <FaArrowLeft />
                        </Link>
                        <div
                          className="avatar av-s header-avatar"
                          style={{
                            margin: "0px 10px",
                            marginTop: "-5px",
                            marginBottom: "-5px",
                            backgroundImage:
                              'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png")',
                          }}
                        ></div>
                        <Link href="#" className="user-name">
                          Messenger
                        </Link>
                      </div>
                      <nav className="m-header-right">
                        <Link
                          href="#"
                          className="add-to-favorite my-lg-1 my-xl-1 mx-lg-1 mx-xl-1"
                          style={{ display: "none" }}
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
                  <div
                    className="internet-connection successBG-rgba"
                    style={{ display: "none" }}
                  >
                    <span
                      className="ic-connected"
                      style={{ display: "inline" }}
                    >
                      Connected
                    </span>
                    <span className="ic-connecting" style={{ display: "none" }}>
                      Connecting...
                    </span>
                    <span className="ic-noInternet" style={{ display: "none" }}>
                      Please add pusher settings for using messenger.
                    </span>
                  </div>
                  <div className="m-body app-scroll" style={{ opacity: "0.5" }}>
                    <div className="messages">
                      <p
                        className="message-hint"
                        style={{ marginTop: "calc(30% - 126.2px)" }}
                      >
                        <span>Please select a chat to start messaging</span>
                      </p>
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
                    <div
                      className="messenger-sendCard"
                      style={{ display: "none" }}
                    >
                      <form
                        id="message-form"
                        method="POST"
                        action="https://demo.workdo.io/hrmgo/chats/sendMessage"
                        encType="multipart/form-data"
                      >
                        <input
                          type="hidden"
                          name="_token"
                          defaultValue="HOZuN9VYesr0i8kdzaX9u6JqoNIeKo2mz0eNZqyE"
                          autoComplete="off"
                        />{" "}
                        <label>
                          <FaPaperclip />
                          <input
                            disabled="disabled"
                            type="file"
                            className="upload-attachment"
                            name="file"
                            accept=".png, .jpg, .jpeg, .gif, .zip, .rar, .txt"
                          />
                        </label>
                        <textarea
                          readOnly="readonly"
                          name="message"
                          className="m-send app-scroll"
                          placeholder="Type a message.."
                          style={{
                            overflow: "hidden",
                            overflowWrap: "break-word",
                          }}
                          defaultValue={""}
                        />
                        <button disabled="disabled">
                          <FaPaperPlane />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className="messenger-infoView app-scroll text-center"
                  style={{}}
                >
                  <nav className="text-center">
                    <Link href="#">
                      <TiTimes />
                    </Link>
                  </nav>
                  <div
                    className="avatar av-l"
                    style={{
                      backgroundImage:
                        'url("https://demo.workdo.io/hrmgo/storage/uploads/avatar/avatar.png")',
                    }}
                  ></div>
                  <p className="info-name">Messenger</p>
                  <div className="messenger-infoView-btns">
                    <Link href="#" className="danger delete-conversation">
                      <FaRegTrashAlt /> Delete Conversation
                    </Link>
                  </div>
                  <div className="messenger-infoView-shared">
                    <p className="messenger-title">shared photos</p>
                    <div className="shared-photos-list" />
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

export default MessengerMainContent;

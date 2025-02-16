import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";
import postAPI from "../../../../api/postAPI";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import getAPI from "../../../../api/getAPI";

const ContractDetailNotes = ({ notes, setNotes }) => {
  const [noteText, setNoteText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [userAvatar, setUserAvatar] = useState(""); // State to hold user avatar
  const { id: contractId } = useParams();

  // Fetch user details including avatar when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getAPI("/get-user-details", {}, true);
        if (!response.hasError && response.data) {
          const user = response.data.data;
          const profilePath = user.profileImage.startsWith("/")
            ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${user.profileImage}`
            : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/Images/profilePicture/default-avatar.png`;
          setUserAvatar(profilePath); // Set the user avatar
        } else {
          toast.error("Failed to fetch User data.");
        }
      } catch (error) {
        console.error("Error fetching User data:", error);
        toast.error("An error occurred while fetching User data.");
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch notes with user avatars when the component mounts
  useEffect(() => {
    const fetchNotesWithAvatars = async () => {
      try {
        const response = await getAPI(
          `/contract-note?contractId=${contractId}`,
          {},
          true
        );
        if (!response.hasError && response.data) {
          const notesWithAvatars = await Promise.all(
            response.data.data.map(async (note) => {
              const userResponse = await getAPI(`/get-user-details`, {}, true);
              const userAvatar = userResponse.data.data.profileImage.startsWith(
                "/"
              )
                ? `${process.env.REACT_APP_API_URL_FOR_IMAGE}${userResponse.data.data.profileImage}`
                : `${process.env.REACT_APP_API_URL_FOR_IMAGE}/Images/profilePicture/default-avatar.png`;

              return {
                ...note,
                userAvatar,
              };
            })
          );

          setNotes(notesWithAvatars);
        } else {
          toast.error("Failed to fetch notes.");
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
        // toast.error("An error occurred while fetching notes.");
      }
    };

    fetchNotesWithAvatars();
  }, [contractId]);

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedNote(null);
  };

  const handleDeleteConfirmed = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const openDeleteDialog = (note) => {
    setSelectedNote(note);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      toast.error("Note cannot be empty!");
      return;
    }

    try {
      const payload = {
        contractId,
        note: noteText,
      };

      const response = await postAPI("/contract-note", payload, true);

      if (!response.hasError) {
        const now = new Date();
        const relativeTime = formatDistance(now, now, { addSuffix: true });

        const newNote = {
          id: response.data.data._id,
          note: noteText,
          createdAt: relativeTime,
          userAvatar: userAvatar,
        };

        setNotes((prevNotes) => [...prevNotes, newNote]);

        toast.success("Note added successfully!");
        setNoteText("");
      } else {
        toast.error(response.message || "Failed to add Note.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div id="notes" role="tabpanel" aria-labelledby="pills-comments-tab">
      <div className="row pt-2">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Notes</h5>
            </div>
            <div className="card-body">
              <form className="needs-validation" noValidate>
                <div className="form-group">
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="Add a note..."
                    spellCheck="false"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12 text-end mb-0">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </div>
              </form>
              <div className="list-group list-group-flush mb-0 mt-3">
                {notes.map((note) => (
                  <div key={note.id} className="list-group-item">
                    <div className="d-flex align-items-center">
                      <div className="col-auto">
                        <Link href={note.userAvatar} target="_blank">
                          <img
                            className="img-fluid rounded border-2 border border-primary"
                            width="35px"
                            style={{ height: 35 }}
                            src={note.userAvatar}
                            alt="User Avatar"
                          />
                        </Link>
                      </div>
                      <div className="col ml-n2" style={{ marginLeft: 10 }}>
                        <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                          {note.note}
                        </p>
                        <small className="d-block">{note.createdAt}</small>
                      </div>
                      <div className="dt-buttons">
                        <div className="action-btn bg-danger">
                          <Link
                            className="btn btn-sm d-inline-flex align-items-center bs-pass-para"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title=""
                            data-bs-original-title="Delete"
                            onClick={(e) => {
                              e.preventDefault();
                              openDeleteDialog(note);
                            }}
                          >
                            <span className="text-white">
                              <FaRegTrashAlt />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="note"
          id={selectedNote.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default ContractDetailNotes;

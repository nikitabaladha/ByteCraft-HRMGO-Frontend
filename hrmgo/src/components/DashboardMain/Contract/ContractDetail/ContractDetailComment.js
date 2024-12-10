import React, { useState } from "react";
import { TbBrandTelegram } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";
import ConfirmationDialog from "../../ConfirmationDialog";

import postAPI from "../../../../api/postAPI";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContractDetailComment = ({ comments, setComments }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentText, setCommentText] = useState("");
  const { id: contractId } = useParams();

  const openDeleteDialog = (comment) => {
    setSelectedComment(comment);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedComment(null);
  };

  const handleDeleteConfirmed = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const payload = {
        contractId,
        comment: commentText,
      };

      const response = await postAPI("/contract-comment", payload, true);

      if (!response.hasError) {
        const now = new Date();
        const relativeTime = formatDistance(now, now, { addSuffix: true });

        const newComment = {
          id: response.data.data._id,
          comment: commentText,
          createdAt: relativeTime,
          userAvatar: "path/to/default/avatar.png",
        };

        setComments((prevComments) => [...prevComments, newComment]);

        toast.success("Comment added successfully!");
        setCommentText("");
      } else {
        toast.error(response.message || "Failed to add comment.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <div id="comment" role="tabpanel" aria-labelledby="pills-comments-tab">
        <div className="row pt-2">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Comments</h5>
              </div>
              <div className="card-footer">
                <div className="col-12 d-flex">
                  <div className="form-group mb-0 form-send w-100">
                    <input type="hidden" id="commenturl" />
                    <textarea
                      rows={3}
                      id="formComment"
                      className="form-control"
                      name="comment"
                      data-toggle="autosize"
                      placeholder="Add a comment..."
                      spellCheck="false"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  <button
                    id="comment_submit"
                    className="btn tn-send"
                    onClick={handleSubmit}
                  >
                    <TbBrandTelegram className="f-16 text-primary" />
                  </button>
                </div>
                <div className="">
                  <div
                    className="list-group list-group-flush mb-0"
                    id="comments"
                  >
                    {comments.map((comment) => (
                      <div key={comment.id} className="list-group-item">
                        <div className="d-flex align-items-center">
                          <div className="col-auto">
                            <Link href={comment.userAvatar} target="_blank">
                              <img
                                className="img-fluid rounded border-2 border border-primary"
                                width="35px"
                                style={{ height: 35 }}
                                src={comment.userAvatar}
                                alt="User Avatar"
                              />
                            </Link>
                          </div>
                          <div className="col ml-n2" style={{ marginLeft: 10 }}>
                            <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                              {comment.comment}
                            </p>
                            <small className="d-block">
                              {comment.createdAt}
                            </small>
                          </div>
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-danger">
                                <Link
                                  className="btn btn-sm d-inline-flex align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title=""
                                  data-bs-original-title="Delete"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openDeleteDialog(comment);
                                  }}
                                >
                                  <span className="text-white">
                                    <FaRegTrashAlt />
                                  </span>
                                </Link>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="comment"
          id={selectedComment.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ContractDetailComment;

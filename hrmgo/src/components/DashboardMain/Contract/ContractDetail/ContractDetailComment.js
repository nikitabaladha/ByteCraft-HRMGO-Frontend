import React from "react";
import { TbBrandTelegram } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContractDetailAttachment = () => {
  return (
    <>
      <div id="comment" role="tabpanel" aria-labelledby="pills-comments-tab">
        <div className="row pt-2">
          <div className="col-12">
            <div id="comment">
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
                        defaultValue={""}
                      />
                      <grammarly-extension
                        data-grammarly-shadow-root="true"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          pointerEvents: "none",
                          zIndex: 1,
                        }}
                        className="cGcvT"
                      />
                      <grammarly-extension
                        data-grammarly-shadow-root="true"
                        style={{
                          mixBlendMode: "darken",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          pointerEvents: "none",
                          zIndex: 1,
                        }}
                        className="cGcvT"
                      />
                    </div>
                    <button id="comment_submit" className="btn b tn-send">
                      <TbBrandTelegram className="f-16 text-primary"></TbBrandTelegram>
                    </button>
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

export default ContractDetailAttachment;

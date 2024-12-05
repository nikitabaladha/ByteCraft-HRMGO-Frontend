import React from "react";

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
                      <input
                        type="hidden"
                        id="commenturl"
                        defaultValue="https://demo.workdo.io/hrmgo/contract/1/commentstore"
                      />
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
                      <i className="f-16 text-primary ti ti-brand-telegram"></i>
                    </button>
                  </div>
                  <div className="">
                    <div
                      className="list-group list-group-flush mb-0"
                      id="comments"
                    >
                      <div className="list-group-item ">
                        <div className="d-flex align-items-center">
                          <div className="col-auto">
                            <a
                              href="https://demo.workdo.io/hrmgo/storage/uploads/avatar//owner.jpg"
                              target="_blank"
                            >
                              <img
                                className="img-fluid rounded border-2 border border-primary"
                                width="35px"
                                style={{ height: 35 }}
                                src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//owner.jpg"
                              />
                            </a>
                          </div>
                          <div className="col ml-n2" style={{ marginLeft: 10 }}>
                            <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                              But I must explain to you how all this mistaken
                              idea of denouncing pleasure and praising pain was
                              born
                            </p>
                            <small className="d-block">2 years ago</small>
                          </div>
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-danger">
                                <form action="" />
                                <form
                                  method="GET"
                                  action="https://demo.workdo.io/hrmgo/contract/1/comment"
                                  acceptCharset="UTF-8"
                                >
                                  <a
                                    href="#!"
                                    className="btn btn-sm d-inline-flex align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <span className="text-white">
                                      {" "}
                                      <i className="ti ti-trash" />
                                    </span>
                                  </a>
                                </form>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item ">
                        <div className="d-flex align-items-center">
                          <div className="col-auto">
                            <a
                              href="https://demo.workdo.io/hrmgo/storage/uploads/avatar//user-1.jpg"
                              target="_blank"
                            >
                              <img
                                className="img-fluid rounded border-2 border border-primary"
                                width="35px"
                                style={{ height: 35 }}
                                src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//user-1.jpg"
                              />
                            </a>
                          </div>
                          <div className="col ml-n2" style={{ marginLeft: 10 }}>
                            <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                              Heyyy..
                            </p>
                            <small className="d-block">2 years ago</small>
                          </div>
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-danger">
                                <form action="" />
                                <form
                                  method="GET"
                                  action="https://demo.workdo.io/hrmgo/contract/2/comment"
                                  acceptCharset="UTF-8"
                                >
                                  <a
                                    href="#!"
                                    className="btn btn-sm d-inline-flex align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <span className="text-white">
                                      {" "}
                                      <i className="ti ti-trash" />
                                    </span>
                                  </a>
                                </form>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
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

export default ContractDetailAttachment;

import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ContractDetailNotes = () => {
  return (
    <>
      <div id="notes" role="tabpanel" aria-labelledby="pills-comments-tab">
        <div className="row pt-2">
          <div className="col-12">
            <div id="notes">
              <div className="card">
                <div className="card-header">
                  <h5>Notes</h5>
                  <div className="text-end">
                    <Link
                      to=""
                      data-size="md"
                      className="btn btn-primary btn-icon btn-sm"
                      data-ajax-popup-over="true"
                      id="grammarCheck"
                      data-url="https://demo.workdo.io/hrmgo/grammar/grammar"
                      data-bs-placement="top"
                      data-title="Grammar check with AI"
                    >
                      <i className="ti ti-rotate" />
                      <span>Grammar check with AI</span>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <form action="" />
                  <form
                    method="POST"
                    action="https://demo.workdo.io/hrmgo/contract/1/notestore"
                    acceptCharset="UTF-8"
                    className="needs-validation"
                    noValidate=""
                  >
                    <input
                      name="_token"
                      type="hidden"
                      defaultValue="tNIeDJ1Djji5lrP424mewpVD4t1MLtGWoz7uqm5h"
                    />
                    <div className="form-group">
                      <textarea
                        rows={3}
                        id="summernote"
                        className="form-control tox-target pc-tinymce summernotes grammer_textarea"
                        name="note"
                        data-toggle="autosize"
                        placeholder="Add a notes..."
                        spellCheck="false"
                        required=""
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
                    <div className="col-md-12 text-end mb-0">
                      <input
                        className="btn  btn-primary"
                        type="submit"
                        defaultValue="Add"
                      />
                    </div>
                  </form>
                  <div className="">
                    <div
                      className="list-group list-group-flush mb-0"
                      id="comments"
                    >
                      <div className="list-group-item ">
                        <div className="d-flex align-items-center">
                          <div className="col-auto">
                            <Link target="_blank">
                              <img
                                className="img-fluid rounded border-2 border border-primary"
                                width="35px"
                                style={{ height: 35 }}
                                src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//owner.jpg"
                                alt="owner"
                              />
                            </Link>
                          </div>
                          <div className="col ml-n2" style={{ marginLeft: 10 }}>
                            <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                              At vero eos et accusamus et iusto odio dignissimos
                              ducimus qui blanditiis praesentium voluptatum
                              deleniti atque corrupti quos dolores et quas
                              molestias excepturi sint occaecati cupiditate no
                            </p>
                            <small className="d-block">2 years ago</small>
                          </div>
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-danger">
                                <form method="GET" acceptCharset="UTF-8">
                                  <Link
                                    className=" btn btn-sm d-inline-flex align-items-center bs-pass-para "
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <span className="text-white">
                                      {" "}
                                      <FaRegTrashAlt />
                                    </span>
                                  </Link>
                                </form>
                              </div>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item ">
                        <div className="d-flex align-items-center">
                          <div className="col-auto">
                            <Link target="_blank">
                              <img
                                className="img-fluid rounded border-2 border border-primary"
                                width="35px"
                                style={{ height: 35 }}
                                src="https://demo.workdo.io/hrmgo/storage/uploads/avatar//user-1.jpg"
                                alt="owner"
                              />
                            </Link>
                          </div>
                          <div className="col ml-n2" style={{ marginLeft: 10 }}>
                            <p className="d-block h6 text-sm font-weight-light mb-0 text-break">
                              Nor again is there anyone who loves or pursues or
                              desires to obtain pain of itself, because it is
                              pain, but because occasionally circumstances occur
                              in which toil and pain can procure him so
                            </p>
                            <small className="d-block">2 years ago</small>
                          </div>
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-danger">
                                <form method="GET" acceptCharset="UTF-8">
                                  <Link
                                    className=" btn btn-sm d-inline-flex align-items-center bs-pass-para "
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title=""
                                    data-bs-original-title="Delete"
                                  >
                                    <span className="text-white">
                                      <FaRegTrashAlt />
                                    </span>
                                  </Link>
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

export default ContractDetailNotes;

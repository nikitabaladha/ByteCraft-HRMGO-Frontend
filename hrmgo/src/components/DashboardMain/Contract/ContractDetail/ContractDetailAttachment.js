import React from "react";

const ContractDetailAttachment = () => {
  return (
    <>
      <div id="attachments">
        <div className="row ">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Attachments</h5>
              </div>
              <div className="card-body">
                <div className=" ">
                  <div
                    className="col-md-12 dropzone browse-file dz-clickable"
                    id="my-dropzone"
                  >
                    <div className="dz-default dz-message">
                      <button className="dz-button" type="button">
                        Drop files here to upload
                      </button>
                    </div>
                  </div>
                </div>
                <div className=" py-3">
                  <div className="list-group-item ">
                    <div className="d-flex align-items-center">
                      <div className="col">
                        <h6 className="text-sm mb-0">
                          <a href="#!">user-4.jpg</a>
                        </h6>
                        <p className="card-text small text-muted">0.01 MB</p>
                      </div>
                      <div className="dt-buttons">
                        <span>
                          <div className="action-btn bg-warning me-2">
                            <a
                              href="https://demo.workdo.io/hrmgo/storage/contract_attechment/user-4.jpg"
                              className=" btn btn-sm d-inline-flex align-items-center"
                              download=""
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Download"
                            >
                              <span className="text-white">
                                <i className="ti ti-download" />
                              </span>
                            </a>
                          </div>
                          <div className="action-btn bg-danger">
                            <form
                              method="GET"
                              action="https://demo.workdo.io/hrmgo/contract/1/file/delete/1"
                              acceptCharset="UTF-8"
                            >
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                data-bs-toggle="tooltip"
                                title=""
                                data-bs-original-title="Delete"
                                aria-label="Delete"
                              >
                                <span className="text-white">
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
    </>
  );
};

export default ContractDetailAttachment;

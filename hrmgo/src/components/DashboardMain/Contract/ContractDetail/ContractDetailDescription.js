import React from "react";

const ContractDetailDescription = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Description </h5>
        </div>
        <div className="card-body p-3">
          <form
            method="POST"
            action="https://demo.workdo.io/hrmgo/contract/1/description"
            acceptCharset="UTF-8"
          >
            <input
              name="_token"
              type="hidden"
              defaultValue="tNIeDJ1Djji5lrP424mewpVD4t1MLtGWoz7uqm5h"
            />
            <div className="col-md-12">
              <div className="form-group mt-3">
                <textarea
                  className="summernote-simple"
                  name="contract_description"
                  id="contract_description"
                  rows={3}
                  style={{ display: "none" }}
                  defaultValue=""
                />
                <div className="note-editor note-frame card">
                  <div className="note-dropzone">
                    {" "}
                    <div className="note-dropzone-message" />
                  </div>
                  <div
                    className="note-toolbar-wrapper"
                    style={{ height: "71.2px" }}
                  >
                    <div
                      className="note-toolbar card-header"
                      style={{
                        position: "relative",
                        top: 0,
                        width: "100%",
                      }}
                    >
                      <div className="note-btn-group btn-group note-style">
                        <div className="note-btn-group btn-group">
                          <button
                            type="button"
                            className="note-btn btn btn-light btn-sm dropdown-toggle"
                            tabIndex={-1}
                            data-bs-toggle="dropdown"
                          >
                            <i className="note-icon-magic" />
                          </button>
                          <div className="dropdown-menu dropdown-style">
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="p"
                            >
                              <p>Normal</p>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="blockquote"
                            >
                              <blockquote className="blockquote">
                                Blockquote
                              </blockquote>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="pre"
                            >
                              <pre>Code</pre>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h1"
                            >
                              <h1>Header 1</h1>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h2"
                            >
                              <h2>Header 2</h2>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h3"
                            >
                              <h3>Header 3</h3>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h4"
                            >
                              <h4>Header 4</h4>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h5"
                            >
                              <h5>Header 5</h5>
                            </a>
                            <a
                              className="dropdown-item"
                              href="#"
                              data-value="h6"
                            >
                              <h6>Header 6</h6>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="note-btn-group btn-group note-font">
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm note-btn-bold"
                          tabIndex={-1}
                        >
                          <i className="note-icon-bold" />
                        </button>
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm note-btn-italic"
                          tabIndex={-1}
                        >
                          <i className="note-icon-italic" />
                        </button>
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm note-btn-underline"
                          tabIndex={-1}
                        >
                          <i className="note-icon-underline" />
                        </button>
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm note-btn-strikethrough"
                          tabIndex={-1}
                        >
                          <i className="note-icon-strikethrough" />
                        </button>
                      </div>
                      <div className="note-btn-group btn-group note-list">
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm"
                          tabIndex={-1}
                        >
                          <i className="note-icon-unorderedlist" />
                        </button>
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm"
                          tabIndex={-1}
                        >
                          <i className="note-icon-orderedlist" />
                        </button>
                        <div className="note-btn-group btn-group">
                          <button
                            type="button"
                            className="note-btn btn btn-light btn-sm dropdown-toggle"
                            tabIndex={-1}
                            data-bs-toggle="dropdown"
                          >
                            <i className="note-icon-align-left" />
                          </button>
                          <div className="dropdown-menu">
                            <div className="note-btn-group btn-group note-align">
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-left" />
                              </button>
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-center" />
                              </button>
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-right" />
                              </button>
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-justify" />
                              </button>
                            </div>
                            <div className="note-btn-group btn-group note-list">
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-outdent" />
                              </button>
                              <button
                                type="button"
                                className="note-btn btn btn-light btn-sm"
                                tabIndex={-1}
                              >
                                <i className="note-icon-align-indent" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="note-btn-group btn-group note-insert">
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm"
                          tabIndex={-1}
                        >
                          <i className="note-icon-link" />
                        </button>
                        <button
                          type="button"
                          className="note-btn btn btn-light btn-sm"
                          tabIndex={-1}
                        >
                          <i className="note-icon-chain-broken" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="note-editing-area">
                    <div className="note-handle">
                      <div className="note-control-selection">
                        <div className="note-control-selection-bg" />
                        <div className="note-control-holder note-control-nw" />
                        <div className="note-control-holder note-control-ne" />
                        <div className="note-control-holder note-control-sw" />
                        <div className="note-control-sizing note-control-se" />
                        <div className="note-control-selection-info" />
                      </div>
                    </div>
                    <textarea className="note-codable" defaultValue={""} />
                    <div
                      className="note-editable card-block"
                      contentEditable="true"
                      style={{
                        height: 250,
                        maxHeight: 300,
                        minHeight: 200,
                      }}
                    >
                      <h3>
                        The standard Lorem Ipsum passage, used since the 1500s
                      </h3>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum."
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <h3>
                        Section 1.10.32 of "de Finibus Bonorum et Malorum\",
                        written by Cicero in 45 BC
                      </h3>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        "Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni dolores eos
                        qui ratione voluptatem sequi nesciunt. Neque porro
                        quisquam est, qui dolorem ipsum quia dolor sit amet,
                        consectetur, adipisci velit, sed quia non numquam eius
                        modi tempora incidunt ut labore et dolore magnam aliquam
                        quaerat voluptatem. Ut enim ad minima veniam, quis
                        nostrum exercitationem ullam corporis suscipit
                        laboriosam, nisi ut aliquid ex ea commodi consequatur?
                        Quis autem vel eum iure reprehenderit qui in ea
                        voluptate velit esse quam nihil molestiae consequatur,
                        vel illum qui dolorem eum fugiat quo voluptas nulla
                        pariatur?"
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <h3>1914 translation by H. Rackham</h3>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        "But I must explain to you how all this mistaken idea of
                        denouncing pleasure and praising pain was born and I
                        will give you a complete account of the system, and
                        expound the actual teachings of the great explorer of
                        the truth, the master-builder of human happiness. No one
                        rejects, dislikes, or avoids pleasure itself, because it
                        is pleasure, but because those who do not know how to
                        pursue pleasure rationally encounter consequences that
                        are extremely painful. Nor again is there anyone who
                        loves or pursues or desires to obtain pain of itself,
                        because it is pain, but because occasionally
                        circumstances occur in which toil and pain can procure
                        him some great pleasure. To take a trivial example,
                        which of us ever undertakes laborious physical exercise,
                        except to obtain some advantage from it? But who has any
                        right to find fault with a man who chooses to enjoy a
                        pleasure that has no annoying consequences, or one who
                        avoids a pain that produces no resultant pleasure?"
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <h3>
                        Section 1.10.33 of "de Finibus Bonorum et Malorum",
                        written by Cicero in 45 BC
                      </h3>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        &nbsp;
                      </p>
                      <p
                        style={{
                          fontSize: "medium",
                          fontWeight: 400,
                        }}
                      >
                        "At vero eos et accusamus et iusto odio dignissimos
                        ducimus qui blanditiis praesentium voluptatum deleniti
                        atque corrupti quos dolores et quas molestias excepturi
                        sint occaecati cupiditate non provident, similique sunt
                        in culpa qui officia deserunt mollitia animi, id est
                        laborum et dolorum fuga. Et harum quidem rerum facilis
                        est et expedita distinctio. Nam libero tempore, cum
                        soluta nobis est eligendi optio cumque nihil impedit quo
                        minus id quod maxime placeat facere possimus, omnis
                        voluptas assumenda est, omnis dolor repellendus.
                        Temporibus autem quibusdam et aut officiis debitis aut
                        rerum necessitatibus saepe eveniet ut et voluptates
                        repudiandae sint et molestiae non recusandae. Itaque
                        earum rerum hic tenetur a sapiente delectus, ut aut
                        reiciendis voluptatibus maiores alias consequatur aut
                        perferendis doloribus asperiores repellat."
                      </p>
                    </div>
                  </div>
                  <div className="note-statusbar">
                    {" "}
                    <div className="note-resizebar">
                      {" "}
                      <div className="note-icon-bar" />{" "}
                      <div className="note-icon-bar" />{" "}
                      <div className="note-icon-bar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 text-end">
              <div className="form-group mt-3 me-3">
                <input
                  className="btn  btn-primary"
                  type="submit"
                  defaultValue="Add"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContractDetailDescription;

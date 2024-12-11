import React from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { Link } from "react-router-dom";

const ContractPreview = () => {
  return (
    <>
      <div className="container">
        <div className="dash-content">
          {/* [ breadcrumb ] start */}
          <div className="page-header">
            <div className="page-block">
              <div className="row align-items-center">
                <div className="col-md-12 mt-5 mb-4">
                  <div className="d-block d-sm-flex align-items-center justify-content-between">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-10">
              <div className="container">
                <div>
                  <div
                    className="text-md-end mb-2"
                    style={{ marginRight: "-44px" }}
                  >
                    <Link
                      className="btn btn-sm btn-primary btn-icon"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title=""
                      target="_blanks"
                      data-bs-original-title="Download"
                      aria-label="Download"
                    >
                      <MdOutlineFileDownload className="text-white" />
                    </Link>
                  </div>
                  <div
                    className="card mt-5"
                    id="printTable"
                    style={{ marginLeft: 180, marginRight: "-57px" }}
                  >
                    <div className="card-body">
                      <div className="row invoice-title mt-2">
                        <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 ">
                          <img
                            src="https://demo.workdo.io/hrmgo/storage/uploads/logo//logo-dark.png?1733880344"
                            style={{ maxWidth: 150 }}
                            alt="logo"
                          />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-nd-6 col-lg-6 col-12 text-end">
                          <h3 className="invoice-number">#CON00001</h3>
                        </div>
                      </div>
                      <div className="row align-items-center mb-4">
                        <div className="col-sm-6 mb-3 mb-sm-0 mt-3">
                          <div className="col-lg-6 col-md-8 mb-3">
                            <h6 className="d-inline-block m-0 d-print-none">
                              Contract Type :
                            </h6>
                            <span className="col-md-8">
                              <span className="text-md">Marketing</span>
                            </span>
                          </div>
                          <div className="col-lg-6 col-md-8">
                            <h6 className="d-inline-block m-0 d-print-none">
                              Contract Value :
                            </h6>
                            <span className="col-md-8">
                              <span className="text-md">$20.00</span>
                            </span>
                          </div>
                        </div>
                        <div className="col-sm-6 text-sm-end">
                          <div>
                            <div className="float-end">
                              <div className="">
                                <h6 className="d-inline-block m-0 d-print-none">
                                  Start Date :
                                </h6>
                                <span className="col-md-8">
                                  <span className="text-md">Nov 3, 2024</span>
                                </span>
                              </div>
                              <div className="mt-3">
                                <h6 className="d-inline-block m-0 d-print-none">
                                  End Date :
                                </h6>
                                <span className="col-md-8">
                                  <span className="text-md">Dec 20, 2024</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p data-v-f2a183a6=""></p>
                      <div>Sit ad qui molestia</div>
                      <br />
                      <div>
                        <h3>
                          The standard Lorem Ipsum passage, used since the 1500s
                        </h3>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          "Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum."
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <h3>
                          Section 1.10.32 of "de Finibus Bonorum et Malorum\",
                          written by Cicero in 45 BC
                        </h3>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          "Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium, totam
                          rem aperiam, eaque ipsa quae ab illo inventore
                          veritatis et quasi architecto beatae vitae dicta sunt
                          explicabo. Nemo enim ipsam voluptatem quia voluptas
                          sit aspernatur aut odit aut fugit, sed quia
                          consequuntur magni dolores eos qui ratione voluptatem
                          sequi nesciunt. Neque porro quisquam est, qui dolorem
                          ipsum quia dolor sit amet, consectetur, adipisci
                          velit, sed quia non numquam eius modi tempora incidunt
                          ut labore et dolore magnam aliquam quaerat voluptatem.
                          Ut enim ad minima veniam, quis nostrum exercitationem
                          ullam corporis suscipit laboriosam, nisi ut aliquid ex
                          ea commodi consequatur? Quis autem vel eum iure
                          reprehenderit qui in ea voluptate velit esse quam
                          nihil molestiae consequatur, vel illum qui dolorem eum
                          fugiat quo voluptas nulla pariatur?"
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <h3>1914 translation by H. Rackham</h3>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          "But I must explain to you how all this mistaken idea
                          of denouncing pleasure and praising pain was born and
                          I will give you a complete account of the system, and
                          expound the actual teachings of the great explorer of
                          the truth, the master-builder of human happiness. No
                          one rejects, dislikes, or avoids pleasure itself,
                          because it is pleasure, but because those who do not
                          know how to pursue pleasure rationally encounter
                          consequences that are extremely painful. Nor again is
                          there anyone who loves or pursues or desires to obtain
                          pain of itself, because it is pain, but because
                          occasionally circumstances occur in which toil and
                          pain can procure him some great pleasure. To take a
                          trivial example, which of us ever undertakes laborious
                          physical exercise, except to obtain some advantage
                          from it? But who has any right to find fault with a
                          man who chooses to enjoy a pleasure that has no
                          annoying consequences, or one who avoids a pain that
                          produces no resultant pleasure?"
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <h3>
                          Section 1.10.33 of "de Finibus Bonorum et Malorum",
                          written by Cicero in 45 BC
                        </h3>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          &nbsp;
                        </p>
                        <p style={{ fontSize: "medium", fontWeight: 400 }}>
                          "At vero eos et accusamus et iusto odio dignissimos
                          ducimus qui blanditiis praesentium voluptatum deleniti
                          atque corrupti quos dolores et quas molestias
                          excepturi sint occaecati cupiditate non provident,
                          similique sunt in culpa qui officia deserunt mollitia
                          animi, id est laborum et dolorum fuga. Et harum quidem
                          rerum facilis est et expedita distinctio. Nam libero
                          tempore, cum soluta nobis est eligendi optio cumque
                          nihil impedit quo minus id quod maxime placeat facere
                          possimus, omnis voluptas assumenda est, omnis dolor
                          repellendus. Temporibus autem quibusdam et aut
                          officiis debitis aut rerum necessitatibus saepe
                          eveniet ut et voluptates repudiandae sint et molestiae
                          non recusandae. Itaque earum rerum hic tenetur a
                          sapiente delectus, ut aut reiciendis voluptatibus
                          maiores alias consequatur aut perferendis doloribus
                          asperiores repellat."
                        </p>
                      </div>
                      <p />
                      <div className="row">
                        <div className="col-6">
                          <div style={{ marginTop: 20 }}>
                            <img width="200px" src="" alt="" />
                          </div>
                          <div>
                            <h5 className="mt-4">Company Signature</h5>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <div style={{ marginBottom: 20 }}>
                            <img width="200px" src="" alt="" />
                          </div>
                          <div>
                            <h5 style={{ marginTop: 45 }}>
                              Employee Signature
                            </h5>
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

export default ContractPreview;

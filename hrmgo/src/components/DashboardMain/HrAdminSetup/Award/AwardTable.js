import React from "react";

const AwardTable = () => {
  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <table className="table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Award Type</th>
                      <th>Date</th>
                      <th>Gift</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Julie Lynn</td>
                      <td>Trophy</td>
                      <td>Nov 4, 2024</td>
                      <td>watch</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/1/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/1"
                                acceptCharset="UTF-8"
                                id="delete-form-1"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Lunea Todd</td>
                      <td>Certificate</td>
                      <td>Dec 4, 2024</td>
                      <td>perfume</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/2/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/2"
                                acceptCharset="UTF-8"
                                id="delete-form-2"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ida F. Mullen</td>
                      <td>Trophy</td>
                      <td>Jan 4, 2025</td>
                      <td>watch</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/3/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/3"
                                acceptCharset="UTF-8"
                                id="delete-form-3"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Teresa R McRae</td>
                      <td>Certificate</td>
                      <td>Feb 4, 2025</td>
                      <td>Medal</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/4/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/4"
                                acceptCharset="UTF-8"
                                id="delete-form-4"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Lunea Todd</td>
                      <td>Trophy</td>
                      <td>Feb 4, 2025</td>
                      <td>watch</td>
                      <td>Magnam ipsa est obc</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/5/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/5"
                                acceptCharset="UTF-8"
                                id="delete-form-5"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Jillian Sykes</td>
                      <td>Certificate</td>
                      <td>Nov 15, 2024</td>
                      <td>Medal</td>
                      <td>Totam voluptatum qui</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/6/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/6"
                                acceptCharset="UTF-8"
                                id="delete-form-6"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Teresa R McRae</td>
                      <td>Trophy</td>
                      <td>Dec 25, 2024</td>
                      <td>perfume</td>
                      <td>Id quod ut cupidata</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/7/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/7"
                                acceptCharset="UTF-8"
                                id="delete-form-7"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Ida F. Mullen</td>
                      <td>Certificate</td>
                      <td>Jan 11, 2025</td>
                      <td>Medal</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/8/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/8"
                                acceptCharset="UTF-8"
                                id="delete-form-8"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Julie Lynn</td>
                      <td>Trophy</td>
                      <td>Nov 25, 2024</td>
                      <td>Medal</td>
                      <td>Lorem Ipsum, Or Lipsum.</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <a
                                href="#"
                                className="mx-3 btn btn-sm  align-items-center"
                                data-size="lg"
                                data-url="https://demo.workdo.io/hrmgo/award/9/edit"
                                data-ajax-popup="true"
                                data-bs-toggle="tooltip"
                                title=""
                                data-title="Edit Award"
                                data-bs-original-title="Edit"
                              >
                                <span className="text-white">
                                  <i className="ti ti-pencil " />
                                </span>
                              </a>
                            </div>
                            <div className="action-btn bg-danger ">
                              <form
                                method="POST"
                                action="https://demo.workdo.io/hrmgo/award/9"
                                acceptCharset="UTF-8"
                                id="delete-form-9"
                              >
                                <input
                                  name="_method"
                                  type="hidden"
                                  defaultValue="DELETE"
                                />
                                <input
                                  name="_token"
                                  type="hidden"
                                  defaultValue="vzlxygYzI3GJgQ7FIq3wXaZJ3jSL6qjml2am9bep"
                                />
                                <a
                                  href="#"
                                  className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-bs-original-title="Delete"
                                  aria-label="Delete"
                                >
                                  <span className="text-white">
                                    <i className="ti ti-trash " />
                                  </span>
                                </a>
                              </form>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AwardTable;

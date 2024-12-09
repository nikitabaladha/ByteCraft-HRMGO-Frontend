import React from 'react';

const FirstPart = () => {
    return (
        <div className="row">
            <div className="col-xl-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Employee Salary</h5>
                            </div>
                            <div className="col-1 text-end">
                                <a
                                    data-url="https://demo.workdo.io/hrmgo/employee/salary/1"
                                    data-ajax-popup="true"
                                    data-title="Set Basic Salary"
                                    data-bs-toggle="tooltip"
                                    className="btn btn-sm btn-primary"
                                    data-bs-original-title="Set Salary"
                                >
                                    <i className="ti ti-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="project-info d-flex text-sm">
                            <div className="project-info-inner mr-3 col-11">
                                <b className="m-0">Payslip Type</b>
                                <div className="project-amnt pt-1">Monthly Payslip</div>
                            </div>
                            <div className="project-info-inner mr-3 col-1">
                                <b className="m-0">Salary</b>
                                <div className="project-amnt pt-1">50</div>
                            </div>
                        </div>
                        <div className="project-info d-flex text-sm">
                            <div className="project-info-inner mt-3 col-11">
                                <b className="m-0">Account Type</b>
                                <div className="project-amnt pt-1">Benjamin Adams</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Allowance Section */}
            <div className="col-xl-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Allowance</h5>
                            </div>
                            <div className="col-1 text-end">
                                <a
                                    data-url="https://demo.workdo.io/hrmgo/allowances/create/1"
                                    data-ajax-popup="true"
                                    data-title="Create Allowance"
                                    data-bs-toggle="tooltip"
                                    className="btn btn-sm btn-primary"
                                    data-bs-original-title="Create"
                                >
                                    <i className="ti ti-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Allowance Option</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Julie Lynn</td>
                                        <td>Taxables</td>
                                        <td>Quis aliqua Molesti</td>
                                        <td>Fixed</td>
                                        <td>$1,000.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/allowance/1/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit Allowance"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white"><i className="ti ti-pencil"></i></span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/allowance/1"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-1"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white"><i className="ti ti-trash"></i></span>
                                                            </a>
                                                        </form>
                                                    </div>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Julie Lynn</td>
                                        <td>Non Taxable</td>
                                        <td>Quis aliqua Molesti</td>
                                        <td>Fixed</td>
                                        <td>$500.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/allowance/10/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit Allowance"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white"><i className="ti ti-pencil"></i></span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/allowance/10"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-10"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white"><i className="ti ti-trash"></i></span>
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
            <div className="col-md-6">
      <div className="card set-card">
        <div className="card-header">
          <div className="row">
            <div className="col-11">
              <h5>Commission</h5>
            </div>
            <div className="col-1 text-end">
              <a
                data-url="https://demo.workdo.io/hrmgo/commissions/create/1"
                data-ajax-popup="true"
                data-title="Create Commission"
                data-bs-toggle="tooltip"
                title=""
                className="btn btn-sm btn-primary"
                data-bs-original-title="Create"
              >
                <i className="ti ti-plus"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Julie Lynn</td>
                  <td>Beatae voluptatibus</td>
                  <td>Percentage</td>
                  <td>10% ($5.00)</td>
                  <td className="Action">
                    <div className="dt-buttons">
                      <span>
                        <div className="action-btn bg-info me-2">
                          <a
                            className="mx-3 btn btn-sm align-items-center"
                            data-url="https://demo.workdo.io/hrmgo/commission/1/edit"
                            data-ajax-popup="true"
                            data-size="md"
                            data-bs-toggle="tooltip"
                            title=""
                            data-title="Edit Commission"
                            data-bs-original-title="Edit"
                          >
                            <span className="text-white">
                              <i className="ti ti-pencil"></i>
                            </span>
                          </a>
                        </div>
                        <div className="action-btn bg-danger">
                          <form
                            method="POST"
                            action="https://demo.workdo.io/hrmgo/commission/1"
                            acceptCharset="UTF-8"
                            id="delete-form-1"
                          >
                            <input name="_method" type="hidden" value="DELETE" />
                            <input
                              name="_token"
                              type="hidden"
                              value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                            />
                            <a
                              className="mx-3 btn btn-sm align-items-center bs-pass-para"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Delete"
                              aria-label="Delete"
                            >
                              <span className="text-white">
                                <i className="ti ti-trash"></i>
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
                  <td>Excepteur consectetu</td>
                  <td>Fixed</td>
                  <td>$7.00</td>
                  <td className="Action">
                    <div className="dt-buttons">
                      <span>
                        <div className="action-btn bg-info me-2">
                          <a
                            className="mx-3 btn btn-sm align-items-center"
                            data-url="https://demo.workdo.io/hrmgo/commission/9/edit"
                            data-ajax-popup="true"
                            data-size="md"
                            data-bs-toggle="tooltip"
                            title=""
                            data-title="Edit Commission"
                            data-bs-original-title="Edit"
                          >
                            <span className="text-white">
                              <i className="ti ti-pencil"></i>
                            </span>
                          </a>
                        </div>
                        <div className="action-btn bg-danger">
                          <form
                            method="POST"
                            action="https://demo.workdo.io/hrmgo/commission/9"
                            acceptCharset="UTF-8"
                            id="delete-form-9"
                          >
                            <input name="_method" type="hidden" value="DELETE" />
                            <input
                              name="_token"
                              type="hidden"
                              value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                            />
                            <a
                              className="mx-3 btn btn-sm align-items-center bs-pass-para"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Delete"
                              aria-label="Delete"
                            >
                              <span className="text-white">
                                <i className="ti ti-trash"></i>
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
    <div className="col-md-6">
      <div className="card set-card">
        <div className="card-header">
          <div className="row">
            <div className="col-11">
              <h5>Loan</h5>
            </div>
            <div className="col-1 text-end">
              <a
                data-url="https://demo.workdo.io/hrmgo/loans/create/1"
                data-ajax-popup="true"
                data-title="Create Loan"
                data-bs-toggle="tooltip"
                title=""
                data-size="lg"
                className="btn btn-sm btn-primary"
                data-bs-original-title="Create"
              >
                <i className="ti ti-plus"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Loan Options</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Loan Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Julie Lynn</td>
                  <td>Helth Insurance</td>
                  <td>Natus placeat qui e</td>
                  <td>Fixed</td>
                  <td>$1,000.00</td>
                  <td className="Action">
                    <div className="dt-buttons">
                      <span>
                        <div className="action-btn bg-info me-2">
                          <a
                            className="mx-3 btn btn-sm align-items-center"
                            data-url="https://demo.workdo.io/hrmgo/loan/1/edit"
                            data-ajax-popup="true"
                            data-size="lg"
                            data-bs-toggle="tooltip"
                            title=""
                            data-title="Edit Loan"
                            data-bs-original-title="Edit"
                          >
                            <span className="text-white">
                              <i className="ti ti-pencil"></i>
                            </span>
                          </a>
                        </div>
                        <div className="action-btn bg-danger">
                          <form
                            method="POST"
                            action="https://demo.workdo.io/hrmgo/loan/1"
                            acceptCharset="UTF-8"
                            id="delete-form-1"
                          >
                            <input name="_method" type="hidden" value="DELETE" />
                            <input
                              name="_token"
                              type="hidden"
                              value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                            />
                            <a
                              className="mx-3 btn btn-sm align-items-center bs-pass-para"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Delete"
                              aria-label="Delete"
                            >
                              <span className="text-white">
                                <i className="ti ti-trash"></i>
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
                  <td>Helth Insurance</td>
                  <td>Iste pariatur At do</td>
                  <td>Fixed</td>
                  <td>$75.00</td>
                  <td className="Action">
                    <div className="dt-buttons">
                      <span>
                        <div className="action-btn bg-info me-2">
                          <a
                            className="mx-3 btn btn-sm align-items-center"
                            data-url="https://demo.workdo.io/hrmgo/loan/8/edit"
                            data-ajax-popup="true"
                            data-size="lg"
                            data-bs-toggle="tooltip"
                            title=""
                            data-title="Edit Loan"
                            data-bs-original-title="Edit"
                          >
                            <span className="text-white">
                              <i className="ti ti-pencil"></i>
                            </span>
                          </a>
                        </div>
                        <div className="action-btn bg-danger">
                          <form
                            method="POST"
                            action="https://demo.workdo.io/hrmgo/loan/8"
                            acceptCharset="UTF-8"
                            id="delete-form-8"
                          >
                            <input name="_method" type="hidden" value="DELETE" />
                            <input
                              name="_token"
                              type="hidden"
                              value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                            />
                            <a
                              className="mx-3 btn btn-sm align-items-center bs-pass-para"
                              data-bs-toggle="tooltip"
                              title=""
                              data-bs-original-title="Delete"
                              aria-label="Delete"
                            >
                              <span className="text-white">
                                <i className="ti ti-trash"></i>
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
    <div className="col-md-6">
            <div className="card set-card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-11">
                            <h5>Saturation Deduction</h5>
                        </div>
                        <div className="col-1 text-end">
                            <a
                                data-url="https://demo.workdo.io/hrmgo/saturationdeductions/create/1"
                                data-ajax-popup="true"
                                data-size="lg"
                                data-title="Create Saturation Deduction"
                                data-bs-toggle="tooltip"
                                title=""
                                className="btn btn-sm btn-primary"
                                data-bs-original-title="Create"
                            >
                                <i className="ti ti-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="card-body table-border-style" style={{ overflow: "auto" }}>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>Deduction Option</th>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Julie Lynn</td>
                                    <td>Social Security System</td>
                                    <td>Nulla reprehenderit</td>
                                    <td>Fixed</td>
                                    <td>$1,000.00</td>
                                    <td className="Action">
                                        <div className="dt-buttons">
                                            <span>
                                                <div className="action-btn bg-info me-2">
                                                    <a
                                                        className="mx-3 btn btn-sm align-items-center"
                                                        data-url="https://demo.workdo.io/hrmgo/saturationdeduction/1/edit"
                                                        data-ajax-popup="true"
                                                        data-size="lg"
                                                        data-bs-toggle="tooltip"
                                                        title=""
                                                        data-title="Edit Saturation Deduction"
                                                        data-bs-original-title="Edit"
                                                    >
                                                        <span className="text-white">
                                                            <i className="ti ti-pencil"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="action-btn bg-danger">
                                                    <form
                                                        method="POST"
                                                        action="https://demo.workdo.io/hrmgo/saturationdeduction/1"
                                                        acceptCharset="UTF-8"
                                                        id="delete-form-1"
                                                    >
                                                        <input name="_method" type="hidden" value="DELETE" />
                                                        <input
                                                            name="_token"
                                                            type="hidden"
                                                            value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                                                        />
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                            data-bs-toggle="tooltip"
                                                            title=""
                                                            data-bs-original-title="Delete"
                                                            aria-label="Delete"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-trash"></i>
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
                                    <td>Social Security System</td>
                                    <td>Libero dignissimos f</td>
                                    <td>Fixed</td>
                                    <td>$44.00</td>
                                    <td className="Action">
                                        <div className="dt-buttons">
                                            <span>
                                                <div className="action-btn bg-info me-2">
                                                    <a
                                                        className="mx-3 btn btn-sm align-items-center"
                                                        data-url="https://demo.workdo.io/hrmgo/saturationdeduction/7/edit"
                                                        data-ajax-popup="true"
                                                        data-size="lg"
                                                        data-bs-toggle="tooltip"
                                                        title=""
                                                        data-title="Edit Saturation Deduction"
                                                        data-bs-original-title="Edit"
                                                    >
                                                        <span className="text-white">
                                                            <i className="ti ti-pencil"></i>
                                                        </span>
                                                    </a>
                                                </div>
                                                <div className="action-btn bg-danger">
                                                    <form
                                                        method="POST"
                                                        action="https://demo.workdo.io/hrmgo/saturationdeduction/7"
                                                        acceptCharset="UTF-8"
                                                        id="delete-form-7"
                                                    >
                                                        <input name="_method" type="hidden" value="DELETE" />
                                                        <input
                                                            name="_token"
                                                            type="hidden"
                                                            value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                                                        />
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                            data-bs-toggle="tooltip"
                                                            title=""
                                                            data-bs-original-title="Delete"
                                                            aria-label="Delete"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-trash"></i>
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
            <div className="col-md-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Other Payment</h5>
                            </div>
                            <div className="col-1 text-end">
                                <a
                                    data-url="https://demo.workdo.io/hrmgo/otherpayments/create/1"
                                    data-ajax-popup="true"
                                    data-title="Create Other Payment"
                                    data-bs-toggle="tooltip"
                                    className="btn btn-sm btn-primary"
                                    data-bs-original-title="Create"
                                >
                                    <i className="ti ti-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Title</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Julie Lynn</td>
                                        <td>Quia occaecat laboru</td>
                                        <td>Fixed</td>
                                        <td>$1,000.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/otherpayment/1/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit Other Payment"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-pencil"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/otherpayment/1"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-1"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white">
                                                                    <i className="ti ti-trash"></i>
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
                                        <td>Deleniti exercitatio</td>
                                        <td>Fixed</td>
                                        <td>$46.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/otherpayment/9/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit Other Payment"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-pencil"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/otherpayment/9"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-9"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white">
                                                                    <i className="ti ti-trash"></i>
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

            {/* Overtime */}
            <div className="col-md-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Overtime</h5>
                            </div>
                            <div className="col-1 text-end">
                                <a
                                    data-url="https://demo.workdo.io/hrmgo/overtimes/create/1"
                                    data-ajax-popup="true"
                                    data-title="Create Overtime"
                                    data-bs-toggle="tooltip"
                                    className="btn btn-sm btn-primary"
                                    data-bs-original-title="Create"
                                >
                                    <i className="ti ti-plus"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Employee Name</th>
                                        <th>Overtime Title</th>
                                        <th>Number of days</th>
                                        <th>Hours</th>
                                        <th>Rate</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Julie Lynn</td>
                                        <td>test</td>
                                        <td>10</td>
                                        <td>10</td>
                                        <td>$6.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/overtime/1/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit OverTime"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-pencil"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/overtime/1"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-1"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white">
                                                                    <i className="ti ti-trash"></i>
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
                                        <td>Dolorem dolor rem no</td>
                                        <td>70</td>
                                        <td>78</td>
                                        <td>$11.00</td>
                                        <td className="Action">
                                            <div className="dt-buttons">
                                                <span>
                                                    <div className="action-btn bg-info me-2">
                                                        <a
                                                            className="mx-3 btn btn-sm align-items-center"
                                                            data-url="https://demo.workdo.io/hrmgo/overtime/3/edit"
                                                            data-ajax-popup="true"
                                                            data-size="md"
                                                            data-bs-toggle="tooltip"
                                                            data-title="Edit OverTime"
                                                            data-bs-original-title="Edit"
                                                        >
                                                            <span className="text-white">
                                                                <i className="ti ti-pencil"></i>
                                                            </span>
                                                        </a>
                                                    </div>
                                                    <div className="action-btn bg-danger">
                                                        <form
                                                            method="POST"
                                                            action="https://demo.workdo.io/hrmgo/overtime/3"
                                                            acceptCharset="UTF-8"
                                                            id="delete-form-3"
                                                        >
                                                            <input name="_method" type="hidden" value="DELETE" />
                                                            <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                            <a
                                                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-original-title="Delete"
                                                                aria-label="Delete"
                                                            >
                                                                <span className="text-white">
                                                                    <i className="ti ti-trash"></i>
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
    );
};

export default FirstPart;

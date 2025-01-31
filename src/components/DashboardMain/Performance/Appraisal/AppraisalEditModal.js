import React from "react";

const AppraisalEditModal = ({ closeModal }) => {
  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: "block", paddingLeft: 0 }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Appraisal
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="body ">
              <form
                method="POST"
                action="https://demo.workdo.io/hrmgo/appraisal/1"
                acceptCharset="UTF-8"
                className="needs-validation"
                noValidate=""
              >
                <input name="_method" type="hidden" defaultValue="PUT" />
                <input
                  name="_token"
                  type="hidden"
                  defaultValue="6UKVgE1qhgHZpwAquwk1UVChUWNPCu8VCArBq50n"
                />
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="branch" className="col-form-label">
                          Select Branch
                        </label>
                        <span className="text-danger">*</span>
                        <select
                          name="brances"
                          id="brances"
                          required=""
                          className="form-control  "
                        >
                          <option value={1} selected="">
                            China
                          </option>
                          <option value={2}>India</option>
                          <option value={3}>Canada</option>
                          <option value={4}>Greece</option>
                          <option value={5}>Italy</option>
                          <option value={6}>Japan</option>
                          <option value={7}>Malaysia</option>
                          <option value={8}>France</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="employees" className="col-form-label">
                          Employee
                        </label>
                        <span className="text-danger">*</span>
                        <div className="employee_div">
                          <select
                            name="employees"
                            id="employee"
                            className="form-control "
                            required=""
                          >
                            <option value="">Select Employee</option>
                            <option selected="" value={1}>
                              Julie Lynn
                            </option>
                            <option value={2}>Lunea Todd</option>
                            <option value={7}>Jeremy Holmes</option>
                            <option value={8}>Anjolie Mayer</option>
                            <option value={12}>Mona Hendricks</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label
                          htmlFor="appraisal_date"
                          className="col-form-label"
                        >
                          Select Month
                        </label>
                        <span className="text-danger">*</span>
                        <input
                          className="form-control d_filter datepicker-input"
                          required="required"
                          name="appraisal_date"
                          type="text"
                          defaultValue="2024-11"
                          id="appraisal_date"
                        />
                        <div
                          className="datepicker datepicker-dropdown datepicker-orient-left datepicker-orient-bottom"
                          style={{ left: "64.4px", top: 433 }}
                        >
                          <div className="datepicker-picker">
                            <div className="datepicker-header">
                              <div
                                className="datepicker-title"
                                style={{ display: "none" }}
                              />
                              <div className="datepicker-controls">
                                <button type="button" className="btn prev-btn">
                                  «
                                </button>
                                <button
                                  type="button"
                                  className="btn view-switch"
                                >
                                  November 2024
                                </button>
                                <button type="button" className="btn next-btn">
                                  »
                                </button>
                              </div>
                            </div>
                            <div className="datepicker-main">
                              <div className="datepicker-view">
                                <div className="days">
                                  <div className="days-of-week">
                                    <span className="dow">Su</span>
                                    <span className="dow">Mo</span>
                                    <span className="dow">Tu</span>
                                    <span className="dow">We</span>
                                    <span className="dow">Th</span>
                                    <span className="dow">Fr</span>
                                    <span className="dow">Sa</span>
                                  </div>
                                  <div className="datepicker-grid">
                                    <span
                                      className="datepicker-cell day prev"
                                      data-date={1729967400000}
                                    >
                                      27
                                    </span>
                                    <span
                                      className="datepicker-cell day prev"
                                      data-date={1730053800000}
                                    >
                                      28
                                    </span>
                                    <span
                                      className="datepicker-cell day prev"
                                      data-date={1730140200000}
                                    >
                                      29
                                    </span>
                                    <span
                                      className="datepicker-cell day prev"
                                      data-date={1730226600000}
                                    >
                                      30
                                    </span>
                                    <span
                                      className="datepicker-cell day prev"
                                      data-date={1730313000000}
                                    >
                                      31
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730399400000}
                                    >
                                      1
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730485800000}
                                    >
                                      2
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730572200000}
                                    >
                                      3
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730658600000}
                                    >
                                      4
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730745000000}
                                    >
                                      5
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730831400000}
                                    >
                                      6
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1730917800000}
                                    >
                                      7
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731004200000}
                                    >
                                      8
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731090600000}
                                    >
                                      9
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731177000000}
                                    >
                                      10
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731263400000}
                                    >
                                      11
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731349800000}
                                    >
                                      12
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731436200000}
                                    >
                                      13
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731522600000}
                                    >
                                      14
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731609000000}
                                    >
                                      15
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731695400000}
                                    >
                                      16
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731781800000}
                                    >
                                      17
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731868200000}
                                    >
                                      18
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1731954600000}
                                    >
                                      19
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732041000000}
                                    >
                                      20
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732127400000}
                                    >
                                      21
                                    </span>
                                    <span
                                      className="datepicker-cell day selected focused"
                                      data-date={1732213800000}
                                    >
                                      22
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732300200000}
                                    >
                                      23
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732386600000}
                                    >
                                      24
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732473000000}
                                    >
                                      25
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732559400000}
                                    >
                                      26
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732645800000}
                                    >
                                      27
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732732200000}
                                    >
                                      28
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732818600000}
                                    >
                                      29
                                    </span>
                                    <span
                                      className="datepicker-cell day"
                                      data-date={1732905000000}
                                    >
                                      30
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1732991400000}
                                    >
                                      1
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733077800000}
                                    >
                                      2
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733164200000}
                                    >
                                      3
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733250600000}
                                    >
                                      4
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733337000000}
                                    >
                                      5
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733423400000}
                                    >
                                      6
                                    </span>
                                    <span
                                      className="datepicker-cell day next"
                                      data-date={1733509800000}
                                    >
                                      7
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="datepicker-footer">
                              <div className="datepicker-controls">
                                <button
                                  type="button"
                                  className="btn today-btn"
                                  style={{ display: "none" }}
                                >
                                  Today
                                </button>
                                <button
                                  type="button"
                                  className="btn clear-btn"
                                  style={{ display: "none" }}
                                >
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="remark" className="col-form-label">
                          Remarks
                        </label>
                        <textarea
                          className="form-control"
                          rows={3}
                          name="remark"
                          cols={50}
                          id="remark"
                          defaultValue={"Soluta amet pariatu"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row" id="stares">
                    <div className="col-5  text-end" style={{ marginLeft: 51 }}>
                      <h5>Indicator</h5>
                    </div>
                    <div className="col-4  text-end">
                      <h5>Appraisal</h5>
                    </div>
                    <div className="col-md-12 mt-3">
                      <h6>Organizational Competencies</h6>
                      <hr className="mt-0" />
                    </div>
                    <div className="col-4">Leadership</div>
                    <div className="col-4">
                      <fieldset id="demo" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5*-3"
                          name="ratings[3]"
                          defaultValue={5}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-3"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-3"
                          name="ratings[3]"
                          defaultValue={4}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-3"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-3"
                          name="ratings[3]"
                          defaultValue={3}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-3"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-3"
                          name="ratings[3]"
                          defaultValue={2}
                          defaultChecked=""
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-3"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-3"
                          name="ratings[3]"
                          defaultValue={1}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-3"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-3"
                          name="rating[3]"
                          defaultValue={5}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-3"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-3"
                          name="rating[3]"
                          defaultValue={4}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-3"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-3"
                          name="rating[3]"
                          defaultValue={3}
                          defaultChecked=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-3"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-3"
                          name="rating[3]"
                          defaultValue={2}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-3"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-3"
                          name="rating[3]"
                          defaultValue={1}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-3"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">Project Management</div>
                    <div className="col-4">
                      <fieldset id="demo" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5*-5"
                          name="ratings[5]"
                          defaultValue={5}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-5"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-5"
                          name="ratings[5]"
                          defaultValue={4}
                          defaultChecked=""
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-5"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-5"
                          name="ratings[5]"
                          defaultValue={3}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-5"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-5"
                          name="ratings[5]"
                          defaultValue={2}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-5"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-5"
                          name="ratings[5]"
                          defaultValue={1}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-5"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-5"
                          name="rating[5]"
                          defaultValue={5}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-5"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-5"
                          name="rating[5]"
                          defaultValue={4}
                          defaultChecked=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-5"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-5"
                          name="rating[5]"
                          defaultValue={3}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-5"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-5"
                          name="rating[5]"
                          defaultValue={2}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-5"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-5"
                          name="rating[5]"
                          defaultValue={1}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-5"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12 mt-3">
                      <h6>Technical Competencies</h6>
                      <hr className="mt-0" />
                    </div>
                    <div className="col-4">Allocating Resources</div>
                    <div className="col-4">
                      <fieldset id="demo" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5*-1"
                          name="ratings[1]"
                          defaultValue={5}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-1"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-1"
                          name="ratings[1]"
                          defaultValue={4}
                          defaultChecked=""
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-1"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-1"
                          name="ratings[1]"
                          defaultValue={3}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-1"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-1"
                          name="ratings[1]"
                          defaultValue={2}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-1"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-1"
                          name="ratings[1]"
                          defaultValue={1}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-1"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-1"
                          name="rating[1]"
                          defaultValue={5}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-1"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-1"
                          name="rating[1]"
                          defaultValue={4}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-1"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-1"
                          name="rating[1]"
                          defaultValue={3}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-1"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-1"
                          name="rating[1]"
                          defaultValue={2}
                          defaultChecked=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-1"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-1"
                          name="rating[1]"
                          defaultValue={1}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-1"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-md-12 mt-3">
                      <h6>Behavioural Competencies</h6>
                      <hr className="mt-0" />
                    </div>
                    <div className="col-4">Business Process</div>
                    <div className="col-4">
                      <fieldset id="demo" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5*-2"
                          name="ratings[2]"
                          defaultValue={5}
                          defaultChecked=""
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-2"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-2"
                          name="ratings[2]"
                          defaultValue={4}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-2"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-2"
                          name="ratings[2]"
                          defaultValue={3}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-2"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-2"
                          name="ratings[2]"
                          defaultValue={2}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-2"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-2"
                          name="ratings[2]"
                          defaultValue={1}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-2"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-2"
                          name="rating[2]"
                          defaultValue={5}
                          defaultChecked=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-2"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-2"
                          name="rating[2]"
                          defaultValue={4}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-2"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-2"
                          name="rating[2]"
                          defaultValue={3}
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-2"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-2"
                          name="rating[2]"
                          defaultValue={2}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-2"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-2"
                          name="rating[2]"
                          defaultValue={1}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-2"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">Oral Communication</div>
                    <div className="col-4">
                      <fieldset id="demo" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5*-4"
                          name="ratings[4]"
                          defaultValue={5}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-5*-4"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4*-4"
                          name="ratings[4]"
                          defaultValue={4}
                          defaultChecked=""
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-4*-4"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3*-4"
                          name="ratings[4]"
                          defaultValue={3}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3*-4"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2*-4"
                          name="ratings[4]"
                          defaultValue={2}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-2*-4"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1*-4"
                          name="ratings[4]"
                          defaultValue={1}
                          disabled=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-1*-4"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                    <div className="col-4">
                      <fieldset id="demo1" className="rate">
                        <input
                          className="stars"
                          type="radio"
                          id="technical-5-4"
                          name="rating[4]"
                          defaultValue={5}
                        />
                        <label
                          className="full"
                          htmlFor="technical-5-4"
                          title="Awesome - 5 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-4-4"
                          name="rating[4]"
                          defaultValue={4}
                        />
                        <label
                          className="full"
                          htmlFor="technical-4-4"
                          title="Pretty good - 4 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-3-4"
                          name="rating[4]"
                          defaultValue={3}
                          defaultChecked=""
                        />
                        <label
                          className="full"
                          htmlFor="technical-3-4"
                          title="Meh - 3 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-2-4"
                          name="rating[4]"
                          defaultValue={2}
                        />
                        <label
                          className="full"
                          htmlFor="technical-2-4"
                          title="Kinda bad - 2 stars"
                        />
                        <input
                          className="stars"
                          type="radio"
                          id="technical-1-4"
                          name="rating[4]"
                          defaultValue={1}
                        />
                        <label
                          className="full"
                          htmlFor="technical-1-4"
                          title="Sucks big time - 1 star"
                        />
                      </fieldset>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <input
                      type="button"
                      defaultValue="Cancel"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    />
                    <input
                      type="submit"
                      defaultValue="Update"
                      className="btn btn-primary"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppraisalEditModal;

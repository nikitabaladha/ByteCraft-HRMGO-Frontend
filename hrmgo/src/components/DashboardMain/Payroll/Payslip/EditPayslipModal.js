
import React, { useState } from "react";
const EditPayslipModal = ({ isOpen, onClose, payslip }) => {
  if (!isOpen) return null;
  const formatPayDate = (paydate) => {
    const date = new Date(paydate);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "block" }} aria-modal="true" role="dialog">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Edit Employee salary</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"   onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <div className="col-form-label">
            <div className="row px-3">
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Employee</h5>
                <h5 className="emp-title black-text"> #{payslip?.employeeId || "N/A"}</h5>
              </div>
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Basic Salary</h5>
                <h5 className="emp-title black-text">${payslip?.salary || "N/A"}</h5>
              </div>
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Payroll Month</h5>
               <h5 className="emp-title black-text">{payslip?.paydate ? formatPayDate(payslip.paydate) : "N/A"}</h5>
              </div>
            </div>
  
            <div className="col-lg-12 our-system">
              <form method="POST" action="https://demo.workdo.io/hrmgo/payslip/editemployee/5" acceptCharset="UTF-8">
                <input name="_token" type="hidden" value="gVnOtcl9FuCWFrmeJQvojz8Enx1xQKmOvJtYRXXa" />
                <input className="form-control" name="payslip_id" type="hidden" value="254" />
                <div className="row">
                  <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link" id="pills-allowance-tab" data-bs-toggle="pill" href="#allowance" role="tab" aria-controls="pills-allowance" aria-selected="false">Allowance</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" id="pills-commission-tab" data-bs-toggle="pill" href="#commission" role="tab" aria-controls="pills-commission" aria-selected="true">Commission</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-loan-tab" data-bs-toggle="pill" href="#loan" role="tab" aria-controls="pills-loan" aria-selected="false">Loan</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-deduction-tab" data-bs-toggle="pill" href="#deduction" role="tab" aria-controls="pills-deduction" aria-selected="false">Saturation Deduction</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-payment-tab" data-bs-toggle="pill" href="#payment" role="tab" aria-controls="pills-payment" aria-selected="false">Other Payment</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" id="pills-overtime-tab" data-bs-toggle="pill" href="#overtime" role="tab" aria-controls="pills-overtime" aria-selected="false">Overtime</a>
                    </li>
                  </ul>
                  <div className="tab-content pt-4">
                    <div id="allowance" className="tab-pane fade" role="tabpanel" aria-labelledby="pills-allowance-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Maiores perferendis</label>
                                <input className="form-control" name="allowance[]" type="text" value="660" />
                                <input className="form-control" name="allowance_id[]" type="hidden" value="8" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Dolor voluptatem As</label>
                                <input className="form-control" name="allowance[]" type="text" value="81" />
                                <input className="form-control" name="allowance_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="commission" className="tab-pane fade show active" role="tabpanel" aria-labelledby="pills-commission-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Laborum Earum ratio</label>
                                <input className="form-control" name="commission[]" type="text" value="60" />
                                <input className="form-control" name="commission_id[]" type="hidden" value="7" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Excepturi cillum des</label>
                                <input className="form-control" name="commission[]" type="text" value="84" />
                                <input className="form-control" name="commission_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="loan" className="tab-pane fade" role="tabpanel" aria-labelledby="pills-loan-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Ut neque consequatur</label>
                                <input className="form-control" name="loan[]" type="text" value="39" />
                                <input className="form-control" name="loan_id[]" type="hidden" value="23" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Culpa architecto hic</label>
                                <input className="form-control" name="loan[]" type="text" value="75" />
                                <input className="form-control" name="loan_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="deduction" className="tab-pane fade" role="tabpanel" aria-labelledby="pills-deduction-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Exercitation labore</label>
                                <input className="form-control" name="saturation_deductions[]" type="text" value="32" />
                                <input className="form-control" name="saturation_deductions_id[]" type="hidden" value="23" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Quas tenetur esse co</label>
                                <input className="form-control" name="saturation_deductions[]" type="text" value="37" />
                                <input className="form-control" name="saturation_deductions_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="payment" className="tab-pane fade" role="tabpanel" aria-labelledby="pills-payment-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Magni velit laborum</label>
                                <input className="form-control" name="other_payment[]" type="text" value="45" />
                                <input className="form-control" name="other_payment_id[]" type="hidden" value="23" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Nulla excepturi iure</label>
                                <input className="form-control" name="other_payment[]" type="text" value="81" />
                                <input className="form-control" name="other_payment_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="overtime" className="tab-pane fade" role="tabpanel" aria-labelledby="pills-overtime-tab">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card bg-none mb-0">
                            <div className="row px-3">
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Laborum omnis quasi</label>
                                <input className="form-control" name="overtime[]" type="text" value="23" />
                                <input className="form-control" name="overtime_id[]" type="hidden" value="22" />
                              </div>
                              <div className="col-md-12 form-group">
                                <label className="col-form-label">Labore totam minus</label>
                                <input className="form-control" name="overtime[]" type="text" value="77" />
                                <input className="form-control" name="overtime_id[]" type="hidden" value="24" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                  <div className="col-12 mt-4 text-right">
                    
                    <input type="button" value="Cancel" className="btn btn-secondary" data-bs-dismiss="modal"/>
                    
                    <input type="submit" value="Update" className="btn btn-primary" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};
export default EditPayslipModal;





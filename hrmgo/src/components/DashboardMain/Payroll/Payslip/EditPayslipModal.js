import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";

const EditPayslipModal = ({ isOpen, onClose, payslip }) => {
  const [allowances, setAllowances] = useState([]);

  useEffect(() => {
    const fetchAllowanceData = async () => {
      try {
        if (!payslip || !payslip._id) return; // Ensure payslip and _id are available
        const allowanceResponse = await getAPI(`/getallowancebyid/${payslip._id}`, {}, true);
        const allowanceData = allowanceResponse.data.data || [];

        // Remove duplicate allowances based on unique option values
        const uniqueAllowances = Array.from(new Set(allowanceData.map((a) => a.option))).map(
          (option) => allowanceData.find((a) => a.option === option)
        );
        setAllowances(uniqueAllowances);
      } catch (err) {
        console.error("Failed to fetch allowance data", err);
      }
    };

    if (isOpen) {
      fetchAllowanceData();
    }
  }, [isOpen, payslip]);

  if (!isOpen) return null;

  const formatPayDate = (paydate) => {
    const date = new Date(paydate);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div
      className="modal fade show modal-overlay"
      style={{ display: "block" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Employee Salary</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row px-3">
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Employee</h5>
                <h5 className="emp-title black-text">#{payslip?.id || "N/A"}</h5>
              </div>
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Basic Salary</h5>
                <h5 className="emp-title black-text">${payslip?.salary || "N/A"}</h5>
              </div>
              <div className="col-md-4 mb-3">
                <h5 className="emp-title mb-0">Payroll Month</h5>
                <h5 className="emp-title black-text">
                  {payslip?.payDate ? formatPayDate(payslip.payDate) : "N/A"}
                </h5>
              </div>
            </div>
            <div className="col-lg-12 our-system">
              <form method="POST" action="/payslip/editemployee" acceptCharset="UTF-8">
                <input name="_token" type="hidden" value="your_csrf_token_here" />
                <input className="form-control" name="payslip_id" type="hidden" value={payslip?.id || ""} />
                <div className="row">
                  <ul className="nav nav-pills mb-3" role="tablist">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="pill"
                        data-bs-target="#allowance"
                        type="button"
                        role="tab"
                      >
                        Allowance
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="pill"
                        data-bs-target="#commission"
                        type="button"
                        role="tab"
                      >
                        Commission
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-4">
                    <div id="allowance" className="tab-pane fade show active" role="tabpanel">
                      <div className="row">
                        {allowances.map((allowance, index) => (
                          <div className="col-lg-12" key={index}>
                            <div className="card bg-none mb-0">
                              <div className="row px-3">
                                <div className="col-md-12 form-group">
                                  <label className="col-form-label">Allowance Options</label>
                                  <select
                                    className="form-control"
                                    required
                                    id={`allowance_option_${index}`}
                                    name={`allowance_option[${index}]`}
                                    defaultValue={allowance.option || ""}
                                  >
                                    <option value="">Select Allowance Option</option>
                                    <option value="Taxable">Taxable</option>
                                    <option value="Non Taxable">Non Taxable</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div id="commission" className="tab-pane fade" role="tabpanel">
                      {/* Commission fields */}
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-4 text-right">
                  <button type="button" className="btn btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPayslipModal;

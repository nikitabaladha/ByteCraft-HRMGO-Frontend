import React from "react";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";


const Payslipreceipt = ({ isOpen, onClose, payslip }) => {
  if (!isOpen) return null;
  const formatPayDate = (paydate) => {
    const date = new Date(paydate);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  const saveAsPDF = () => {
    const element = document.getElementById('printableArea');
    const opt = {
      margin: 0.3,
      filename: 'Joel O Dolan',
      image: {
        type: 'jpeg',
        quality: 1
      },
      html2canvas: {
        scale: 4,
        dpi: 72,
        letterRendering: true
      },
      jsPDF: {
        unit: 'in',
        format: 'A4'
      }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: "block", paddingLeft: "0px" }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Employee Payslip</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <div className="modal-body">
              <div className="text-md-end mb-2">
                <Link className="btn btn-sm btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Download" onClick={saveAsPDF}><span className="fa fa-download"></span></Link>
                <Link title="Mail Send" href="https://demo.workdo.io/hrmgo/payslip/send/5/2024-10" className="btn btn-sm btn-warning"><span className="fa fa-paper-plane"></span></Link>
              </div>
              <div className="invoice" id="printableArea">
                <div className="row">
                  <div className="col-form-label">
                    <div className="invoice-number">
                      <img src="https://demo.workdo.io/hrmgo/storage/uploads/logo//logo-dark.png" width="170px" />
                    </div>
                    <div className="invoice-print">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="invoice-title"></div>
                          <hr />
                          <div className="row text-sm">
                            <div className="col-md-6">
                              <address>
                                <strong>Name :</strong>  {payslip?.name}<br />
                                <strong>Position :</strong> Chartered<br />
                                <strong>Salary Date :</strong>{payslip?.paydate ? formatPayDate(payslip.paydate) : "N/A"}<br />
                              </address>
                            </div>
                            <div className="col-md-6 text-end">
                              <address>
                                <strong>HRMGo </strong><br />
                                Roshita Apartment , Borivali,<br />
                                GUJARAT-395006<br />
                                <strong>Salary Slip :</strong> {payslip?.paydate ? new Date(payslip.paydate).getFullYear() + '-' + (new Date(payslip.paydate).getMonth() + 1).toString().padStart(2, '0') : "N/A"}
                                <br />
                              </address>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <table className="table table-md">
                              <tbody>
                                <tr className="font-weight-bold">
                                  <th>Earning</th>
                                  <th>Title</th>
                                  <th>Type</th>
                                  <th className="text-right">Amount</th>
                                </tr>
                                <tr>
                                  <td>Basic Salary</td>
                                  <td>-</td>
                                  <td>-</td>
                                  <td className="text-right">$50,000.00</td>
                                </tr>
                                <tr>
                                  <td>Allowance</td>
                                  <td>Maiores perferendis</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$660.00</td>
                                </tr>
                                <tr>
                                  <td>Allowance</td>
                                  <td>Dolor voluptatem As</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$81.00</td>
                                </tr>
                                <tr>
                                  <td>Commission</td>
                                  <td>Laborum Earum ratio</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$60.00</td>
                                </tr>
                                <tr>
                                  <td>Commission</td>
                                  <td>Excepturi cillum des</td>
                                  <td>Percentage</td>
                                  <td className="text-right">84% ($42,000.00)</td>
                                </tr>
                                <tr>
                                  <td>Other Payment</td>
                                  <td>Esse eos rerum dolo</td>
                                  <td>Percentage</td>
                                  <td className="text-right">25% ($12,500.00)</td>
                                </tr>
                                <tr>
                                  <td>Other Payment</td>
                                  <td>Voluptatem Ea aliqu</td>
                                  <td>Percentage</td>
                                  <td className="text-right">92% ($46,000.00)</td>
                                </tr>
                                <tr>
                                  <td>OverTime</td>
                                  <td>Earum eligendi eu mo</td>
                                  <td>-</td>
                                  <td className="text-right">$801,255.00</td>
                                </tr>
                                <tr>
                                  <td>OverTime</td>
                                  <td>Dolor quia enim mole</td>
                                  <td>-</td>
                                  <td className="text-right">$21,411.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-striped table-hover table-md">
                              <tbody>
                                <tr className="font-weight-bold">
                                  <th>Deduction</th>
                                  <th>Title</th>
                                  <th>Type</th>
                                  <th className="text-right">Amount</th>
                                </tr>
                                <tr>
                                  <td>Loan</td>
                                  <td>Ut neque consequatur</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$39.00</td>
                                </tr>
                                <tr>
                                  <td>Loan</td>
                                  <td>Culpa architecto hic</td>
                                  <td>Percentage</td>
                                  <td className="text-right">75% ($37,500.00)</td>
                                </tr>
                                <tr>
                                  <td>Saturation Deduction</td>
                                  <td>Exercitation labore</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$32.00</td>
                                </tr>
                                <tr>
                                  <td>Saturation Deduction</td>
                                  <td>Quas tenetur esse co</td>
                                  <td>Fixed</td>
                                  <td className="text-right">$37.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="row mt-4">
                            <div className="col-lg-8"></div>
                            <div className="col-lg-4 text-right text-sm">
                              <div className="invoice-detail-item pb-2">
                                <div className="invoice-detail-name font-weight-bold">Total Earning</div>
                                <div className="invoice-detail-value">$923,967.00</div>
                              </div>
                              <div className="invoice-detail-item">
                                <div className="invoice-detail-name font-weight-bold">Total Deduction</div>
                                <div className="invoice-detail-value">$37,608.00</div>
                              </div>
                              <hr className="mt-2 mb-2" />
                              <div className="invoice-detail-item">
                                <div className="invoice-detail-name font-weight-bold">Net Salary</div>
                                <div className="invoice-detail-value invoice-detail-value-lg">$936,359.00</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="text-md-right pb-2 text-sm">
                <div className="float-lg-left mb-lg-0 mb-3">
                  <p className="mt-2">Employee Signature</p>
                </div>
                <p className="mt-2">Paid By</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslipreceipt;

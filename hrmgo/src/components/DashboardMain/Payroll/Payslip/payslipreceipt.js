import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import { Link } from "react-router-dom";
import getAPI from "../../../../api/getAPI";

const Payslipreceipt = ({ isOpen, onClose, payslip }) => {
  const [allowances, setAllowances] = useState([]);
  const [commissions, setCommissions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [otherPayments, setOtherPayments] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [basicsalarys, setBasicsalarys] = useState([]);
  const [overtimes, setOvertimes] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchBasicsalary = async () => {
        try {
          const BasicSalaryResponse = await getAPI(`/getemployeedatabyid/${payslip._id}`, {}, true);
          const data = BasicSalaryResponse.data.data;

          if (data) {
            const BasicSalaryWithType = {
              amount: data?.salary.salary,
              name: 'Basicsalary',
              designationId:data?.employee.designationId
            
            };

            setBasicsalarys([BasicSalaryWithType]);
            console.log("Salary return:", { salary: data?.salary.salary });
          } else {
            console.error("Unexpected data format:", data);
          }
        } catch (err) {
          console.error("Failed to fetch Basic Salary data", err);
        }
      };

      fetchBasicsalary();
    }
  }, [payslip?._id, isOpen]);
  console.log("Basicsalarys state:", basicsalarys);
  

  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchAllowanceData = async () => {
        try {
          const allowanceResponse = await getAPI(`/getallowancebyid/${payslip._id}`, {}, true);
          const filteredAllowances = allowanceResponse.data.data.filter(item => item.employeeId === payslip._id);
          const allowancesWithType = filteredAllowances.map(item => ({
            ...item,
            name: 'allowance'
          }));
          setAllowances(allowancesWithType);
        } catch (err) {
          console.error("Failed to fetch allowance data", err);
        }
      };
      fetchAllowanceData();
    }
  }, [payslip?._id, isOpen]);



  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchCommissionData = async () => {
        try {
          setCommissions([]);
          const commissionResponse = await getAPI(`/getcommissionbyid/${payslip._id}`, {}, true);
          const filteredCommission = commissionResponse.data.data.filter(item => item.employeeId === payslip._id);
          const commissionsWithType = filteredCommission.map(item => ({
            ...item,
            name: 'commission'
          }));

          setCommissions(commissionsWithType);
        } catch (err) {
          setError("Failed to fetch commission data");
          console.error(err);
        }
      };

      fetchCommissionData();
    }
  }, [payslip?._id, isOpen]);

  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchOvertimeData = async () => {
        try {
          setOvertimes([]);
          const overtimeResponse = await getAPI(`/getovertimebyid/${payslip._id}`, {}, true);
          const filteredOvertime = overtimeResponse.data.data.filter(item => item.employeeId === payslip._id);
          const overtimesWithType = filteredOvertime.map(item => ({
            ...item,
            name: 'overtime'
          }));

          setOvertimes(overtimesWithType);
        } catch (err) {
          setError("Failed to fetch overtime data");
          console.error(err)
        }
      };

      fetchOvertimeData();
    }
  }, [payslip?._id, isOpen]);



  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchLoanData = async () => {
        try {
          setLoans([]);
          const loanResponse = await getAPI(`/getloanbyid/${payslip._id}`, {}, true);
          const loanWithType = loanResponse.data.data.map(item => ({
            ...item,
            name: 'loan'
          }));
          setLoans(loanWithType);
        } catch (err) {
          setError("Failed to fetch loan data");
          console.error(err);
        }
      };
      fetchLoanData();
    }
  }, [payslip?._id, isOpen]);

  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchOtherPaymentData = async () => {
        try {
          setOtherPayments([]);
          const otherPaymentResponse = await getAPI(`/getotherpaymentbyid/${payslip._id}`, {}, true);
          const otherPaymentWithType = otherPaymentResponse.data.data.map(item => ({
            ...item,
            name: 'otherpayment'
          }));
          setOtherPayments(otherPaymentWithType);
        } catch (err) {
          setError("Failed to fetch other payment data");
          console.error(err);
        }
      };
      fetchOtherPaymentData();
    }
  }, [payslip?._id, isOpen]);

  useEffect(() => {
    if (isOpen && payslip && payslip._id) {
      const fetchTaxData = async () => {
        try {
          setTaxes([]);
          const taxResponse = await getAPI(`/gettaxbyid/${payslip._id}`, {}, true);
          const taxWithType = taxResponse.data.data.map(item => ({
            ...item,
            name: 'tax'
          }));
          setTaxes(taxWithType);
        } catch (err) {
          setError("Failed to fetch tax data");
          console.error(err);
        }
      };
      fetchTaxData();
    }
  }, [payslip?._id, isOpen]);

  const combinedData = [...basicsalarys, ...allowances, ...commissions, ...overtimes];
  const combinededuction = [...loans, ...taxes, ...otherPayments];

  if (!isOpen) return null;

  const totalEarnings = combinedData.reduce((acc, item) => {
    return acc + (item.amount || 0);
  }, 0);

  const totalDeductions = combinededuction.reduce((acc, item) => {
    return acc + (item.amount || 0);
  }, 0);

  const netSalary = totalEarnings - totalDeductions;


  const formatAllowanceOrCommission = (item) => {
    const { amount, type } = item;
    const baseAmount = 1000;

    if (type === 'Percentage') {
      if (typeof amount === 'number' && typeof baseAmount === 'number' && baseAmount > 0) {
        const percentage = ((amount / baseAmount) * 100).toFixed(0);
        return `${percentage}%`;
      }
    }

  };


  const formatPayDate = (paydate) => {
    const date = new Date(paydate);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };
  const saveAsPDF = () => {
    const element = document.getElementById("printableArea");

    const opt = {
      margin: 0.3,
      filename: `${payslip?.name || 'Payslip'}.pdf`,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 4,
        dpi: 72,
        letterRendering: true,
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save();
  };


  return (
    <div
      className="modal fade show modal-overlay"
      id="commonModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block", paddingLeft: "0px" }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Employee Payslip</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="body">
            <div className="modal-body">
              <div className="text-md-end mb-2">
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Download"
                  onClick={saveAsPDF}
                >
                  <span className="fa fa-download"></span>
                </Link>
                <Link
                  title="Mail Send"
                  href="https://demo.workdo.io/hrmgo/payslip/send/5/2024-10"
                  className="btn btn-sm btn-warning"
                >
                  <span className="fa fa-paper-plane"></span>
                </Link>
              </div>
              <div className="invoice" id="printableArea">
                <div className="row">
                  <div className="col-form-label">
                    <div className="invoice-number">
                      <img
                        src="https://demo.workdo.io/hrmgo/storage/uploads/logo//logo-dark.png"
                        width="170px"
                      />
                    </div>
                    <div className="invoice-print">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="invoice-title"></div>
                          <hr />
                          <div className="row text-sm">
                            <div className="col-md-6">
                              <address>
                                <strong>Name :</strong> {payslip?.name}
                                <br />
                                <strong>Position :</strong>{payslip.designationName}
                                <br />
                                <strong>Salary Date :</strong>{" "}
                                {payslip?.payDate ? formatPayDate(payslip.payDate) : "N/A"}
                                <br />
                              </address>
                            </div>
                            <div className="col-md-6 text-end">
                              <address>
                                <strong>HRMGo </strong>
                                <br />
                                Roshita Apartment , Borivali,
                                <br />
                                GUJARAT-395006
                                <br />
                                <strong>Salary Slip :</strong>{" "}
                                {payslip?.paydate
                                  ? new Date(payslip.paydate).getFullYear() +
                                  "-" +
                                  (new Date(payslip.paydate).getMonth() + 1).toString().padStart(2, "0")
                                  : "N/A"}
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
                                  <th>Percentage</th>
                                  <th className="text-right">Amount</th>
                                </tr>
                                {combinedData.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.name === 'allowance' ? 'Allowance' : item.name === 'commission' ? 'Commission'
                                      : item.name === 'overtime' ? 'Overtime' : item.name === 'Basicsalary' ? 'Basic salary' : 'other'}</td>
                                    <td>{item.title || "-"}</td>
                                    <td>{item.type || "-"}</td>
                                    <td>{formatAllowanceOrCommission(item) || "-"}</td>
                                    <td className="text-right">
                                      {item.salary ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.salary) : (item.amount ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.amount) : "-")}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="row mt-2">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                <table className="table table-striped table-hover table-md">
                                  <tbody>
                                    <tr className="font-weight-bold">
                                      <th>Deduction</th>
                                      <th>Title</th>
                                      <th>Type</th>
                                      <th>Percentage</th>
                                      <th className="text-right">Amount</th>
                                    </tr>
                                    {combinededuction.map((item1, index) => (
                                      <tr key={index}>
                                        <td>{item1.name === 'loan' ? 'Loan ' : item1.name === 'otherpayment' ? 'Others '
                                          : item1.name === 'tax' ? 'Taxes' : 'Other'}</td>
                                        <td>{item1.title || "-"}</td>
                                        <td>{item1.type || "-"}</td>
                                        <td>{formatAllowanceOrCommission(item1) || "-"}</td>
                                        <td className="text-right">
                                          {item1.amount ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item1.amount) : "-"}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>

                              <div className="row mt-4">
                                <div className="col-lg-8"></div>
                                <div className="col-lg-4 text-right text-sm">
                                  <div className="invoice-detail-item pb-2">
                                    <div className="invoice-detail-name font-weight-bold">Total Earning</div>
                                    <div className="invoice-detail-value">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalEarnings)}</div>
                                  </div>
                                  <div className="invoice-detail-item">
                                    <div className="invoice-detail-name font-weight-bold">Total Deduction</div>
                                    <div className="invoice-detail-value">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalDeductions)}</div>
                                  </div>
                                  <hr className="mt-2 mb-2" />
                                  <div className="invoice-detail-item">
                                    <div className="invoice-detail-name font-weight-bold">Net Salary</div>
                                    <div className="invoice-detail-value invoice-detail-value-lg"> {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(netSalary)}</div>
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
              <hr />
              <div className="text-md-right pb-2 text-sm" style={{ clear: 'both', display: 'block', marginTop: '20px' }}>
                <div className="float-lg-left mb-lg-0 mb-3" style={{ display: 'block', marginBottom: '1.5rem' }}>
                  <p className="mt-2" style={{ fontSize: '14px', fontWeight: 'normal' }}>Employee Signature</p>
                </div>
                <p className="mt-2" style={{ fontSize: '14px', fontWeight: 'normal' }}>Paid By</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslipreceipt;

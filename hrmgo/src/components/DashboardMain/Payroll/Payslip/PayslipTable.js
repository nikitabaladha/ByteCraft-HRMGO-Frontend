import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import putAPI from "../../../../api/putAPI.js";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify"; // Import toast
import { TbReportMoney ,TbCurrencyDollar} from "react-icons/tb";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import BulkpaymentModal from "./bulkpaymentmodel.js";
import EditPayslipModal from "./EditPayslipModal.js";
import Payslipreceipt from "./payslipreceipt.js";
import * as XLSX from "xlsx";  // Import XLSX for export


const PayslipTable = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const [isEditModalOpen, setEditModalOpen] = useState(false); 
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [isPayslipReceiptOpen, setPayslipReceiptOpen] = useState(false);
  const [selectedPayslipForReceipt, setSelectedPayslipForReceipt] = useState(null);
  
  


  const fetchPayrollData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAPI(`/payslip-get-all?month=${month}&year=${year}`, {}, true);
      console.log("Fetched data:", response.data.data);
      
      // Ensure status and payslipId are included
      const normalizedData = (response.data.data || []).map((item) => ({
        employeeId: item.employeeId.id,
        name: item.employeeId.name,
        payrollType: item.payrollType,
        salary: item.salary,
        netSalary: item.netSalary,
        status: item.status,  
        payslipId: item._id,  
        paydate:item.paydate
      }));

      setPayrollData(normalizedData);
    } catch (err) {
      setError("Failed to fetch payroll data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updatePayslipStatus = async (payslipId) => {
    try {
      await putAPI(`/payslipupdatestatus/${payslipId}`, {}, true); // Call without storing response
  
      // Update payroll data locally
      const updatedData = payrollData.map((row) =>
        row.payslipId === payslipId ? { ...row, status: "paid" } : row
      );
  
      setPayrollData(updatedData);
    } catch (err) {
      console.error("Error updating payslip status:", err);
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleUpdateStatusDelete = async (payslipId) => {
    try {
      const response = await putAPI(
        `/update-status-delete/${payslipId}`,
        { status: "inactive" },
        {},
        true
      );

      if (!response.hasError) {
        console.log(`Payslip deletestatus  to`, response.data.data.status);
        toast.success("Payslip  successfully delete!");

      } else {
        console.error("Error updating deletestatus:", response.message);
        toast.error(`Failed to update deletestatus: ${response.message}`);
      }
    } catch (error) {
      console.error("Error while updating deletestatus:", error);
      toast.error("An error occurred while updating the deletestatus.");
    }
  };

  const handleBulkPayment = async () => {
    const unpaidEmployees = payrollData.filter((row) => row.status !== "paid");
    
    try {
      // Update status for all unpaid employees
      for (const employee of unpaidEmployees) {
        await putAPI(`/payslipupdatestatus/${employee.payslipId}`, {}, true);
      }
  
      // Update local state after successful update
      const updatedData = payrollData.map((row) =>
        row.status !== "paid" ? { ...row, status: "paid" } : row
      );
      setPayrollData(updatedData);
  
      toast.success("Bulk Payment successful!");
    } catch (err) {
      console.error("Error updating bulk payment:", err);
      toast.error("Failed to process bulk payment.");
    }
  };

  const [showPaySlipModal, setShowPaySlipModal] = useState(false);
  
  const handleClosePaySlip = () => setShowPaySlipModal(false);
  const handleShowPaySlip = () => setShowPaySlipModal(true);

  const handleExportToExcel = () => {
    // Modify the payroll data before exporting
    const exportData = payrollData.map((row) => ({
      EmployeeId: row.employeeId,   // Display employeeId.id
      Name: row.name,
      PayrollType: row.payrollType,
      Salary: row.salary,
      NetSalary: row.netSalary,
      Status: row.status
    }));

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payslip Data");
    XLSX.writeFile(wb, "Payslip_Data.xlsx");
  };

  const handleEditPayslip = (payslip) => {
    setSelectedPayslip(payslip);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (updatedPayslip) => {
    const updatedData = payrollData.map((row) =>
      row.payslipId === updatedPayslip.payslipId ? updatedPayslip : row
    );
    setPayrollData(updatedData);
    toast.success("Payslip updated successfully!");
  };

  const handleShowPayslipReceipt = (payslip) => {
    setSelectedPayslipForReceipt(payslip); // Set the payslip data to be shown in the modal
    setPayslipReceiptOpen(true); // Open the modal
  };
  
  
  const handleClosePayslipReceipt = () => {
    setPayslipReceiptOpen(false);
    setSelectedPayslipForReceipt(null);
  };
  
  useEffect(() => {
    fetchPayrollData();
  }, [month, year]);

  

  return (
    <div className="row">
      <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12 mt-4">
        <div className="card">
          <div className="card-body">
            <form
              method="POST"
              action="https://demo.workdo.io/hrmgo/payslip"
              acceptCharset="UTF-8"
              id="payslip_form"
            >
              <input
                name="_token"
                type="hidden"
                value="Lp81DxPCUuxJdGJZpGF0iIzfmIUj0a4dOX7ZDogF"
              />
              <div className="d-flex align-items-center justify-content-end">
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <div className="btn-box">
                    <label htmlFor="month" className="form-label">
                      Select Month
                    </label>
                    <select
                      className="form-control select"
                      id="month"
                      name="month"
                      value={month}
                      onChange={handleMonthChange}
                    >
                      {[
                        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
                      ].map((monthName, idx) => (
                        <option key={idx} value={String(idx + 1).padStart(2, "0")}>
                          {monthName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <div className="btn-box">
                    <label htmlFor="year" className="form-label">
                      Select Year
                    </label>
                    <select
                      className="form-control select"
                      id="year"
                      name="year"
                      value={year}
                      onChange={handleYearChange}
                    >
                      {Array.from({ length: 10 }, (_, idx) => 2021 + idx).map((yr) => (
                        <option key={yr} value={yr}>
                          {yr}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-auto float-end ms-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => document.getElementById("payslip_form").submit()}
                    data-bs-toggle="tooltip"
                    title="payslip"
                  >
                    Generate Payslip
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-md-4">
                <h5>Find Employee Payslip</h5>
              </div>
              <div className="col-md-8">
                <div className="d-flex align-items-center justify-content-end">
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                    <div className="btn-box">
                      <select
                        className="form-control month_date"
                        name="month"
                        value={month}
                        onChange={handleMonthChange}
                      >
                        <option value="--">--</option>
                        <option value="01">JAN</option>
                        <option value="02">FEB</option>
                        <option value="03">MAR</option>
                        <option value="04">APR</option>
                        <option value="05">MAY</option>
                        <option value="06">JUN</option>
                        <option value="07">JUL</option>
                        <option value="08">AUG</option>
                        <option value="09">SEP</option>
                        <option value="10">OCT</option>
                        <option value="11" selected>
                          NOV
                        </option>
                        <option value="12">DEC</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                    <div className="btn-box">
                      <select
                        className="form-control year_date"
                        name="year"
                        value={year}
                        onChange={handleYearChange}
                      >
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024" selected>
                          2024
                        </option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                      </select>
                    </div>
                  </div>
                  <form
                    method="POST"
                    action="https://demo.workdo.io/hrmgo/export/payslip"
                    acceptCharset="UTF-8"
                    id="payslip_form"
                    // onSubmit={handleSubmit}
                  >
                    <input name="_token" type="hidden" value="Lp81DxPCUuxJdGJZpGF0iIzfmIUj0a4dOX7ZDogF" />
                    <input type="hidden" name="filter_month" className="filter_month" value={month} />
                    <input type="hidden" name="filter_year" className="filter_year" value={year} />
                  </form>
                  <input type="submit" value="Export" className="btn btn-primary" onClick={handleExportToExcel}/>
                  <div className="ml-2 float-end">
                    <input
                     onClick={openModal}
                      type="button"
                      value="Bulk Payment"
                      className="btn btn-primary"
                      style={{ marginLeft: '5px' }}
                      id="bulk_payment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div className="text-danger">{error}</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Employee Id</th>
                      <th>Name</th>
                      <th>Payroll Type</th>
                      <th>Salary</th>
                      <th>Net Salary</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payrollData.map((row) => (
                      <tr key={row.employeeId}>
                        <td>
                          <button className="btn btn-outline-primary">
                            {row.employeeId}
                          </button>
                        </td>
                        <td>{row.name}</td>
                        <td>{row.payrollType}</td>
                        <td>{row.salary}</td>
                        <td>{row.netSalary}</td>
                        <td>
                          <span
                            className={`badge ${
                              row.status === "paid"
                                ? "bg-success text-white"
                                : "bg-danger text-white"
                            } p-2 px-3`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            <Link
                              to="#"
                              onClick={() => handleShowPayslipReceipt(row)}
                              className="btn-sm btn btn-warning me-1"
                              title="Payslip"
                            >
                              <TbReportMoney />
                            </Link>
                            {row.status !== "paid" && row.payslipId && (
                            <button
                            className="btn-sm btn btn-primary me-1"
                            title="Pay Salary"
                            onClick={() => updatePayslipStatus(row.payslipId)
                            }
                          >
                            <TbCurrencyDollar />
                          </button>
                            )}
                              {row.status !== "paid" && (
                            <Link
                              to="#"
                              onClick={() => handleEditPayslip(row)}
                              className="btn-sm btn btn-info me-1"
                              title="Edit"
                            >
                              <HiOutlinePencil />
                            </Link>
                              )}
                               <button
                               className="btn-sm btn btn-danger"
                               title="Delete"
                               onClick={() => {
                                console.log("Delete button clicked");
                                handleUpdateStatusDelete(row.payslipId);
                              }}
                             >
                              <RiDeleteBinLine />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      <BulkpaymentModal
          isOpen={isModalOpen}
          title="Bulk Payment"
          body={`Total Unpaid Employee ${payrollData.filter((row) => row.status !== "paid").length} out of ${payrollData.length}`}
          onClose={closeModal}
          onBulkPayment={handleBulkPayment}
          />
             <EditPayslipModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleSaveEdit}
        payslip={selectedPayslip}
      />
      <Payslipreceipt 
             isOpen={isPayslipReceiptOpen} 
             onClose={handleClosePayslipReceipt} 
            payslip={selectedPayslipForReceipt} 
           />

    </div>
  );
};

export default PayslipTable;
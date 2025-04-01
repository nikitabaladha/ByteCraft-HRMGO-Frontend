import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI.js";
import putAPI from "../../../../api/putAPI.js";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { TbReportMoney, TbCurrencyDollar } from "react-icons/tb";
import BulkpaymentModal from "./bulkpaymentmodel.js";
import Payslipreceipt from "./payslipreceipt.js";
import * as XLSX from "xlsx";
import ConfirmationDialog from "./statusinactive.js";

const PayslipTable = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [isPayslipReceiptOpen, setPayslipReceiptOpen] = useState(false);
  const [selectedPayslipForReceipt, setSelectedPayslipForReceipt] =
    useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [formData, setFormData] = useState({
    newPayrollToggle: false,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getAPI("/get-email-notification");
        const mappedData = {
          newPayrollToggle: response.data.data.newPayroll || false,
        };
        console.log("newPayrollToggle", mappedData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...mappedData,
        }));
      } catch (err) {
        toast.error("Error fetching email notification settings:", err);
      }
    };
    fetchSettings();
  }, []);

  // const openDeleteDialog = (employeeId) => {
  //   setEmployeeIdToDelete(employeeId);
  //   setIsDeleteDialogOpen(true);
  // };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setEmployeeIdToDelete(null);
  };

  const handleDeleteSuccess = (employeeId) => {
    const updatedData = payrollData.filter((row) => row._id !== employeeId);
    setPayrollData(updatedData);
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeResponse = await getAPI(`/employee-get-all`, {}, true);
        const employeeList = employeeResponse.data.data;

        const salaryList = await Promise.all(
          employeeList.map(async (employee) => {
            const salaryResponse = await getAPI(
              `/getemployeedatabyid/${employee._id}`,
              {},
              true
            );
            const salaryData = salaryResponse.data.data;
            return {
              employeeId: employee._id,
              payrollType: salaryData?.salary.salaryType,
              salary: salaryData?.salary.salary,
              grandTotal: salaryData?.salary.grandTotal,
              status: salaryData?.salary.status,
              payDate: salaryData?.salary.payDate,
              statusPayDate: salaryData?.salary.statusPayDate,
              createdAt: salaryData?.salary.createdAt,
            };
          })
        );

        const mergedData = employeeList.map((employee) => {
          const salaryInfo = salaryList.find(
            (salary) => salary.employeeId === employee._id
          );
          const netSalary = salaryInfo.grandTotal;
          return {
            ...employee,
            salary: salaryInfo ? salaryInfo.salary : "",
            payrollType: salaryInfo ? salaryInfo.payrollType : "",
            grandTotal: salaryInfo ? salaryInfo.grandTotal : "",
            netSalary: netSalary,
            status: salaryInfo ? salaryInfo.status : "",
            payDate: salaryInfo ? salaryInfo.payDate : "",
            statusPayDate: salaryInfo ? salaryInfo.statusPayDate : "",
            createdAt: salaryInfo ? salaryInfo.createdAt : "",
          };
        });
        console.log("Merged Data:", mergedData);
        setPayrollData(mergedData);
      } catch (error) {
        console.error("Error fetching payroll data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const updatePayslipStatus = async (employeeId) => {
    const updatedData = payrollData.map((row) =>
      row.employeeId === employeeId ? { ...row, status: "paid" } : row
    );
    setPayrollData(updatedData);
    toast.success("Payslip marked as paid!");

    try {
      await putAPI(`/updatestatus/${employeeId}`, {}, true);
    } catch (err) {
      const revertedData = payrollData.map((row) =>
        row.employeeId === employeeId ? { ...row, status: "unpaid" } : row
      );
      setPayrollData(revertedData);
      toast.error("Failed to update payslip status.");
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleBulkPayment = async () => {
    const unpaidEmployees = payrollData.filter((row) => row.status !== "paid");

    try {
      for (const row of unpaidEmployees) {
        const employeeId = row._id;
        await putAPI(`/updatestatus/${employeeId}`, {}, true);
      }

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

  const handleExportToExcel = () => {
    const exportData = payrollData.map((row) => ({
      EmployeeId: row.id,
      Name: row.name,
      PayrollType: row.payrollType,
      Salary: row.salary,
      NetSalary: row.netSalary,
      Status: row.status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payslip Data");
    XLSX.writeFile(wb, "Payslip_Data.xlsx");
  };

  const handleShowPayslipReceipt = (payslip) => {
    setSelectedPayslipForReceipt(payslip);
    setPayslipReceiptOpen(true);
  };

  const handleClosePayslipReceipt = () => {
    setPayslipReceiptOpen(false);
    setSelectedPayslipForReceipt(null);
  };

  const filteredPayrollData = payrollData.filter((row) => {
    if (!selectedMonth || !selectedYear) return true;

    const payDate = new Date(row.createdAt);
    const payMonth = payDate.getMonth() + 1;
    const payYear = payDate.getFullYear();

    return (
      payMonth === parseInt(selectedMonth) && payYear === parseInt(selectedYear)
    );
  });

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleGeneratePayslip = async () => {
    try {
      const response = await putAPI(
        "/updategenratepayslipdate",
        {
          payDate: new Date().toISOString(),
          newPayrollToggle: formData.newPayrollToggle,
        },
        true
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to generate payslips");
      }

      // Refresh data after successful generation
      const employeeResponse = await getAPI(`/employee-get-all`, {}, true);
      const employeeList = employeeResponse.data.data;

      const salaryList = await Promise.all(
        employeeList.map(async (employee) => {
          const salaryResponse = await getAPI(
            `/getemployeedatabyid/${employee._id}`,
            {},
            true
          );
          return salaryResponse.data.data;
        })
      );

      const mergedData = employeeList.map((employee) => {
        const salaryInfo = salaryList.find(
          (salary) => salary?.salary?.employeeId === employee._id
        );
        return {
          ...employee,
          ...(salaryInfo?.salary || {}),
          netSalary: salaryInfo?.salary?.grandTotal || 0,
        };
      });

      setPayrollData(mergedData);
      toast.success(response.data.message);
    } catch (err) {
      console.error("Payslip generation error:", err);
      toast.error(err.message || "Failed to generate payslips");
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <div className="mt-2" id="multiCollapseExample1">
          <div className="card">
            <div className="card-body">
              <form method="POST" acceptCharset="UTF-8" id="payslip_form">
                <input
                  name="_token"
                  type="hidden"
                  value="Lp81DxPCUuxJdGJZpGF0iIzfmIUj0a4dOX7ZDogF"
                />
                <div className="row align-items-center justify-content-end">
                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <label htmlFor="month" className="form-label text-dark">
                        Select Month
                      </label>
                      <select
                        className="form-control select"
                        id="month"
                        name="month"
                        onChange={handleMonthChange}
                      >
                        {[
                          "JAN",
                          "FEB",
                          "MAR",
                          "APR",
                          "MAY",
                          "JUN",
                          "JUL",
                          "AUG",
                          "SEP",
                          "OCT",
                          "NOV",
                          "DEC",
                        ].map((monthName, idx) => (
                          <option
                            key={idx}
                            value={String(idx + 1).padStart(2, "0")}
                          >
                            {monthName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <label htmlFor="year" className="form-label text-dark">
                        Select Year
                      </label>
                      <select
                        className="form-control select"
                        id="year"
                        name="year"
                        onChange={handleYearChange}
                      >
                        {Array.from({ length: 10 }, (_, idx) => 2021 + idx).map(
                          (yr) => (
                            <option key={yr} value={yr}>
                              {yr}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="row">
                      <div className="col-auto mt-4">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleGeneratePayslip}
                          data-bs-toggle="tooltip"
                          title="payslip"
                        >
                          Generate Payslip
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
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
                <div
                  className="d-flex flex-wrap align-items-center justify-content-end"
                  style={{ gap: "10px" }} // Space between items
                >
                  {/* Month Dropdown */}
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <select
                        className="form-control month_date"
                        name="month"
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

                  {/* Year Dropdown */}
                  <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12">
                    <div className="btn-box">
                      <select
                        className="form-control year_date"
                        name="year"
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

                  <form method="POST" acceptCharset="UTF-8" id="payslip_form">
                    <input
                      name="_token"
                      type="hidden"
                      value="Lp81DxPCUuxJdGJZpGF0iIzfmIUj0a4dOX7ZDogF"
                    />
                    <input
                      type="hidden"
                      name="filter_month"
                      className="filter_month"
                    />
                    <input
                      type="hidden"
                      name="filter_year"
                      className="filter_year"
                    />
                  </form>

                  {/* Export Button */}
                  <input
                    type="submit"
                    value="Export"
                    className="btn btn-primary"
                    style={{ width: "30%", maxWidth: "200px" }} // Responsive width
                    onClick={handleExportToExcel}
                  />

                  {/* Bulk Payment Button */}
                  <div className="float-end">
                    <input
                      onClick={openModal}
                      type="button"
                      value="Bulk Payment"
                      className="btn btn-primary"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        marginLeft: "5px",
                      }}
                      id="bulk_payment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
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
                  {filteredPayrollData
                    .filter(
                      (row) => row.status === "paid" || row.status === "unpaid"
                    )
                    .map((row) => (
                      <tr key={row._id}>
                        <td className="text-dark">
                          <button className="btn btn-outline-primary">
                            {row.id}
                          </button>
                        </td>
                        <td className="text-dark">{row.name}</td>
                        <td className="text-dark">{row.payrollType}</td>
                        <td className="text-dark">{`₹${
                          typeof row.salary === "number"
                            ? new Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                              }).format(row.salary)
                            : "0.00"
                        }`}</td>
                        <td className="text-dark">{`₹${
                          typeof row.netSalary === "number"
                            ? new Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 2,
                              }).format(row.netSalary)
                            : "0.00"
                        }`}</td>
                        <td>
                          <span
                            className={`badge ${
                              row.status === "paid"
                                ? "bg-success text-white"
                                : row.status === "inactive"
                                ? "bg-secondary text-white"
                                : "bg-danger text-white"
                            } p-2 px-3`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex">
                            {row.payDate && (
                              <Link
                                to="#"
                                onClick={() => handleShowPayslipReceipt(row)}
                                className="btn-sm btn btn-warning me-1"
                                title="Payslip"
                              >
                                <TbReportMoney />
                              </Link>
                            )}
                            {row.status !== "paid" && row.id && (
                              <button
                                className="btn-sm btn btn-primary me-1"
                                title="Pay Salary"
                                onClick={() => {
                                  updatePayslipStatus(row._id);
                                }}
                              >
                                <TbCurrencyDollar />
                              </button>
                            )}
                            {row.status !== "paid" && (
                              <Link
                                // to="#"
                                to={`/Dashboard/payroll/employee-set-salary/${row._id}`}
                                className="btn-sm btn btn-info me-1"
                                title="Edit"
                              >
                                {/* <HiOutlinePencil /> */}
                                <i className="ti ti-pencil"></i>
                              </Link>
                            )}
                            {/* <button
                              className="btn-sm btn btn-danger"
                              title="Delete"
                              onClick={() => openDeleteDialog(row._id)}
                            > */}
                              {/* <RiDeleteBinLine /> */}
                              {/* <i className="ti ti-trash"></i>
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <BulkpaymentModal
        isOpen={isModalOpen}
        title="Bulk Payment"
        body={`Total Unpaid Employee ${
          payrollData.filter((row) => row.status !== "paid").length
        } out of ${payrollData.length}`}
        onClose={closeModal}
        onBulkPayment={handleBulkPayment}
      />
      <Payslipreceipt
        isOpen={isPayslipReceiptOpen}
        onClose={handleClosePayslipReceipt}
        payslip={selectedPayslipForReceipt}
      />

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          employeeId={employeeIdToDelete}
          onUpdated={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default PayslipTable;

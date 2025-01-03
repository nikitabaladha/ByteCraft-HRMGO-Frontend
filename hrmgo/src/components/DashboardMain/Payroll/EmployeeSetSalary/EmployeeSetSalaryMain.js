import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import SetBasicSalary from "./SetBasicSalary";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";
import AllowanceModal from './Allowancemodal';
import CommissionModal from './Commissonmodal';
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import ConfirmationDialog from "../../ConfirmationDialog";
import UpdateAllowanceModal from './EditAllowance';
import UpdateCommissionModal from './EditCommission';
import CreateLoanModal from './Loanmodal'
import UpdateLoanModal from './EditLoanModal';
import CreateOtherpaymentModal from './OtherpaymentModal'
import UpdateOtherPaymentModal from './EditOtherPaymentModal';
import CreateTaxModal from './Taxmodal';
import UpdateTaxModal from './EditTaxModal';
import CreateOvertimeModal from './Overtime';
import UpdateOvertimeModal from './EditOvertime';



const EmployeeSetSalary = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [employeeName, setEmployeeName] = useState('');
    const [allowances, setAllowances] = useState([]);
    const [isBasicSalaryModalOpen, setIsBasicSalaryModalOpen] = useState(false);
    const [isAllowanceModalOpen, setIsAllowanceModalOpen] = useState(false);
    const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
    const [commissions, setCommissions] = useState([]);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedAllowance, setSelectedAllowance] = useState(null);
    const [selectedCommission, setSelectedCommission] = useState(null);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
    const [isOtherpaymentModalOpen, setIsOtherpaymentnModalOpen] = useState(false);
    const [loans, setLoans] = useState([]);
    const [otherPayments, setOtherPayments] = useState([]);
    const [selectedOtherPayment, setSelectedOtherPayment] = useState(null);
    const [isTaxModalOpen, setIsTaxModalOpen] = useState(false);
    const [taxes, setTaxes] = useState([]);
    const [selectedTax, setSelectedTax] = useState(null);
    const [isOvertimeModalOpen, setIsOvertimeModalOpen] = useState(false);
    const [overtimes, setOvertimes] = useState([]);
    const [selectedOvertime, setSelectedOvertime] = useState(null);
    const [salaryType, setSalaryType] = useState("");
    const [salary, setSalary] = useState("");
  


    const openAllowanceModal = (allowance) => {
        setSelectedAllowance(allowance);
        setModalType('allowance');
        setIsModalOpen(true);
    };

    const openCommissionModal = (commission) => {
        setSelectedCommission(commission);
        setModalType('commission');
        setIsModalOpen(true);
    };

    const openLoanModal = (loan) => {
        setSelectedLoan(loan);
        setModalType('loan');
        setIsModalOpen(true);
    };

    const openOtherpaymentModal = (payment) => {
        setSelectedOtherPayment(payment);
        setModalType('otherPayment');
        setIsModalOpen(true);
    };

    const openTaxModal = (tax) => {
        setSelectedTax(tax);
        setModalType('tax');
        setIsModalOpen(true);
    };

    const openOvertimeModal = (overtime) => {
        setSelectedOvertime(overtime);
        setModalType('overtime');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
        setSelectedAllowance(null);
        setSelectedCommission(null);
        setSelectedLoan(null);
        setSelectedOtherPayment(null);
        setSelectedTax(null);
        setSelectedOvertime(null);
    };

    const handleDeleteConfirmed = () => {
        if (selectedAllowance) {
            setAllowances((prevAllowances) =>
                prevAllowances.filter((allowance) => allowance._id !== selectedAllowance._id)
            );
        } else if (selectedCommission) {
            setCommissions((prevCommissions) =>
                prevCommissions.filter((commission) => commission._id !== selectedCommission._id)
            );
        } else if (selectedLoan) {
            setLoans((prevLoans) =>
                prevLoans.filter((loan) => loan._id !== selectedLoan._id)
            );
        } else if (selectedOtherPayment) {
            setOtherPayments((prevOtherPayments) =>
                prevOtherPayments.filter((payment) => payment._id !== selectedOtherPayment._id)
            );
        } else if (selectedTax) {
            setTaxes((prevTaxes) =>
                prevTaxes.filter((tax) => tax._id !== selectedTax._id)
            );
        } else if (selectedOvertime) {
            setOvertimes((prevOvertimes) =>
                prevOvertimes.filter((overtime) => overtime._id !== selectedOvertime._id)
            );
        }
        setIsDeleteDialogOpen(false);
    };

    const openDeleteDialogForCommission = (commission) => {
        setSelectedCommission(commission);  
        setIsDeleteDialogOpen(true);  
    };
    

    const openDeleteDialog = (item) => {
        if (item.allowanceOption) {
            setSelectedAllowance(item);
        } else if (item.loanOption) {
            setSelectedLoan(item);
        } else if (item.taxes) {
            setSelectedTax(item);
        } else if (item.type) {
            setSelectedOtherPayment(item);
        } else if (item._id) {
            setSelectedOvertime(item);
        }
        setIsDeleteDialogOpen(true);
    };

    const toggleBasicSalaryModal = () => {
        setIsBasicSalaryModalOpen((prev) => !prev);
    };

    const toggleAllowanceModal = () => {
        setIsAllowanceModalOpen((prev) => !prev);
    };

    const toggleCommissoinModal = () => {
        setIsCommissionModalOpen((prev) => !prev);
    };

    const toggleLoanModal = () => {
        setIsLoanModalOpen((prev) => !prev);
    };

    const toggleOtherpaymentModal = () => {
        setIsOtherpaymentnModalOpen((prev) => !prev);
    };

    const toggleTaxModal = () => {
        setIsTaxModalOpen((prev) => !prev);
    };

    const toggleOvertimeModal = () => {
        setIsOvertimeModalOpen((prev) => !prev);
    };


   


    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const nameResponse = await getAPI(`/getemployeeemployee/${employeeId}`, {}, true);
                setEmployeeName(nameResponse.data.employeeName || '');

                const response = await getAPI(`/getemployeedatabyid/${employeeId}`, {}, true);
                setEmployee(response.data.data || null);
            } catch (err) {
                console.error("Failed to fetch employee data", err);
            }
        };


        const fetchAllowanceData = async () => {
            try {
                const allowanceResponse = await getAPI(`/getallowancebyid/${employeeId}`, {}, true);
                setAllowances(allowanceResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch allowance data", err);
            }
        };

        const fetchCommissionData = async () => {
            try {
                const commissionResponse = await getAPI(`/getcommissionbyid/${employeeId}`, {}, true);
                setCommissions(commissionResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch commission data", err);
            }
        };

        const fetchLoanData = async () => {
            try {
                const loanResponse = await getAPI(`/getloanbyid/${employeeId}`, {}, true);
                setLoans(loanResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch loan data", err);
            }
        };


        const fetchOtherPaymentData = async () => {
            try {
                const otherPaymentResponse = await getAPI(`/getotherpaymentbyid/${employeeId}`, {}, true);
                setOtherPayments(otherPaymentResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch other payment data", err);
            }
        };

        const fetchTaxData = async () => {
            try {
                const taxResponse = await getAPI(`/gettaxbyid/${employeeId}`, {}, true);
                setTaxes(taxResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch tax data", err);
            }
        };

        const fetchOvertimeData = async () => {
            try {
                const overtimeResponse = await getAPI(`/getovertimebyid/${employeeId}`, {}, true);
                setOvertimes(overtimeResponse.data.data || []);
            } catch (err) {
                console.error("Failed to fetch overtime data", err);
            }
        };

        fetchEmployeeData();
        fetchAllowanceData();
        fetchCommissionData();
        fetchLoanData();
        fetchOtherPaymentData();
        fetchTaxData();
        fetchOvertimeData();
    }, [employeeId]);

    const formatAllowance = (allowance) => {
        const { amount, type } = allowance;
        const baseAmount = 1000;

        if (type === 'Percentage') {
            if (typeof amount === 'number' && typeof baseAmount === 'number' && baseAmount > 0) {
                const percentage = ((amount / baseAmount) * 100).toFixed(0);
                return `${percentage}% `;
            }
        }

        return "-";
    };

    const formatCommission = (commission) => {
        const { amount, type } = commission;
        const baseAmount = 1000;

        if (type === 'Percentage') {
            if (typeof amount === 'number' && amount >= 0 && typeof baseAmount === 'number' && baseAmount > 0) {
                const percentage = ((amount / baseAmount) * 100).toFixed(0);
                return `${percentage}% `;
            }
        }


        return "-";
    };

    const formatLoan = (loan) => {
        const { amount, type } = loan;
        const baseAmount = 1000;

        if (type === 'Percentage') {
            if (typeof amount === 'number' && amount >= 0 && typeof baseAmount === 'number' && baseAmount > 0) {
                const percentage = ((amount / baseAmount) * 100).toFixed(0);
                return `${percentage}% `;
            }
        }
        return "-";
    };


    const formatOtherpayment = (payment) => {
        const { amount, type } = payment;
        const baseAmount = 1000;

        if (type === 'Percentage') {
            if (typeof amount === 'number' && amount >= 0 && typeof baseAmount === 'number' && baseAmount > 0) {
                const percentage = ((amount / baseAmount) * 100).toFixed(0);
                return `${percentage}% `;
            }
        }
        return "-";
    };

    const formatTax = (tax) => {
        const { amount, type } = tax;
        const baseAmount = 1000;

        if (type === 'Percentage') {
            if (typeof amount === 'number' && amount >= 0 && typeof baseAmount === 'number' && baseAmount > 0) {
                const percentage = ((amount / baseAmount) * 100).toFixed(0);
                return `${percentage}% `;
            }
        }

        return "-";
    };

    
const totalAllowance = allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
const totalCommission = commissions.reduce((sum, commission) => sum + commission.amount, 0);

const totalLoan = loans.reduce((sum, loan) => sum + loan.amount, 0);
const totalTax = taxes.reduce((sum, tax) => sum + tax.amount, 0);
const totalOtherPayment = otherPayments.reduce((sum, payment) => sum + payment.amount, 0);
const totalOvertimeRate = overtimes.reduce((sum, overtime) => sum + overtime.amount, 0);

const totalDeductions = totalLoan + totalTax + totalOtherPayment;
const NetSalary = totalAllowance + totalCommission - totalDeductions + totalOvertimeRate;

useEffect(() => {
    if (employee?.id) {
      const fetchSalaryData = async () => {
        try {
          const response = await getAPI(`/getemployeedatabyid/${employee.id}`, {}, true);
          const salaryData = response.data?.data?.salary;

          if (salaryData) {
            setSalaryType(salaryData.salaryType || "");
            setSalary(salaryData.salary || "");
          }
        } catch (error) {
          console.error("Error fetching employee salary data.");
        }
      };

      fetchSalaryData();
    }
  }, [employee?.id]);

  useEffect(() => {
    if (NetSalary && salary && salaryType && employee?.id) {
      const updateGrandTotal = async () => {
        try {
          const policyData = {
            employeeId: employee.id,
            salaryType,
            salary,
            NetSalary,
          };

          const response = await putAPI("/updatenetsalary", policyData, true);
          if (response.data.success) {
            console.log("Grand Total updated successfully.");
          }
        } catch (error) {
          console.error("An error occurred while updating the Grand Total.");
        }
      };

      updateGrandTotal();
    }
  }, [NetSalary, salary, salaryType, employee?.id]);



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
                                    <Link
                                        to="#"
                                        data-ajax-popup="true"
                                        data-title="Set Basic Salary"
                                        data-bs-toggle="tooltip"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Set Salary"
                                        onClick={toggleBasicSalaryModal}
                                    >
                                        <FiPlus />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {employee && (
                                <>
                                    <div className="project-info d-flex text-sm">
                                        <div className="project-info-inner mr-3 col-11">
                                            <b className="m-0">Payslip Type</b>
                                            <div className="project-amnt pt-1">
                                                {employee?.salary?.salaryType || ''}
                                            </div>
                                        </div>
                                        <div className="project-info-inner mr-3 col-1">
                                            <b className="m-0">Salary</b>
                                            <div className="project-amnt pt-1">
                                                {employee?.salary?.salary || ''}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-info d-flex text-sm">
                                        <div className="project-info-inner mt-3 col-11">
                                            <b className="m-0">Account Type</b>
                                            <div className="project-amnt pt-1">
                                                {employeeName || ''}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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
                                    <Link
                                        to="#"
                                        data-ajax-popup="true"
                                        data-title="Create Allowance"
                                        data-bs-toggle="tooltip"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                        onClick={toggleAllowanceModal}
                                    >
                                        <FiPlus />
                                    </Link>
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
                                            <th>Percentage</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allowances.map((allowance, index) => (
                                            <tr key={index}>
                                                <td>{allowance.employeeName}</td>
                                                <td>{allowance.allowanceOption}</td>
                                                <td>{allowance.title}</td>
                                                <td>{allowance.type}</td>
                                                <td>{formatAllowance(allowance)}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(allowance.amount)}`}</td>
                                                {/* <td>${allowance.amount}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit Allowance"
                                                                    data-bs-original-title="Edit"
                                                                    onClick={() => openAllowanceModal(allowance)}

                                                                >
                                                                    <span className="text-white">    <HiOutlinePencil /></span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form
                                                                    method="POST"
                                                                    action={`https://demo.workdo.io/hrmgo/allowance`}
                                                                    acceptCharset="UTF-8"
                                                                    id={`delete-form`}
                                                                >
                                                                    <input name="_method" type="hidden" value="DELETE" />
                                                                    <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialog(allowance);
                                                                        }}
                                                                    >
                                                                        <span className="text-white">  <RiDeleteBinLine /></span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && modalType === 'allowance' && selectedAllowance && (
                        <UpdateAllowanceModal
                            onClose={closeModal}
                            allowanceData={selectedAllowance}
                            employee={{ ...employee, id: employeeId, name: employeeName }}
                        />
                    )}
                </div>

                {/* Commission Section */}
                <div className="col-md-6">
                    <div className="card set-card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-11">
                                    <h5>Commission</h5>
                                </div>
                                <div className="col-1 text-end">
                                    <Link

                                        data-ajax-popup="true"
                                        data-title="Create Commission"
                                        data-bs-toggle="tooltip"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                        onClick={toggleCommissoinModal}
                                    >
                                        <FiPlus />
                                    </Link>
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
                                            <th>Percentage</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commissions.map((commission, index) => (
                                            <tr key={index}>
                                                <td>{commission.employeeName}</td>
                                                <td>{commission.title}</td>
                                                <td>{commission.type}</td>
                                                <td>{formatCommission(commission)}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(commission.amount)}`}</td>
                                                {/* <td>${commission.amount}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    onClick={() => openCommissionModal(commission)}
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit Commission"
                                                                    data-bs-original-title="Edit"
                                                                >
                                                                    <span className="text-white"> <HiOutlinePencil /></span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form
                                                                    method="POST"
                                                                    action={`/commission`}
                                                                    acceptCharset="UTF-8"
                                                                    id={`delete-form`}
                                                                >
                                                                    <input name="_method" type="hidden" value="DELETE" />
                                                                    <input name="_token" type="hidden" value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D" />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialogForCommission(commission); 
                                                                        }}
                                                                    >
                                                                        <span className="text-white"><RiDeleteBinLine /></span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && modalType === 'commission' && selectedCommission && (
                        <UpdateCommissionModal
                            onClose={closeModal}
                            commissionData={selectedCommission}
                            employee={{ ...employee, id: employeeId, name: employeeName }}
                        />
                    )}
                </div>


                {/* Loan Deduction */}

                <div className="col-md-6">
                    <div className="card set-card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-11">
                                    <h5>Loan Deduction</h5>
                                </div>
                                <div className="col-1 text-end">
                                    <Link
                                        onClick={toggleLoanModal}
                                        data-ajax-popup="true"
                                        data-title="Create Loan"
                                        data-bs-toggle="tooltip"
                                        title=""
                                        data-size="lg"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                    >
                                        <FiPlus />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Loan Options</th>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Percentage</th>
                                            <th>Loan Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loans.map((loan, index) => (
                                            <tr key={index}>
                                                <td>{loan.employeeName}</td>
                                                <td>{loan.loanOption}</td>
                                                <td>{loan.title}</td>
                                                <td>{loan.type}</td>
                                                <td>{formatLoan(loan)}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(loan.amount)}`}</td>
                                                {/* <td>${loan.amount}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    onClick={() => openLoanModal(loan)}
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit Loan"
                                                                    data-bs-original-title="Edit"
                                                                >
                                                                    <span className="text-white">
                                                                        <HiOutlinePencil />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form
                                                                    method="POST"
                                                                    action={`/loan`}
                                                                    acceptCharset="UTF-8"
                                                                    id={`delete-form`}
                                                                >
                                                                    <input
                                                                        name="_method"
                                                                        type="hidden"
                                                                        value="DELETE"
                                                                    />
                                                                    <input
                                                                        name="_token"
                                                                        type="hidden"
                                                                        value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                                                                    />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialog(loan);
                                                                        }}
                                                                    >
                                                                        <span className="text-white">
                                                                            <RiDeleteBinLine />
                                                                        </span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && modalType === 'loan' && selectedLoan && (
                        <UpdateLoanModal
                            onClose={closeModal}
                            loanData={selectedLoan}
                            employee={{ ...employee, id: employeeId, name: employeeName }}
                        />
                    )}
                </div>

                <div className="col-md-6">
                    <div className="card set-card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-11">
                                    <h5>Tax Deduction</h5>
                                </div>
                                <div className="col-1 text-end">
                                    <Link
                                        onClick={toggleTaxModal}
                                        data-ajax-popup="true"
                                        data-title="Create Tax"
                                        data-bs-toggle="tooltip"
                                        title=""
                                        data-size="lg"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                    >
                                        <FiPlus />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body table-border-style" style={{ overflow: 'auto' }}>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Tax </th>
                                            <th>Title</th>
                                            <th>Type</th>
                                            <th>Percentage</th>
                                            <th>Tax Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {taxes.map((tax, index) => (
                                            <tr key={index}>
                                                <td>{tax.employeeName}</td>
                                                <td>{tax.taxes}</td>
                                                <td>{tax.title}</td>
                                                <td>{tax.type}</td>
                                                <td>{formatTax(tax)}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(tax.amount)}`}</td>
                                                {/* <td>${tax.amount}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    onClick={() => openTaxModal(tax)}
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit Tax"
                                                                    data-bs-original-title="Edit"
                                                                >
                                                                    <span className="text-white">
                                                                        <HiOutlinePencil />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form
                                                                    method="POST"
                                                                    action={`/tax`}
                                                                    acceptCharset="UTF-8"
                                                                    id={`delete-form`}
                                                                >
                                                                    <input
                                                                        name="_method"
                                                                        type="hidden"
                                                                        value="DELETE"
                                                                    />
                                                                    <input
                                                                        name="_token"
                                                                        type="hidden"
                                                                        value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                                                                    />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialog(tax);
                                                                        }}
                                                                    >
                                                                        <span className="text-white">
                                                                            <RiDeleteBinLine />
                                                                        </span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && modalType === 'tax' && selectedTax && (
                        <UpdateTaxModal
                            onClose={closeModal}
                            taxData={selectedTax}
                            employee={{ ...employee, id: employeeId, name: employeeName }}
                        />
                    )}
                </div>

                <div className="col-md-6">
                    <div className="card set-card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-11">
                                    <h5>Other Deduction</h5>
                                </div>
                                <div className="col-1 text-end">
                                    <Link
                                        onClick={toggleOtherpaymentModal}
                                        data-ajax-popup="true"
                                        data-title="Create Other Payment"
                                        data-bs-toggle="tooltip"
                                        title=""
                                        data-size="lg"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                    >
                                        <FiPlus />
                                    </Link>
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
                                            <th>Percentage</th>
                                            <th>Amount</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {otherPayments.map((payment, index) => (
                                            <tr key={index}>
                                                <td>{payment.employeeName}</td>
                                                <td>{payment.title}</td>
                                                <td>{payment.type}</td>
                                                <td>{formatOtherpayment(payment)}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(payment.amount)}`}</td>
                                                {/* <td>${payment.amount}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    onClick={() => openOtherpaymentModal(payment)}
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit Other Payment"
                                                                    data-bs-original-title="Edit"
                                                                >
                                                                    <span className="text-white">
                                                                        <HiOutlinePencil />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form method="POST" action={`/otherpayment`} acceptCharset="UTF-8">
                                                                    <input name="_method" type="hidden" value="DELETE" />
                                                                    <input name="_token" type="hidden" value="your_token_here" />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialog(payment);
                                                                        }}
                                                                    >
                                                                        <span className="text-white">
                                                                            <RiDeleteBinLine />
                                                                        </span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && modalType === 'otherPayment' && selectedOtherPayment && (
                        <UpdateOtherPaymentModal
                            onClose={closeModal}
                            paymentData={selectedOtherPayment}
                            employee={{ ...employee, id: employeeId, name: employeeName }}
                        />
                    )}
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
                                    <Link
                                        onClick={toggleOvertimeModal}
                                        data-ajax-popup="true"
                                        data-title="Create Overtime"
                                        data-bs-toggle="tooltip"
                                        className="btn btn-sm btn-primary"
                                        data-bs-original-title="Create"
                                    >
                                        <FiPlus />
                                    </Link>
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
                                        {overtimes.map((overtime, index) => (
                                            <tr key={index}>
                                                <td>{overtime.employeeName}</td>
                                                <td>{overtime.title}</td>
                                                <td>{overtime.numberOfDays}</td>
                                                <td>{overtime.hours}</td>
                                                <td>{`₹${new Intl.NumberFormat('en-IN').format(overtime.amount)}`}</td>
                                                {/* <td>${overtime.rate}</td> */}
                                                <td className="Action">
                                                    <div className="dt-buttons">
                                                        <span>
                                                            <div className="action-btn bg-info me-2">
                                                                <Link
                                                                    className="mx-3 btn btn-sm align-items-center"
                                                                    onClick={() => openOvertimeModal(overtime)}
                                                                    data-ajax-popup="true"
                                                                    data-size="md"
                                                                    data-bs-toggle="tooltip"
                                                                    data-title="Edit OverTime"
                                                                    data-bs-original-title="Edit"
                                                                >
                                                                    <span className="text-white">
                                                                        <HiOutlinePencil />
                                                                    </span>
                                                                </Link>
                                                            </div>
                                                            <div className="action-btn bg-danger">
                                                                <form
                                                                    method="POST"
                                                                    action={`https://demo.workdo.io/hrmgo/overtime`}
                                                                    acceptCharset="UTF-8"
                                                                    id={`delete-form`}
                                                                >
                                                                    <input name="_method" type="hidden" value="DELETE" />
                                                                    <input
                                                                        name="_token"
                                                                        type="hidden"
                                                                        value="bMuTLlqUekMiqXTWH3sN0nLYXEvbNfRfMngiDZ2D"
                                                                    />
                                                                    <Link
                                                                        to="#"
                                                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Delete"
                                                                        aria-label="Delete"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            openDeleteDialog(overtime);
                                                                        }}
                                                                    >
                                                                        <span className="text-white">
                                                                            <RiDeleteBinLine />
                                                                        </span>
                                                                    </Link>
                                                                </form>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && modalType === 'overtime' && selectedOvertime && (
                    <UpdateOvertimeModal
                        onClose={closeModal}
                        overtimeData={selectedOvertime}
                        employee={{ ...employee, id: employeeId, name: employeeName }}
                    />
                )}
                </div>
                {isBasicSalaryModalOpen && (
                <SetBasicSalary
                    onClose={toggleBasicSalaryModal}
                    employee={{ ...employee, id: employeeId }}
                    grandTotal={NetSalary}
                />
            )}

            {isAllowanceModalOpen && (
                <AllowanceModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleAllowanceModal}
                    
                />
            )}

            {isCommissionModalOpen && (
                <CommissionModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleCommissoinModal}
                />
            )}

            {isLoanModalOpen && (
                <CreateLoanModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleLoanModal}
                />
            )}

            {isOtherpaymentModalOpen && (
                <CreateOtherpaymentModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleOtherpaymentModal}
                />
            )}

            {isTaxModalOpen && (
                <CreateTaxModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleTaxModal}
                />
            )}

            {isOvertimeModalOpen && (
                <CreateOvertimeModal
                    employee={{ ...employee, id: employeeId, name: employeeName }}
                    onClose={toggleOvertimeModal}
                />
            )}

            {isDeleteDialogOpen && selectedAllowance && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="allowance"
                    id={selectedAllowance._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}

            {isDeleteDialogOpen && selectedCommission && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="commission"
                    id={selectedCommission._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}

            {isDeleteDialogOpen && selectedLoan && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="loan"
                    id={selectedLoan._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}

            {isDeleteDialogOpen && selectedOtherPayment && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="otherpayment"
                    id={selectedOtherPayment._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}

            {isDeleteDialogOpen && selectedTax && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="tax"
                    id={selectedTax._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}



            {isDeleteDialogOpen && selectedOvertime && (
                <ConfirmationDialog
                    onClose={handleDeleteCancel}
                    deleteType="overtime"
                    id={selectedOvertime._id}
                    onDeleted={handleDeleteConfirmed}
                />
            )}
             
            </div>
    );
};

export default EmployeeSetSalary;

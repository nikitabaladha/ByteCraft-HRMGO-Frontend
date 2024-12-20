import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getAPI from "../../../../api/getAPI";


const EmployeeSetSalary = () => {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState(null);
    const [employeeName, setEmployeeName] = useState('');
    const [allowances, setAllowances] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [loans, setLoans] = useState([]);
    const [otherPayments, setOtherPayments] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [overtimes, setOvertimes] = useState([]);
    
 
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

    return (
        <div className="dash-content">
        <div className="row">
            {/* Employee Salary Section */}
            <div className="col-xl-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Employee Salary</h5>
                            </div>
                            <div className="col-1 text-end"></div>
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
                            <div className="col-1 text-end"></div>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Commission Section */}
            <div className="col-md-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Commission</h5>
                            </div>
                            <div className="col-1 text-end"></div>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Loan Deduction Section */}
            <div className="col-md-6">
                <div className="card set-card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-11">
                                <h5>Loan Deduction</h5>
                            </div>
                            <div className="col-1 text-end"></div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {loans.map((loan, index) => (
                                        <tr key={index}>
                                            <td>{loan.employeeName}</td>
                                            <td>{loan.title}</td>
                                            <td>{loan.type}</td>
                                            <td>{formatLoan(loan)}</td>
                                            <td>{`₹${new Intl.NumberFormat('en-IN').format(loan.amount)}`}</td>
                                        </tr>
                                    ))}
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
                            <h5>Tax Deduction</h5>
                        </div>
                        <div className="col-1 text-end"></div>
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
                                </tr>
                            </thead>
                            <tbody>
                                {taxes.map((tax, index) => (
                                    <tr key={index}>
                                        <td>{tax.employeeName}</td>
                                        <td>{tax.title}</td>
                                        <td>{tax.type}</td>
                                        <td>{formatTax(tax)}</td>
                                        <td>{`₹${new Intl.NumberFormat('en-IN').format(tax.amount)}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Other Deduction Section */}
        <div className="col-md-6">
            <div className="card set-card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-11">
                            <h5>Other Deduction</h5>
                        </div>
                        <div className="col-1 text-end"></div>
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
                                </tr>
                            </thead>
                            <tbody>
                                {otherPayments.map((deduction, index) => (
                                    <tr key={index}>
                                        <td>{deduction.employeeName}</td>
                                        <td>{deduction.title}</td>
                                        <td>{deduction.type}</td>
                                        <td>{formatOtherpayment(deduction)}</td>
                                        <td>{`₹${new Intl.NumberFormat('en-IN').format(deduction.amount)}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        {/* Overtime Section */}
        <div className="col-md-6">
            <div className="card set-card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-11">
                            <h5>Overtime</h5>
                        </div>
                        <div className="col-1 text-end"></div>
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default EmployeeSetSalary;

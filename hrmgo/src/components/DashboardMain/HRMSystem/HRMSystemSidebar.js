import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    const menuItems = [
        { path: '/dashboard/hrm-system-branch', label: 'Branch' },
        { path: '/dashboard/hrm-system-department', label: 'Department' },
        { path: '/dashboard/hrm-system-designation', label: 'Designation' },
        { path: '/dashboard/hrm-system-leavetype', label: 'Leave Type' },
        { path: '/dashboard/hrm-system-document', label: 'Document Type' },
        { path: '/dashboard/hrm-system-paysliptype', label: 'Payslip Type' },
        { path: '/dashboard/hrm-system-allowanceoption', label: 'Allowance Option' },
        { path: '/dashboard/hrm-system-loanoption', label: 'Loan Option' },
        { path: '/dashboard/hrm-system-deductionoption', label: 'Deduction Option' },
        { path: '/dashboard/hrm-system-trainingtype', label: 'Training Type' },
        { path: '/dashboard/hrm-system-awardtype', label: 'Award Type' },
        { path: '/dashboard/hrm-system-terminationtype', label: 'Termination Type' },
        { path: '/dashboard/hrm-system-job-category', label: 'Job Category' },
        { path: '/dashboard/hrm-system-job-stage', label: 'Job Stage' },
        { path: '/dashboard/hrm-system-performanceType', label: 'Performance Type' },
        { path: '/dashboard/hrm-system-expensetype', label: 'Expense Type' },
        { path: '/dashboard/hrm-system-incometype', label: 'Income Type' },
        { path: '/dashboard/hrm-system-paymenttype', label: 'Payment Type' },
        { path: '/dashboard/hrm-system-contract_type', label: 'Contract Type' },
    ];

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    return (
        <div className="card sticky-top" style={{ top: '30px' }}>
            <div className="list-group list-group-flush" id="useradd-sidenav">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`list-group-item list-group-item-action border-0${activeItem === item.path ? ' active' : ''}`}
                    >
                        {item.label}
                        <div className="float-end">
                              <IoIosArrowForward />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

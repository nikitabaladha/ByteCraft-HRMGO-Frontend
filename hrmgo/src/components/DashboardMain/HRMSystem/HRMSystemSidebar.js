import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
 
const Sidebar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const sidebarRef = useRef(null);
 
    useEffect(() => {
        setActiveItem(location.pathname);
 
        // Handle window resize to check if mobile view
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
 
        window.addEventListener('resize', handleResize);
 
        // Restore scroll position
        const savedScrollPosition = sessionStorage.getItem('sidebarScrollPosition');
        if (savedScrollPosition && sidebarRef.current) {
            sidebarRef.current.scrollLeft = parseInt(savedScrollPosition, 10);
        }
 
        return () => window.removeEventListener('resize', handleResize);
    }, [location]);
 
    // Save scroll position before unmounting
    const handleScroll = () => {
        if (sidebarRef.current) {
            sessionStorage.setItem('sidebarScrollPosition', sidebarRef.current.scrollLeft);
        }
    };
 
    const menuItems = [
        { path: '/dashboard/hrm-system-branch', label: 'Branch' },
        { path: '/dashboard/hrm-system-department', label: 'Department' },
        { path: '/dashboard/hrm-system-designation', label: 'Designation' },
        { path: '/dashboard/hrm-system-leavetype', label: 'Leave Type' },
        { path: '/dashboard/hrm-system-document', label: 'Document Type' },
        { path: '/dashboard/hrm-system-paysliptype', label: 'Payslip Type' },
        { path: '/dashboard/hrm-system-allowanceoption', label: 'Allowance Option' },
        { path: '/dashboard/hrm-system-loanoption', label: 'Loan Option' },
        { path: '/dashboard/hrm-system-deductionoption', label: 'Tax Deduction Option' },
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
 
    return (
        <div
            className="card sticky-top d-flex flex-column"
            style={{ top: '30px', width: '100%', overflowX: 'auto' }}
            ref={sidebarRef}
            onScroll={handleScroll}
        >
            <div className="list-group list-group-flush d-flex flex-row flex-md-column" id="useradd-sidenav">
                {menuItems.map((item, index) => (
                     <Link
                                           key={index}
                                           to={item.path}
                                           className={`list-group-item list-group-item-action border-0${activeItem === item.path ? ' active' : ''}`}
                                           style={{
                                               whiteSpace: 'nowrap',
                                               overflow: 'visible',
                                               flex: isMobile ? '1 1 auto' : '0 0 auto',
                                           }}
                                       >
                                           {item.label}
                                           <div className="float-end d-none d-md-block">
                                               <IoIosArrowForward />
                                           </div>
                                       </Link>
                ))}
            </div>
        </div>
    );
};
 
export default Sidebar;
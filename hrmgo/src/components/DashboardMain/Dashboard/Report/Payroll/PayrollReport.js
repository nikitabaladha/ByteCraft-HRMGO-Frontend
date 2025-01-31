import React, { useEffect, useState } from 'react';
import getAPI from "../../../../../api/getAPI.js";

const PayrollReport = ({ payrollData, branch, department, searchType, month ,selectedDate}) => {
  const [branchName, setBranchName] = useState('');
  const [departmentName, setDepartmentName] = useState('');


  useEffect(() => {
    console.log('Branch prop:', branch);
  
    const fetchBranchName = async () => {
      try {
        const response = await getAPI(`/branches/${branch}`, {}, true);
        if (!response.hasError && response.data.data) {
          setBranchName(response.data.data.branchName);
        } else {
          setBranchName('Branch not found');
        }
      } catch (error) {
        console.error("Error fetching branch name:", error);
        setBranchName('Error fetching branch');
      }
    };
  
    fetchBranchName();
  }, [branch]);

useEffect(() => {
  console.log('Department prop:', department);

  const fetchDepartmentName = async () => {
    try {
      const response = await getAPI(`/departments/${department}`, {}, true);
      if (!response.hasError && response.data.data) {
        setDepartmentName(response.data.data );
      } else {
        setDepartmentName('Department not found');
      }
    } catch (error) {
      console.error("Error fetching department name:", error);
      setDepartmentName('Error fetching department');
    }
  };

  fetchDepartmentName();
}, [department]);

  
  
  const totals = payrollData.reduce(
    (acc, item) => {
      acc.salary += item.salary || 0;
      acc.grandTotal += item.grandTotal || 0;
      acc.allowance += item.allowance || 0;
      acc.commission += item.commission || 0;
      acc.loan += item.loan || 0;
      acc.tax += item.tax || 0;
      acc.otherPayments += item.otherPayments || 0;
      acc.overtime += item.overtime || 0;
      return acc;
    },
    {
      salary: 0,
      grandTotal: 0,
      allowance: 0,
      commission: 0,
      loan: 0,
      tax: 0,
      otherPayments: 0,
      overtime: 0,
    }
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  };

  const formatDate = (date) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${months[monthIndex]}-${year}`;
  };

  const formatYear = (date) => {
    const year = date.getFullYear();
    return `${year}`;
  };

  let duration = '';
  if (searchType === "monthly") {
    const monthDate = new Date(month);
    duration = formatDate(monthDate);
  } else if (searchType === "yearly") {
    const yearDate = new Date(selectedDate);
    duration = formatYear(yearDate);
  }
  return (
    <div id="printableArea">
      <div className="row mt-3">
        <div className="col">
          <input
            type="hidden"
            value="All Branch Jan-2025 Monthly Payroll Report of All Department"
            id="filename"
          />
          <div className="card p-4 mb-4">
            <h6 className="report-text gray-text mb-0">Report :</h6>
            <h7 className="report-text mb-0">{searchType}</h7> 
          </div>
        </div>
        {branch && (
          <div className="col">
            <div className="card p-4 mb-4">
              <h6 className="report-text gray-text mb-0">Branch :</h6>
              <h7 className="report-text mb-0">{branchName}</h7>
            </div>
          </div>
        )}

   
        {department && (
          <div className="col">
            <div className="card p-4 mb-4">
              <h7 className="report-text gray-text mb-0">Department :</h7>
              <h6 className="report-text mb-0">{departmentName}</h6>
            </div>
          </div>
        )}

        <div className="col">
          <div className="card p-4 mb-4">
            <h6 className="report-text gray-text mb-0">Duration :</h6>
            <h7 className="report-text mb-0">{duration}</h7> 
          </div>
        </div>
      </div>

    
      <div className="row">
        {[
          { label: 'Total Basic Salary', value: totals.salary },
          { label: 'Total Net Salary', value: totals.grandTotal },
          { label: 'Total Allowance', value: totals.allowance },
          { label: 'Total Commission', value: totals.commission },
          { label: 'Total Loan Deduction', value: totals.loan },
          { label: 'Total Tax Deduction', value: totals.tax },
          { label: 'Total Other Deduction', value: totals.otherPayments },
          { label: 'Total Overtime', value: totals.overtime },
        ].map((item, index) => (
          <div
            key={index}
            className="col-xs-12 col-sm-12 col-md-4 col-lg-3 col-xl-3"
          >
            <div className="card p-4 mb-4">
              <h6 className="report-text gray-text mb-0">{item.label} :</h6>
              <h7 className="report-text mb-0">{formatCurrency(item.value)}</h7>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayrollReport;

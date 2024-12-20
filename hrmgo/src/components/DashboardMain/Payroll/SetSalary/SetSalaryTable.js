
import React, { useState, useEffect } from 'react';
import getAPI from "../../../../api/getAPI.js";
import { TiEyeOutline } from "react-icons/ti";
import { HiOutlinePencil } from "react-icons/hi";
import { Link } from 'react-router-dom';

const SetSalaryTable = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [employeeData, setEmployeeData] = useState([]);
    const [viewModeId] = useState(null);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const employeeResponse = await getAPI(`/employee-get-all`, {}, true);
                const employeeList = employeeResponse.data.data;

                const salaryList = await Promise.all(
                    employeeList.map(async (employee) => {
                        const salaryResponse = await getAPI(`/getemployeedatabyid/${employee._id}`, {}, true);
                        console.log(salaryResponse);
                        const salaryData = salaryResponse.data.data;
                        return {
                            employeeId: employee._id,
                            payrollType: salaryData?.salary.salaryType,
                            salary: salaryData?.salary.salary,
                            grandTotal: salaryData?.salary.grandTotal,  
                        };
                    })
                );
                console.log('Final salaryList:', salaryList);

                const mergedData = employeeList.map(employee => {
                    const salaryInfo = salaryList.find(salary => salary.employeeId === employee._id);
                    console.log(`Merging Employee ${employee._id}:`, salaryInfo);

                  
                    const netSalary = salaryInfo ? salaryInfo.salary + (salaryInfo.grandTotal || 0) : '';

                    return {
                        ...employee,
                        salary: salaryInfo ? salaryInfo.salary : '',
                        payrollType: salaryInfo ? salaryInfo.payrollType : '',
                        grandTotal: salaryInfo ? salaryInfo.grandTotal : '',
                        netSalary: netSalary,  
                    };
                });
                console.log('Merged Data:', mergedData);
                setEmployeeData(mergedData);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            }
        };

        fetchEmployeeData();
    }, []);

    const handleEntriesChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
    };

    return (
        <div className="dash-content">
            <div>
                <div className="dataTable-top">
                    <div className="dataTable-dropdown">
                        <label>
                            <select
                                className="dataTable-selector"
                                value={entriesPerPage}
                                onChange={handleEntriesChange}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                            </select>
                            entries per page
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-body">
                                <div className="table-responsive">
                                    {employeeData.length > 0 ? (
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Employee Id</th>
                                                    <th>Name</th>
                                                    {viewModeId === null && <th>Payroll Type</th>}
                                                    {viewModeId === null && <th>Salary</th>}
                                                    <th>Net Salary</th>
                                                    <th width="200px">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {employeeData
                                                    .slice(0, entriesPerPage)
                                                    .map((employee) => (
                                                        <tr key={employee._id}>
                                                            <td>
                                                                <Link
                                                                    className="btn btn-outline-primary"
                                                                >
                                                                    {employee.id}
                                                                </Link>
                                                            </td>
                                                            <td>{employee.name }</td>
                                                            <td>{employee.payrollType}</td>
                                                            <td>
                                                                {`₹${typeof employee.salary === 'number' ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(employee.salary) : '0.00'}`}
                                                            </td>

                                                            <td>
                                                                {`₹${typeof employee.netSalary === 'number' ? new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(employee.netSalary) : '0.00'}`}
                                                            </td>
                                                            <td className="Action">
                                                                <div className="action-btn bg-info me-2">
                                                                    <Link
                                                                        className="mx-3 btn btn-sm align-items-center"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-original-title="Edit"
                                                                        to={`/Dashboard/payroll/employee-set-salary/${employee._id}`}
                                                                    >
                                                                        <span className="text-white">
                                                                            <HiOutlinePencil />
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                                <span>
                                                                    <div className="action-btn bg-warning ms-2">
                                                                        <Link
                                                                            title="View"
                                                                            to={`/Dashboard/payroll/employee-set-salaryview/${employee._id}`}
                                                                        >
                                                                            <TiEyeOutline className="text-white" />
                                                                        </Link>
                                                                    </div>
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetSalaryTable;


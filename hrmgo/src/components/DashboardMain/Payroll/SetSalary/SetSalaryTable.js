
import React, { useState, useEffect } from 'react';
import getAPI from "../../../../api/getAPI.js";
import { TiEyeOutline } from "react-icons/ti";
import { HiOutlinePencil } from "react-icons/hi";
import { Link } from 'react-router-dom';

const SetSalaryTable = () => {
    const [employeeData, setEmployeeData] = useState([]);
    // const [viewModeId] = useState(null);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");



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


                    const netSalary = salaryInfo.grandTotal;
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

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    const filteredSalaries = employeeData.filter((salary) => {
        const searchTerm = searchQuery.toLowerCase();

        return (
            salary.name.toLowerCase().includes(searchTerm) ||
            salary.payrollType.toLowerCase().includes(searchTerm) ||
            salary.salary.toString().includes(searchTerm) ||
            salary.netSalary.toString().includes(searchTerm)
        );
    });

    const paginatedSalaries = filteredSalaries.slice(
        (currentPage - 1) * entriesPerPage,
        currentPage * entriesPerPage
    );





    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-header card-body table-border-style">
                        <div className="table-responsive">
                            <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                                <div className="dataTable-top">
                                    <div className="dataTable-dropdown">
                                        <label>
                                            <select
                                                className="dataTable-selector"
                                                value={entriesPerPage}
                                                onChange={handleEntriesPerPageChange}
                                            >
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                            </select>{" "}
                                            entries per page
                                        </label>
                                    </div>
                                    <div className="dataTable-search">
                                        <input
                                            className="dataTable-input"
                                            placeholder="Search..."
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="dataTable-container">
                                    <table className="table dataTable-table" id="pc-dt-simple">
                                        <thead>
                                            <tr>
                                                <th>Employee Id</th>
                                                <th>Name</th>
                                                <th>Payroll Type</th>
                                                <th>Salary</th>
                                                <th>Net Salary</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedSalaries
                                                .map((employee) => (
                                                    <tr key={employee._id}>
                                                        <td>
                                                            <Link
                                                                className="btn btn-outline-primary"
                                                            >
                                                                {employee.id}
                                                            </Link>
                                                        </td>
                                                        <td>{employee.name}</td>
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
                                </div>
                                <div className="dataTable-bottom">
                                    <div className="dataTable-info">
                                        Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredSalaries.length)}{" "}
                                        to {Math.min(currentPage * entriesPerPage, filteredSalaries.length)}{" "}
                                        of {filteredSalaries.length} entries
                                    </div>
                                    <nav className="dataTable-pagination">
                                        <ul
                                            className="dataTable-pagination-list"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                listStyleType: 'none',
                                                padding: 0,
                                                margin: 0,
                                            }}
                                        >
                                            {currentPage > 1 && (
                                                <li className="page-item" style={{ margin: '0 5px' }}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage - 1)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '8px 16px',
                                                            borderRadius: '4px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            color: '#6FD943',
                                                        }}
                                                    >
                                                        ‹
                                                    </button>
                                                </li>
                                            )}

                                            {Array.from({ length: Math.ceil(filteredSalaries.length / entriesPerPage) }, (_, index) => (
                                                <li
                                                    key={index + 1}
                                                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                                    style={{
                                                        margin: '0 5px',
                                                    }}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(index + 1)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '6px 12px',
                                                            backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                                                            border: 'none',
                                                            color: '#6FD943',
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}

                                            {currentPage < Math.ceil(filteredSalaries.length / entriesPerPage) && (
                                                <li className="page-item" style={{ margin: '0 5px' }}>
                                                    <button
                                                        className="page-link"
                                                        onClick={() => setCurrentPage(currentPage + 1)}
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '8px 16px',
                                                            borderRadius: '4px',
                                                            backgroundColor: 'transparent',
                                                            border: 'none',
                                                            color: '#6FD943',
                                                        }}
                                                    >
                                                        ›
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
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


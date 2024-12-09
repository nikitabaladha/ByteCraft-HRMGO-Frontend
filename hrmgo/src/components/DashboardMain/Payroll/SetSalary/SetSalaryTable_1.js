import React, { useState, useEffect } from 'react';
import getAPI from "../../../../api/getAPI.js";
import { TiEyeOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';  // Import Link

const SetSalaryTable = () => {
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await getAPI(`/SetSalary-get-all`, {}, true);
                setEmployeeData(response.data.data);
            } catch (error) {
                console.error('Error fetching payroll data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    // Filter employee data based on search query
    const filteredEmployeeData = employeeData.filter(employee =>
        employee?.employeeId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEntriesChange = (event) => {
        setEntriesPerPage(Number(event.target.value));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
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
                <div className="dataTable-search">
                    <input
                        className="dataTable-input"
                        placeholder="Search..."
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-body">
                            <div className="table-responsive">
                                {filteredEmployeeData.length > 0 ? (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Employee Id</th>
                                                <th>Name</th>
                                                <th>Payroll Type</th>
                                                <th>Salary</th>
                                                <th>Net Salary</th>
                                                <th width="200px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredEmployeeData
                                                .slice(0, entriesPerPage)
                                                .map((employee) => (
                                                    <tr key={employee._id}>
                                                        <td>
                                                            <Link
                                                                to={`SetSalary-get-all/${employee._id}`} // Use Link here
                                                                className="btn btn-outline-primary"
                                                            >
                                                                {employee.employeeId?.id || 'N/A'}
                                                            </Link>
                                                        </td>
                                                        <td>{employee.employeeId?.name || 'N/A'}</td>
                                                        <td>{employee.payrollType}</td>
                                                        <td>{`$${employee.salary.toFixed(2)}`}</td>
                                                        <td>{`$${employee.netSalary.toFixed(2)}`}</td>
                                                        <td className="Action">
                                                            <span>
                                                                <div className="action-btn bg-warning ms-2">
                                                                    <Link
                                                                        to={`SetSalary-get-all/${employee._id}`} // Use Link here
                                                                        className="mx-3 btn btn-sm align-items-center"
                                                                        data-bs-toggle="tooltip"
                                                                        title="View"
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
                                ) : (
                                    <div>No data available.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetSalaryTable;

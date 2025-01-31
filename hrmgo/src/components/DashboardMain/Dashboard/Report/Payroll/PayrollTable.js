import React, { useState } from 'react';

const PayrollReportTable = ({ payrollData }) => {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPayrollData = payrollData.filter((payroll) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(payroll.Date).toLocaleDateString("en-CA");
    const salary = payroll.salary.toString();
    const grandTotal = payroll.grandTotal.toString();
  
    return (
      payroll.employeeName.toLowerCase().includes(searchTerm) ||
      salary.includes(searchTerm) ||
      grandTotal.includes(searchTerm) ||
      formattedDate.includes(searchTerm)
    );
  });
  

  const paginatedPayrollData = filteredPayrollData.slice(
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
                  <table className="table datatable mb-0 dataTable-table" id="report-dataTable">
                    <thead>
                      <tr>
                        <th><span className="dataTable-sorter">Employee ID</span></th>
                        <th><span className="dataTable-sorter">Employee</span></th>
                        <th><span className="dataTable-sorter">Salary</span></th>
                        <th><span className="dataTable-sorter">Net Salary</span></th>
                        <th><span className="dataTable-sorter">Month</span></th>
                        <th><span className="dataTable-sorter">Status</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayrollData.map((item) => (
                        <tr key={item.employee_id}>
                          <td><span className="btn btn-outline-primary">#{item.employeeId}</span></td>
                          <td>{item.employeeName}</td>
                          <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.salary)}</td>
                          <td>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.grandTotal)}</td>
                          <td>{new Date(item.Date).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' })}</td>
                          <td>
                            <div className={`badge ${item.status === 'unpaid' ? 'bg-danger' : 'bg-success'} p-2 px-3`} style={{ width: "69px" }}>
                              <span className="text-white">{item.status}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, payrollData.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, payrollData.length)}{" "}
                    of {payrollData.length} entries
                  </div>
                  <nav className="dataTable-pagination">
                    <ul className="dataTable-pagination-list">
                      {currentPage > 1 && (
                        <li className="page-item">
                          <button
                            className="page-link prev-button"
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            ‹
                          </button>
                        </li>
                      )}

                      {Array.from({ length: Math.ceil(payrollData.length / entriesPerPage) }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                            style={{
                              backgroundColor: currentPage === index + 1 ? '#d9d9d9' : 'transparent',
                              color: '#6FD943',
                            }}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}

                      {currentPage < Math.ceil(payrollData.length / entriesPerPage) && (
                        <li className="page-item">
                          <button
                            className="page-link next-button"
                            onClick={() => setCurrentPage(currentPage + 1)}
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

export default PayrollReportTable;

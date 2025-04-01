import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const EmailTemplatesMainContent = () => {
  const templates = [
    { id: 1, name: "New User", path: "/dashboard/email-templates/new-user" },
    {
      id: 2,
      name: "New Employee",
      path: "/dashboard/email-templates/new-employee",
    },
    {
      id: 3,
      name: "New Payroll",
      path: "/dashboard/email-templates/new-payroll",
    },
    {
      id: 4,
      name: "New Ticket",
      path: "/dashboard/email-templates/new-ticket",
    },
    { id: 5, name: "New Award", path: "/dashboard/email-templates/new-award" },
    // {
    //   id: 6,
    //   name: "Employee Transfer",
    //   path: "/dashboard/email-templates/employee-transfer",
    // },
    {
      id: 6,
      name: "Employee Resignation",
      path: "/dashboard/email-templates/employee-resignation",
    },
    {
      id: 7,
      name: "Employee Promotion",
      path: "/dashboard/email-templates/employee-promotion",
    },
    {
      id: 8,
      name: "Employee Complaints",
      path: "/dashboard/email-templates/employee-complaints",
    },
    {
      id: 9,
      name: "Employee Warning",
      path: "/dashboard/email-templates/employee-warning",
    },
    {
      id: 10,
      name: "Employee Termination",
      path: "/dashboard/email-templates/employee-termination",
    },
    {
      id: 11,
      name: "Leave Status",
      path: "/dashboard/email-templates/leave-status",
    },
    { id: 12, name: "Contract", path: "/dashboard/email-templates/contract" },
  ];

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredEmployeeData = templates.filter((template) => {
    const searchTerm = searchQuery.toLowerCase();

    return template.name.toLowerCase().includes(searchTerm);
  });

  const paginatedEmployeeData = filteredEmployeeData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="dataTable-top">
            <div className="dataTable-dropdown d-none d-md-block">
              <label className="text-dark">
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
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                <div className="dataTable-container">
                  <table className="table dataTable-table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th scope="col" className="sort" data-sort="name">
                          <Link href="#" className="dataTable-sorter">
                            Name
                          </Link>
                        </th>
                        <th className="text-end">
                          <Link href="#" className="dataTable-sorter">
                            Action
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedEmployeeData.map((template, index) => (
                        <tr key={template.id}>
                          <td>{template.name}</td>
                          <td>
                            <div className="text-end">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-warning">
                                    <Link
                                      to={template.path}
                                      className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                      data-bs-toggle="tooltip"
                                      data-bs-original-title="View"
                                    >
                                      <span className="text-white">
                                        <i className="ti ti-eye"></i>
                                      </span>
                                    </Link>
                                  </div>
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="dataTable-bottom ">
              <div className="dataTable-info d-none d-md-block text-dark">
                Showing{" "}
                {Math.min(
                  (currentPage - 1) * entriesPerPage + 1,
                  templates.length
                )}{" "}
                to {Math.min(currentPage * entriesPerPage, templates.length)} of{" "}
                {templates.length} entries
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

                  {Array.from(
                    {
                      length: Math.ceil(templates.length / entriesPerPage),
                    },
                    (_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                          style={{
                            backgroundColor:
                              currentPage === index + 1
                                ? "#d9d9d9"
                                : "transparent",
                            color: "#6FD943",
                          }}
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}

                  {currentPage <
                    Math.ceil(templates.length / entriesPerPage) && (
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
  );
};

export default EmailTemplatesMainContent;

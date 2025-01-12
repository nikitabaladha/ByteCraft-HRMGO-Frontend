import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";
import EditRole from "./EditRole";

const RoleMainContent = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredTrainers = roles.filter((role) => {
    const searchTerm = searchQuery.toLowerCase();
    return role.name.toLowerCase().includes(searchTerm);
  });

  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openDeleteDialog = (role) => {
    setSelectedTrainee(role);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTrainee(null);
  };

  const handleDeleteConfirmed = (_id) => {
    setRoles((prevApp) => prevApp.filter((role) => role._id !== _id));
  };

  useEffect(() => {
    // Fetch roles from the API
    const fetchRoles = async () => {
      try {
        const response = await getAPI("/get-all-roles");
        setRoles(response.data.roles);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Failed to load roles.");
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const handleEdit = (role) => {
    setSelectedTrainee(role);
    setIsModalOpen(true);
  };

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
                        <th style={{ width: "13.1766%" }}>
                          <Link to="#" className="dataTable-sorter">
                            Role
                          </Link>
                        </th>
                        <th style={{ width: "63.0342%" }}>
                          <Link to="#" className="dataTable-sorter">
                            Permissions
                          </Link>
                        </th>
                        <th width="200px" style={{ width: "23.7417%" }}>
                          <Link to="#" className="dataTable-sorter">
                            Action
                          </Link>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTrainers.length > 0 ? (
                        paginatedTrainers.map((role, index) => (
                          <tr key={index}>
                            <td>{role.name}</td>
                            <td style={{ whiteSpace: "inherit" }}>
                              {role.permissions.map((permission, i) =>
                                permission.actions.map((action, j) => (
                                  <span
                                    key={`${i}-${j}`}
                                    className="badge p-2 m-1 px-3 bg-primary"
                                  >
                                    <span className="text-white">
                                      {action} {permission.module}
                                    </span>
                                  </span>
                                ))
                              )}
                            </td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <div className="action-btn bg-info me-2">
                                  <Link
                                    className="mx-3 btn btn-sm align-items-center"
                                    to="#"
                                    data-url={`https://demo.workdo.io/hrmgo/roles/$
                                    {index + 9}/edit`}
                                    data-ajax-popup="true"
                                    data-size="lg"
                                    data-bs-toggle="tooltip"
                                    onClick={() => handleEdit(role)}
                                    title="Edit Role"
                                  >
                                    <span className="text-white">
                                      <TbPencil />
                                    </span>
                                  </Link>
                                </div>
                                <div className="action-btn bg-danger">
                                  <button
                                    className="btn btn-sm text-white"
                                    title="Delete"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openDeleteDialog(role);
                                    }}
                                  >
                                    <FaRegTrashAlt />
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">
                            No Permission available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="dataTable-bottom">
                  <div className="dataTable-info">
                    Showing {" "}
                    {Math.min(
                      (currentPage - 1) * entriesPerPage + 1,
                      roles.length
                    )} {" "}
                    to {" "}
                    {Math.min(
                      currentPage * entriesPerPage,
                      roles.length
                    )} {" "}
                    of {roles.length} entries
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
                          length: Math.ceil(roles.length / entriesPerPage),
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
                        Math.ceil(roles.length / entriesPerPage) && (
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="role"
          id={selectedTrainee._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

{isModalOpen && selectedTrainee && (
        <EditRole
          role={selectedTrainee}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default RoleMainContent;

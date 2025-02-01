import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import { HiOutlinePencil } from "react-icons/hi";
import ConfirmationDialog from "../ConfirmationDialog";
import { RiDeleteBinLine } from "react-icons/ri";
import EditCompanyPolicy from "./EditCompanyPolicy";

const CompanyPolicy = () => {
  const [companyPolicies, setCompanyPolicies] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = (policy = null) => {
    setSelectedPolicy(policy);
    setModalOpen(!isModalOpen);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedPolicy(null);
  };

  const handleDeleteConfirmed = (id) => {
    setCompanyPolicies((prevPolicies) =>
      prevPolicies.filter((policy) => policy._id !== id)
    );
  };

  const openDeleteDialog = (policy) => {
    setSelectedPolicy(policy);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    const fetchCompanyPolicies = async () => {
      try {
        const response = await getAPI('/getallcompany_policy', {}, true);
        if (response.data && !response.data.hasError) {
          setCompanyPolicies(response.data.companyPolicies);
        } else {
          toast.error("Failed to fetch company policies.");
        }
      } catch (error) {
        console.error("Error fetching company policies:", error);
        toast.error("An error occurred while fetching company policies.");
      }
    };

    fetchCompanyPolicies();
  }, []);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPolicies = companyPolicies.filter((policy) =>
    (policy.title && policy.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (policy.branch && policy.branch.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (policy.description && policy.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  return (
    <div className="dash-content">
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
                          onChange={handleEntriesPerPageChange}>
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
                      <input className="dataTable-input"
                        placeholder="Search..." type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  </div>
                  <div className="dataTable-container">
                    <table className="table dataTable-table" id="pc-dt-simple">
                      <thead>
                        <tr>
                          <th style={{ width: "22%", color: "black" }}>Branch</th>
                          <th style={{ width: "30%", color: "black" }}>Title</th>
                          <th style={{ width: "30%", color: "black" }}>Description</th>
                          <th style={{ width: "20%", color: "black" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedPolicies.map((policy) => (
                          <tr key={policy._id}>
                            <td>{policy.branch}</td>
                            <td>{policy.title}</td>
                            <td>{policy.description}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      onClick={() => toggleModal(policy)}
                                      data-size="lg"
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title="Edit Company Policy"
                                      data-bs-original-title="Edit"
                                    >
                                      <span className="text-white">  <HiOutlinePencil /></span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDeleteDialog(policy);
                                      }}
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <span className="text-white">
                                        <RiDeleteBinLine />
                                      </span>
                                    </button>
                                  </div>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing {Math.min((currentPage - 1) * entriesPerPage + 1, filteredPolicies.length)}{" "}
                      to {Math.min(currentPage * entriesPerPage, filteredPolicies.length)}{" "}
                      of {filteredPolicies.length} entries
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
                          <li
                            className="page-item"
                            style={{
                              margin: '0 5px',
                            }}
                          >
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

                        {Array.from({ length: Math.ceil(filteredPolicies.length / entriesPerPage) }, (_, index) => (
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

                        {currentPage < Math.ceil(filteredPolicies.length / entriesPerPage) && (
                          <li
                            className="page-item"
                            style={{
                              margin: '0 5px',
                            }}
                          >
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
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="Companypolicy"
          id={selectedPolicy._id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {isModalOpen && <EditCompanyPolicy policy={selectedPolicy} onClose={toggleModal} />}
    </div>
  );
};

export default CompanyPolicy;

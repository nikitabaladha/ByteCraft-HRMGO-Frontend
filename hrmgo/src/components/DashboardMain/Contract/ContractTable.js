import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbCopy } from "react-icons/tb";
import { TiEyeOutline } from "react-icons/ti";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmationDialog from "../ConfirmationDialog";
import UpdateContractModal from "./UpdateContractModal";
import CopyContractModal from "./CopyContractModal";
import { formatDate, formatCost } from "../../../js/custom";

const ContractTable = ({
  contracts,
  selectedContract,
  setSelectedContract,
  setContracts,
  updateContract,
  addContract,
  copyContract,
}) => {
  const navigate = useNavigate();

  const navigateToContractDetail = (event, contract) => {
    event.preventDefault();
    navigate(`/dashboard/contract/${contract.id}`, { state: contract });
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedContract(null);
  };

  const handleDeleteConfirmed = (id, data) => {
    addContract({ ...data, contracts: data.data });
  };

  const openDeleteDialog = (contract) => {
    setSelectedContract(contract);
    setIsDeleteDialogOpen(true);
  };

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  // const [selectedContract, setSelectedContract] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedContract, setCopiedContract] = useState(null);

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredContracts = contracts.filter((contract) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(contract.startDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    const endDate = new Date(contract.endDate)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .toLowerCase();
    return (
      contract.employeeName.toLowerCase().includes(searchTerm) ||
      contract.subject.toLowerCase().includes(searchTerm) ||
      contract.contractType.toLowerCase().includes(searchTerm) ||
      contract.status.toLowerCase().includes(searchTerm) ||
      contract.value.toLowerCase().includes(searchTerm) ||
      formattedDate.includes(searchTerm) ||
      endDate.includes(searchTerm)
    );
  });

  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleUpdate = (event, contract) => {
    event.preventDefault();
    console.log("contract from handleUpdate function", contract);
    setSelectedContract(contract);
    setIsUpdateModalOpen(true);
  };

  const handleCopyContract = (event, contract) => {
    event.preventDefault();
    setSelectedContract(contract);
    setIsCopyModalOpen(true);
  };

  const statusColors = {
    Accept: "bg-primary",
    Decline: "bg-danger",
    Pending: "bg-warning",
  };

  return (
    <>
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
                          <th width="60px">#</th>
                          <th>Employee Name</th>
                          <th>Subject</th>
                          <th>Value</th>
                          <th>Type</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th width="250px">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedContracts.map((contract, index) => (
                          <tr key={contract.id}>
                            <td className="id">
                              <Link className="btn btn-outline-primary">
                                {contract.contractId}
                              </Link>
                            </td>
                            <td>{contract.employeeName}</td>
                            <td>{contract.subject}</td>

                            <td> {formatCost(contract.value)}</td>
                            <td>{contract.contractType}</td>
                            <td>{formatDate(contract.startDate)}</td>
                            <td>{formatDate(contract.endDate)}</td>
                            <td>
                              <span
                                className={`status_badge badge ${
                                  statusColors[contract.status]
                                } p-2 px-3`}
                              >
                                {contract.status}
                              </span>
                            </td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-primary me-2">
                                    <Link
                                      className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Duplicate"
                                      onClick={(e) =>
                                        handleCopyContract(e, contract)
                                      }
                                    >
                                      <span className="text-white">
                                        <TbCopy />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-warning me-2">
                                    <Link
                                      className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="View"
                                      onClick={(e) =>
                                        navigateToContractDetail(e, contract)
                                      }
                                    >
                                      <span className="text-white">
                                        <TiEyeOutline />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Edit"
                                      onClick={(e) => handleUpdate(e, contract)}
                                    >
                                      <span className="text-white">
                                        <TbPencil />
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <Link
                                      className="mx-3 btn btn-sm d-inline-flex align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title="Delete"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        openDeleteDialog(contract);
                                      }}
                                    >
                                      <span className="text-white">
                                        <FaRegTrashAlt />
                                      </span>
                                    </Link>
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
                      Showing{" "}
                      {Math.min(
                        (currentPage - 1) * entriesPerPage + 1,
                        contracts.length
                      )}{" "}
                      to{" "}
                      {Math.min(currentPage * entriesPerPage, contracts.length)}{" "}
                      of {contracts.length} entries
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
                            length: Math.ceil(
                              contracts.length / entriesPerPage
                            ),
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
                          Math.ceil(contracts.length / entriesPerPage) && (
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

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="contract"
          id={selectedContract.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateContractModal
          contract={selectedContract}
          onClose={() => setIsUpdateModalOpen(false)}
          updateContract={updateContract}
        />
      )}

      {isCopyModalOpen && (
        <CopyContractModal
          contracts={selectedContract}
          onClose={() => setIsCopyModalOpen(false)}
          onCopied={(newContract) => {
            setCopiedContract(newContract);
            setIsCopyModalOpen(false);
          }}
          copyContract={copyContract}
        />
      )}
    </>
  );
};

export default ContractTable;

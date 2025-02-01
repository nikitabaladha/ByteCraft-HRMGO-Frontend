import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditContractTypeModal from "./EditContractTypeModal";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";

const ContractTypeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContractType, setSelectedContractType] = useState(null);
  const [contractTypes, setContractTypes] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contractTypeToDelete, setContractTypeToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredContractTypes = contractTypes.filter((contractType) => {
    const searchTerm = searchQuery.toLowerCase();
    return contractType.contractName.toLowerCase().includes(searchTerm);
  });

  const paginatedContractTypes = filteredContractTypes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const openDeleteDialog = (contractTypeId) => {
    setContractTypeToDelete(contractTypeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setContractTypeToDelete(null);
  };

  const handleDeleteSuccess = (deletedContractTypeId) => {
    setContractTypes((prevContractTypes) =>
      prevContractTypes.filter(
        (contractType) => contractType._id !== deletedContractTypeId
      )
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchContractTypes = async () => {
      try {
        const response = await getAPI("/contract-type-get-all", true);
        if (!response.hasError) {
          setContractTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch contract types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching contract types.");
      }
    };

    fetchContractTypes();
  }, []);

  const handleEdit = (contractType) => {
    setSelectedContractType(contractType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContractType(null);
  };

  return (
    <div className="row">
      <div className="col-3">
        <Sidebar />
      </div>

      <div className="col-9">
        <div className="card">
          <div className="card-body table-border-style">
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
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th data-sortable="">Contract Type</th>
                        <th width="200px" data-sortable="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedContractTypes.map((contractType) => (
                        <tr key={contractType._id}>
                          <td>{contractType.contractName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(contractType)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form method="POST" action={`/hrmgo/contract-type`} acceptCharset="UTF-8" id={`delete-form`}>
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                                    <Link
                                      onClick={() => openDeleteDialog(contractType._id)}
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete"
                                    >
                                      <span className="text-white">
                                        <RiDeleteBinLine />
                                      </span>
                                    </Link>
                                  </form>
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, contractTypes.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, contractTypes.length)}{" "}
                    of {contractTypes.length} entries
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

                      {Array.from({ length: Math.ceil(contractTypes.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(contractTypes.length / entriesPerPage) && (
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

      {isModalOpen && (
        <EditContractTypeModal
          closeModal={handleCloseModal}
          contractType={selectedContractType}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={contractTypeToDelete}
          deleteType="contractType"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default ContractTypeTable;

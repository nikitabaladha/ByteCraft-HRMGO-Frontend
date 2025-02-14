import React, { useState, useEffect } from "react";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import EditDocumentTypeModal from "./EditDocumentTypeModal";
import ConfirmationDialog from "../../ConfirmationDialog";
import getAPI from "../../../../api/getAPI";

const DocumentTypeTable = () => {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentTypeToDelete, setDocumentTypeToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredDocumentTypes = documentTypes.filter((documentType) => {
    const searchTerm = searchQuery.toLowerCase();
    return (documentType.documentType.toLowerCase().includes(searchTerm))||
            documentType.isRequired.toLowerCase().includes(searchTerm);
  });

  const paginatedDocumentTypes = filteredDocumentTypes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await getAPI("/document-type-get-all", true);
        if (!response.hasError) {
          setDocumentTypes(response.data.data);
         
        } else {
          toast.error(`Failed to fetch document types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching document types.");
      }
    };

    fetchDocumentTypes();
  }, []);





  const openDeleteDialog = (documentTypeId) => {
    setDocumentTypeToDelete(documentTypeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDocumentTypeToDelete(null);
  };

  const handleDeleteSuccess = (deletedDocumentTypeId) => {
    setDocumentTypes((prevDocumentTypes) =>
      prevDocumentTypes.filter((documentType) => documentType._id !== deletedDocumentTypeId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (documentType) => {
    setSelectedDocumentType(documentType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocumentType(null);
  };

  // const startIndex = 0;
  // const endIndex = entriesPerPage;
  // const paginatedData = filteredDocumentTypes.slice(startIndex, endIndex);

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
                  <table className="table dataTable-table">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Required Field</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDocumentTypes.map((documentType) => (
                        <tr key={documentType._id}>
                          <td>{documentType.documentType}</td>
                          <td>
                            <div
                              className={`badge p-2 px-3 ${documentType.isRequired === "Required" ? "bg-success" : "bg-danger"
                                } status-badge7`}
                            >
                              {documentType.isRequired === "Required" ? "Required" : "Not Required"}
                            </div>
                          </td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(documentType)}
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => openDeleteDialog(documentType._id)}
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, documentTypes.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, documentTypes.length)}{" "}
                    of {documentTypes.length} entries
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

                      {Array.from({ length: Math.ceil(documentTypes.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(documentTypes.length / entriesPerPage) && (
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
        <EditDocumentTypeModal
          closeModal={handleCloseModal}
          documentType={selectedDocumentType}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={documentTypeToDelete}
          deleteType="documenttype"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default DocumentTypeTable;

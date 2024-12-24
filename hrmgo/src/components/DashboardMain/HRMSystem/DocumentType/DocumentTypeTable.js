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
  const [filteredDocumentTypes, setFilteredDocumentTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [documentTypeToDelete, setDocumentTypeToDelete] = useState(null);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await getAPI("/document-type-get-all", true);
        if (!response.hasError) {
          setDocumentTypes(response.data.data);
          setFilteredDocumentTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch document types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching document types.");
      }
    };

    fetchDocumentTypes();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = documentTypes.filter((doc) =>
      doc.documentType.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDocumentTypes(filtered);
  };

  const handleEntriesPerPageChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
  };

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
    setFilteredDocumentTypes((prevDocumentTypes) =>
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

  const startIndex = 0;
  const endIndex = entriesPerPage;
  const paginatedData = filteredDocumentTypes.slice(startIndex, endIndex);

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
                      value={searchTerm}
                      onChange={handleSearch}
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
                      {paginatedData.map((documentType) => (
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
                    Showing 1 to {paginatedData.length} of {filteredDocumentTypes.length} entries
                  </div>
                  <nav className="dataTable-pagination">
                    <ul className="dataTable-pagination-list"></ul>
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

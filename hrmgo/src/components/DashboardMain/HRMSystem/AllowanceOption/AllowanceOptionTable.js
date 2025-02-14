import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditAllowanceOptionModal from "./EditAllowanceOptionModal";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";

const AllowanceOptionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAllowanceOption, setSelectedAllowanceOption] = useState(null);
  const [allowanceOptions, setAllowanceOptions] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [allowanceOptionToDelete, setAllowanceOptionToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredAllowanceOptions = allowanceOptions.filter((allowanceOption) => {
    const searchTerm = searchQuery.toLowerCase();
    return allowanceOption.allowanceName.toLowerCase().includes(searchTerm);
  });

  const paginatedAllowanceOptions = filteredAllowanceOptions.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const openDeleteDialog = (allowanceOptionId) => {
    console.log("Deleting allowance option with ID:", allowanceOptionId);
    setAllowanceOptionToDelete(allowanceOptionId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setAllowanceOptionToDelete(null);
  };

  const handleDeleteSuccess = (deletedAllowanceOptionId) => {
    setAllowanceOptions((prevAllowanceOptions) =>
      prevAllowanceOptions.filter(
        (allowanceOption) => allowanceOption._id !== deletedAllowanceOptionId
      )
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchAllowanceOptions = async () => {
      try {
        const response = await getAPI("/allowance-option-get-all", true);
        if (!response.hasError) {
          setAllowanceOptions(response.data.data);
        } else {
          toast.error(`Failed to fetch allowance options: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching allowance options.");
      }
    };

    fetchAllowanceOptions();
  }, []);

  const handleEdit = (allowanceOption) => {
    setSelectedAllowanceOption(allowanceOption);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAllowanceOption(null);
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
                        <th data-sortable="">Allowance Option</th>
                        <th width="200px" data-sortable="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAllowanceOptions.map((allowanceOption) => (
                        <tr key={allowanceOption._id}>
                          <td>{allowanceOption.allowanceName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(allowanceOption)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form method="POST" action={`/hrmgo/allowance-option`} acceptCharset="UTF-8" id={`delete-form`}>
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                                    <Link
                                      onClick={() => openDeleteDialog(allowanceOption._id)}
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, allowanceOptions.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, allowanceOptions.length)}{" "}
                    of {allowanceOptions.length} entries
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

                      {Array.from({ length: Math.ceil(allowanceOptions.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(allowanceOptions.length / entriesPerPage) && (
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
        <EditAllowanceOptionModal
          closeModal={handleCloseModal}
          allowanceOption={selectedAllowanceOption}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={allowanceOptionToDelete}
          deleteType="allowanceOption"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default AllowanceOptionTable;

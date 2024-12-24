import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditLoanOptionModal from "./EditLoanOptionModal";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";

const LoanOptionTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanOption, setSelectedLoanOption] = useState(null);
  const [loanOptions, setLoanOptions] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loanOptionToDelete, setLoanOptionToDelete] = useState(null);

  const openDeleteDialog = (loanOptionId) => {
    setLoanOptionToDelete(loanOptionId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setLoanOptionToDelete(null);
  };

  const handleDeleteSuccess = (deletedLoanOptionId) => {
    setLoanOptions((prevLoanOptions) =>
      prevLoanOptions.filter((loanOption) => loanOption._id !== deletedLoanOptionId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchLoanOptions = async () => {
      try {
        const response = await getAPI("/loan-option-get-all", true);
        if (!response.hasError) {
          setLoanOptions(response.data.data);
        } else {
          toast.error(`Failed to fetch loan options: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching loan options.");
      }
    };

    fetchLoanOptions();
  }, []);

  const handleEdit = (loanOption) => {
    setSelectedLoanOption(loanOption);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoanOption(null);
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
                      <select className="dataTable-selector">
                        <option value="5">5</option>
                        <option value="10" selected="">
                          10
                        </option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                      </select>{" "}
                      entries per page
                    </label>
                  </div>
                  <div className="dataTable-search">
                    <input className="dataTable-input" placeholder="Search..." type="text" />
                  </div>
                </div>
                <div className="dataTable-container">
                  <table className="table datatable dataTable-table">
                    <thead>
                      <tr>
                        <th data-sortable="">Loan Option</th>
                        <th width="200px" data-sortable="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanOptions.map((loanOption) => (
                        <tr key={loanOption._id}>
                          <td>{loanOption.loanName}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(loanOption)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form method="POST" action={`/hrmgo/loan-option`} acceptCharset="UTF-8" id={`delete-form`}>
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                                    <Link
                                      onClick={() => openDeleteDialog(loanOption._id)}
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
                    Showing 1 to {loanOptions.length} of {loanOptions.length} entries
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
        <EditLoanOptionModal
          closeModal={handleCloseModal}
          loanOption={selectedLoanOption}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={loanOptionToDelete}
          deleteType="loanOption"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default LoanOptionTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../HRMSystemSidebar";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditPayslipTypeModal from "./EditPayslipTypeModal";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../ConfirmationDialog";

const PayslipTypeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayslipType, setSelectedPayslipType] = useState(null);
  const [payslipTypes, setPayslipTypes] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payslipTypeToDelete, setPayslipTypeToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPayslipTypes = payslipTypes.filter((payslipType) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      payslipType.payslipType.toLowerCase().includes(searchTerm)
    );
  });

  const paginatedPayslipTypes = filteredPayslipTypes.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );




  const openDeleteDialog = (payslipTypeId) => {
    setPayslipTypeToDelete(payslipTypeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPayslipTypeToDelete(null);
  };

  const handleDeleteSuccess = (deletedPayslipTypeId) => {
    setPayslipTypes((prevPayslipTypes) =>
      prevPayslipTypes.filter((payslipType) => payslipType._id !== deletedPayslipTypeId)
    );
    closeDeleteDialog();
  };

  useEffect(() => {
    const fetchPayslipTypes = async () => {
      try {
        const response = await getAPI("/payslip-type-get-all", true);
        if (!response.hasError) {
          setPayslipTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch payslip types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching payslip types.");
      }
    };

    fetchPayslipTypes();
  }, []);

  const handleEdit = (payslipType) => {
    setSelectedPayslipType(payslipType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayslipType(null);
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
                        <th data-sortable="">Payslip Type</th>
                        <th width="200px" data-sortable="">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayslipTypes.map((payslipType) => (
                        <tr key={payslipType._id}>
                          <td>{payslipType.payslipType}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    className="mx-3 btn btn-sm align-items-center"
                                    onClick={() => handleEdit(payslipType)}
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <form method="POST" action={`/hrmgo/payslip-type`} acceptCharset="UTF-8" id={`delete-form`}>
                                    <input name="_method" type="hidden" value="DELETE" />
                                    <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                                    <Link
                                      onClick={() => openDeleteDialog(payslipType._id)}
                                      className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                      data-bs-toggle="tooltip"
                                      title="Delete">
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, payslipTypes.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, payslipTypes.length)}{" "}
                    of {payslipTypes.length} entries
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

                      {Array.from({ length: Math.ceil(payslipTypes.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(payslipTypes.length / entriesPerPage) && (
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
        <EditPayslipTypeModal
          closeModal={handleCloseModal}
          payslipType={selectedPayslipType}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={payslipTypeToDelete}
          deleteType="paysliptype"
          onDeleted={handleDeleteSuccess}
        />
      )}

    </div>
  );
};

export default PayslipTypeTable;

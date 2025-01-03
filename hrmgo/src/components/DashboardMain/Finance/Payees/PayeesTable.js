import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditPayeeModal from "./EditPayeeModal";
import ConfirmationDialog from "../../ConfirmationDialog";
import getAPI from "../../../../api/getAPI";
import { ToastContainer } from "react-toastify";

const PayeesTable = () => {
  const [payees, setPayees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState(null);


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payeeToDelete, setPayeeToDelete] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredPayees = payees.filter((payee) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      payee.payee_name.toLowerCase().includes(searchTerm) ||
      payee.contact_number.toString().toLowerCase().includes(searchTerm) 
    
    );
  });

  const paginatedPayees = filteredPayees.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  useEffect(() => {
    const fetchPayees = async () => {
      try {
        const response = await getAPI(`/getall_Payee`, {}, true);
        setPayees(response.data.data);
      } catch (err) {
        console.log("Failed to fetch payees");
      }
    };

    fetchPayees();
  }, []);

  const openModal = (payee) => {
    setSelectedPayee(payee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayee(null);
  };

  const openDeleteDialog = (payeeId) => {
    setPayeeToDelete(payeeId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPayeeToDelete(null);
  };

  const handleDeleteSuccess = (deletedPayeeId) => {
    setPayees((prevPayees) =>
      prevPayees.filter((payee) => payee._id !== deletedPayeeId)
    );
    closeDeleteDialog();
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
                        <th>Payee Name</th>
                        <th>Contact Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedPayees.map((payee) => (
                        <tr key={payee._id}>
                          <td>{payee.payee_name}</td>
                          <td>{payee.contact_number}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => openModal(payee)}
                                    className="mx-3 btn btn-sm align-items-center"
                                    data-bs-toggle="tooltip"
                                    title="Edit"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>
                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() => openDeleteDialog(payee._id)}
                                    type="submit"
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, payees.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, payees.length)}{" "}
                    of {payees.length} entries
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

                      {Array.from({ length: Math.ceil(payees.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(payees.length / entriesPerPage) && (
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
        <EditPayeeModal payee={selectedPayee} closeModal={closeModal} />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={payeeToDelete}
          deleteType="payee"
          onDeleted={handleDeleteSuccess}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default PayeesTable;

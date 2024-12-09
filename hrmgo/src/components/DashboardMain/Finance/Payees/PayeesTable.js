import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditPayeeModal from "./EditPayeeModal";
import ConfirmationDialog from "./ConfirmationDialog";
import getAPI from "../../../../api/getAPI";
import { toast, ToastContainer } from "react-toastify";

const PayeesTable = () => {
  const [payees, setPayees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payeeToDelete, setPayeeToDelete] = useState(null);

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        const response = await getAPI(`/getall_Payee`, {}, true);
        setPayees(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payees");
        setLoading(false);
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

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalEntries = payees.length;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPagePayees = payees.slice(startIndex, startIndex + entriesPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
                          onChange={handleEntriesChange}
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
                        {currentPagePayees.map((payee) => (
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
                      Showing {Math.min(entriesPerPage, totalEntries - startIndex)} of {totalEntries} entries
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
      </div>

      {isModalOpen && (
        <EditPayeeModal payee={selectedPayee} closeModal={closeModal} />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          payeeId={payeeToDelete}
          deleteType="payee"
          onDeleted={handleDeleteSuccess}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default PayeesTable;

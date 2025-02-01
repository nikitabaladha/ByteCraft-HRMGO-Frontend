import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditDepositModal from "./EditDepositeModal";
import getAPI from "../../../../api/getAPI";
import ConfirmationDialog from "../../ConfirmationDialog";
// import DepositHeader from "./DepositHeader";

const DepositTable = () => {
  const [deposits, setDeposits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [depositToDelete, setDepositToDelete] = useState(null);
  const [selectedDeposit, setSelectedDeposit] = useState(null);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredDeposits = deposits.filter((deposit) => {
    const searchTerm = searchQuery.toLowerCase();
    const formattedDate = new Date(deposit.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).toLowerCase();
    return (
      deposit.account_name.toLowerCase().includes(searchTerm) ||
      deposit.payer_name.toLowerCase().includes(searchTerm) ||
      deposit.category.toLowerCase().includes(searchTerm) ||
      deposit.payment_type.toLowerCase().includes(searchTerm) ||
      deposit.amount.toString().toLowerCase().includes(searchTerm)||
      deposit.ref.toString().toLowerCase().includes(searchTerm)||
      formattedDate.includes(searchTerm) 
    );
  });

  const paginatedDeposits = filteredDeposits.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );


  const openDeleteDialog = (depositId) => {
    setDepositToDelete(depositId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDepositToDelete(null);
  };

  const handleDeleteSuccess = (deletedDepositId) => {
    setDeposits((prevDeposits) =>
      prevDeposits.filter((deposit) => deposit._id !== deletedDepositId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (deposit) => {
    setSelectedDeposit(deposit);
    setIsModalOpen(true);
  };

  //   const handleOpenModal = () => {
  //     setIsModalOpen(true);  // Open the modal
  //   };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await getAPI("/getall_deposit", {}, true);
        setDeposits(response.data.data);

      } catch (err) {
        console.log("Failed to fetch deposits");

      }
    };

    fetchDeposits();
  }, []);


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
                        <th>Account</th>
                        <th>Payer</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Ref#</th>
                        <th>Payment</th>
                        <th>Date</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedDeposits.map((deposit) => (
                        <tr key={deposit._id}>
                          <td>{deposit.account_name}</td>
                          <td>{deposit.payer_name}</td>
                          <td>{`₹${new Intl.NumberFormat('en-IN').format(deposit.amount)}`}</td>
                          <td>{deposit.category}</td>
                          <td>{deposit.ref}</td>
                          <td>{deposit.payment_type}</td>
                          {/* <td>{deposit.date}</td> */}
                          <td>{new Date(deposit.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEdit(deposit)}
                                    className="mx-3 btn btn-sm align-items-center"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() => openDeleteDialog(deposit._id)}
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
                    Showing {Math.min((currentPage - 1) * entriesPerPage + 1, deposits.length)}{" "}
                    to {Math.min(currentPage * entriesPerPage, deposits.length)}{" "}
                    of {deposits.length} entries
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

                      {Array.from({ length: Math.ceil(deposits.length / entriesPerPage) }, (_, index) => (
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

                      {currentPage < Math.ceil(deposits.length / entriesPerPage) && (
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
        <EditDepositModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDeposit={selectedDeposit}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          id={depositToDelete}
          deleteType="deposit"
          onDeleted={handleDeleteSuccess}
        />
      )}

    </div>
  );
};

export default DepositTable;

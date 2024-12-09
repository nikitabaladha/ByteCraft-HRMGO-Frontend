import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditDepositModal from "./EditDepositeModal";  // Import the DepositModal component
import getAPI from "../../../../api/getAPI"; // Make sure the path is correct
import ConfirmationDialog from "./ConfirmationDialog";
// import DepositHeader from "./DepositHeader";

const DepositTable = () => {
 const [deposits, setDeposits] = useState([]); // State to store deposits
 const [loading, setLoading] = useState(true); // Loading state
 const [error, setError] = useState(""); // Error state
 const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility
 const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 const [depositToDelete, setDepositToDelete] = useState(null);
 const [selectedDeposit, setSelectedDeposit] = useState(null);
 
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
    setIsModalOpen(false);  // Close the modal
  };

  useEffect(() => {
    // Fetch deposits on component mount
    const fetchDeposits = async () => {
      try {
        const response = await getAPI("/getall_deposit",{},true); 
         // Assuming this is the correct API endpoint
        setDeposits(response.data.data); // Set deposits in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to fetch deposits"); // Set error message if API call fails
        setLoading(false);
      }
    };

    fetchDeposits();
  }, []); // Empty dependency array means this runs only once on mount

  if (loading) {
    return <div>Loading...</div>; // You can customize loading state
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    
    <div className="dash-content">
      {/* <DepositHeader deposits={deposits} /> */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                  <div className="dataTable-top">
                    <div className="dataTable-dropdown">
                      <label>
                        <select className="dataTable-selector">
                          <option value="5">5</option>
                          <option value="10" selected>10</option>
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
                        {deposits.map((deposit)=>(
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
                                    onClick={() => handleEdit(deposit)}  // Open modal on button click
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
                        {/* Repeat similar structure for other rows */}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">Showing 1 to 5 of 5 entries</div>
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

      {/* Pass modal visibility and close handler as props */}
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
    depositId={depositToDelete}
    deleteType="deposit"
    onDeleted={handleDeleteSuccess}
  />
)}

    </div>
  );
};

export default DepositTable;

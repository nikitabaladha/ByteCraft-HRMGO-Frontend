import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditTransferBalanceModal from "./EditTransferBalanceModal"; // Updated component name
import getAPI from "../../../../api/getAPI"; // Ensure the path is correct
import ConfirmationDialog from "./ConfirmationDialog";

const TransferBalanceTable = () => {
  const [transferBalances, setTransferBalances] = useState([]); // Updated state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transferBalanceToDelete, setTransferBalanceToDelete] = useState(null);
  const [selectedTransferBalance, setSelectedTransferBalance] = useState(null);

  const openDeleteDialog = (transferBalanceId) => {
    setTransferBalanceToDelete(transferBalanceId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setTransferBalanceToDelete(null);
  };

  const handleDeleteSuccess = (deletedTransferBalanceId) => {
    setTransferBalances((prevBalances) =>
      prevBalances.filter((balance) => balance._id !== deletedTransferBalanceId)
    );
    closeDeleteDialog();
  };

  const handleEdit = (transferBalance) => {
    setSelectedTransferBalance(transferBalance);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTransferBalances = async () => {
      try {
        const response = await getAPI("/getall_transferbalance", {}, true); // Updated API endpoint
        setTransferBalances(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch transfer balances");
        setLoading(false);
      }
    };

    fetchTransferBalances();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <div className="dash-content">
    //   <div className="row">
    //     <div className="col-xl-12">
    //       <div className="card">
    //         <div className="card-header card-body table-border-style">
    //           <div className="table-responsive">
    //             <table className="table dataTable-table" id="pc-dt-simple">
    //               <thead>
    //                 <tr>
    //                   <th>From Account</th>
    //                   <th>To Account</th>
    //                   <th>Date</th>
    //                   <th>Amount</th>
    //                   <th>Payment Method</th>
    //                   <th>Ref#</th>
    //                   <th width="200px">Action</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {transferBalances.map((transferBalance) => (
    //                   <tr key={transferBalance._id}>
    //                     <td>{transferBalance.fromAccountId}</td>
    //                     <td>{transferBalance.toAccountId}</td>
    //                     <td>
    //                       {new Date(transferBalance.date).toLocaleDateString("en-US", {
    //                         year: "numeric",
    //                         month: "short",
    //                         day: "numeric",
    //                       })}
    //                     </td>
    //                     <td>{`₹${new Intl.NumberFormat("en-IN").format(transferBalance.amount)}`}</td>
    //                     <td>{transferBalance.paymentTypeId}</td>
    //                     <td>{transferBalance.referalId}</td>
                       
    //                     <td className="Action">
    //                       <div className="dt-buttons">
    //                         <button
    //                           onClick={() => handleEdit(transferBalance)}
    //                           className="btn btn-sm bg-info text-white me-2"
    //                         >
    //                           <HiOutlinePencil />
    //                         </button>
    //                         <button
    //                           onClick={() => openDeleteDialog(transferBalance._id)}
    //                           className="btn btn-sm bg-danger text-white"
    //                         >
    //                           <RiDeleteBinLine />
    //                         </button>
    //                       </div>
    //                     </td>
    //                   </tr>
    //                 ))}
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
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
                         <th>From Account</th>
                         <th>To Account</th>
                         <th>Date</th>
                         <th>Amount</th>
                         <th>Payment Method</th>
                         <th>Ref#</th>
                        <th width="200px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {transferBalances.map((transferBalance) => (
                      <tr key={transferBalance._id}>
                        <td>{transferBalance.fromAccountId}</td>
                        <td>{transferBalance.toAccountId}</td>
                        <td>
                          {new Date(transferBalance.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td>{`₹${new Intl.NumberFormat("en-IN").format(transferBalance.amount)}`}</td>
                        <td>{transferBalance.paymentTypeId}</td>
                        <td>{transferBalance.referalId}</td>
                          <td className="Action">
                            <div className="dt-buttons">
                              <span>
                                <div className="action-btn bg-info me-2">
                                  <button
                                    onClick={() => handleEdit(transferBalance)}  // Open modal on button click
                                    className="mx-3 btn btn-sm align-items-center"
                                  >
                                    <span className="text-white">
                                      <HiOutlinePencil />
                                    </span>
                                  </button>
                                </div>

                                <div className="action-btn bg-danger">
                                  <button
                                    onClick={() => openDeleteDialog(transferBalance._id)}
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

      {isModalOpen && (
        <EditTransferBalanceModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedTransferBalance={selectedTransferBalance} // Updated prop
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          transferBalanceId={transferBalanceToDelete} // Updated prop
          deleteType="transferbalance"
          onDeleted={handleDeleteSuccess}
        />
      )}
    </div>
  );
};

export default TransferBalanceTable;

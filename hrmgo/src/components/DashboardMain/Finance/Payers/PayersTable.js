// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { HiOutlinePencil } from "react-icons/hi";
// import { RiDeleteBinLine } from "react-icons/ri";
// import EditPayerModal from "./EditPayerModal";
// import getAPI from "../../../../api/getAPI";
// import deleteAPI from "../../../../api/deleteAPI.js";
// import { toast, ToastContainer } from "react-toastify";


// const PayersTable = () => {
//   const [payers, setPayers] = useState([]); // State for fetched payers
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPayer, setSelectedPayer] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [entriesPerPage, setEntriesPerPage] = useState(10); // Default entries per page
//   const [currentPage, setCurrentPage] = useState(1); // Pagination state

//   useEffect(() => {
//     const fetchPayers = async () => {
//       try {
//         const response = await getAPI(`/getall_Payer`, {}, true);
//         setPayers(response.data.data); // Update payers state with fetched data
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch payers");
//         setLoading(false);
//       }
//     };

//     fetchPayers();
//   }, []);

//   const openModal = (payer) => {
//     setSelectedPayer(payer);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPayer(null);
//   };

//   const handleDelete = async (payerId) => {
//     // if (window.confirm("Are you sure you want to delete this account?"))
//     {
//       try {
//         await deleteAPI(`/delete_Payer/${payerId}`, {}, true); // Replace with your API endpoint

//         // Update state to remove deleted payer
//         setPayers((prevPayers) =>
//           prevPayers.filter((payer) => payer._id !== payerId)
//         );

//         toast.success("Account deleted successfully!");
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to delete account. Please try again.");
//       }
//     }
//   };

//   const handleEntriesChange = (event) => {
//     setEntriesPerPage(Number(event.target.value)); // Update entries per page
//     setCurrentPage(1); // Reset to first page
//   };

//   const totalEntries = payers.length;
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const currentPagePayers = payers.slice(startIndex, startIndex + entriesPerPage);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="dash-content">
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-header card-body table-border-style">
//               <div className="table-responsive">
//                 <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
//                   <div className="dataTable-top">
//                     <div className="dataTable-dropdown">
//                       <label>
//                         <select
//                           className="dataTable-selector"
//                           value={entriesPerPage}
//                           onChange={handleEntriesChange}
//                         >
//                           <option value="5">5</option>
//                           <option value="10">10</option>
//                           <option value="15">15</option>
//                           <option value="20">20</option>
//                           <option value="25">25</option>
//                         </select>{" "}
//                         entries per page
//                       </label>
//                     </div>
//                     <div className="dataTable-search">
//                       <input
//                         className="dataTable-input"
//                         placeholder="Search..."
//                         type="text"
//                       />
//                     </div>
//                   </div>
//                   <div className="dataTable-container">
//                     <table className="table dataTable-table" id="pc-dt-simple">
//                       <thead>
//                         <tr>
//                           <th>Payer Name</th>
//                           <th>Contact Number</th>
//                           <th>Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentPagePayers.map((payer) => (
//                           <tr key={payer._id}>
//                             <td>{payer.payer_name}</td>
//                             <td>{payer.contact_number}</td>
//                             <td className="Action">
//                               <div className="dt-buttons">
//                                 <span>
//                                   <div className="action-btn bg-info me-2">
//                                     <button
//                                       onClick={() => openModal(payer)}
//                                       className="mx-3 btn btn-sm align-items-center"
//                                       data-bs-toggle="tooltip"
//                                       title="Edit"
//                                     >
//                                       <span className="text-white">
//                                         <HiOutlinePencil />
//                                       </span>
//                                     </button>
//                                   </div>
//                                   <div className="action-btn bg-danger">
//                                     <button
//                                       onClick={() => handleDelete(payer._id)}
//                                       type="submit"
//                                       className="mx-3 btn btn-sm align-items-center"
//                                       data-bs-toggle="tooltip"
//                                       title="Delete"
//                                     >
//                                       <span className="text-white">
//                                         <RiDeleteBinLine />
//                                       </span>
//                                     </button>
//                                   </div>
//                                 </span>
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="dataTable-bottom">
//                     <div className="dataTable-info">
//                       Showing {Math.min(entriesPerPage, totalEntries - startIndex)} of {totalEntries} entries
//                     </div>
//                     <nav className="dataTable-pagination">
//                       <ul className="dataTable-pagination-list"></ul>
//                     </nav>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <EditPayerModal payer={selectedPayer} closeModal={closeModal} />
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default PayersTable;

import React, { useState, useEffect } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import EditPayerModal from "./EditPayerModal";
import ConfirmationDialog from "./ConfirmationDialog";
import getAPI from "../../../../api/getAPI";
import { toast, ToastContainer } from "react-toastify";

const PayersTable = () => {
  const [payers, setPayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [payerToDelete, setPayerToDelete] = useState(null);

  useEffect(() => {
    const fetchPayers = async () => {
      try {
        const response = await getAPI(`/getall_Payer`, {}, true);
        setPayers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch payers");
        setLoading(false);
      }
    };

    fetchPayers();
  }, []);

  const openModal = (payee) => {
    setSelectedPayer(payee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayer(null);
  };

  const openDeleteDialog = (payerId) => {
    setPayerToDelete(payerId);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPayerToDelete(null);
  };

  const handleDeleteSuccess = (deletedPayerId) => {
    setPayers((prevPayers) =>
      prevPayers.filter((payer) => payer._id !== deletedPayerId)
    );
    closeDeleteDialog();
  };

  const handleEntriesChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalEntries = payers.length;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentPagePayers = payers.slice(startIndex, startIndex + entriesPerPage);

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
                      <th>Payer Name</th>
                      <th>Contact Number</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPagePayers.map((payer) => (
                      <tr key={payer._id}>
                        <td>{payer.payer_name}</td>
                        <td>{payer.contact_number}</td>
                        <td className="Action">
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-info me-2">
                                <button
                                  onClick={() => openModal(payer)}
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
                                  // onClick={() => handleDelete(payer._id)}
                                  onClick={() => openDeleteDialog(payer._id)}
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
    <EditPayerModal payer={selectedPayer} closeModal={closeModal} />
  )}

   {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={closeDeleteDialog}
          payerId={payerToDelete}
          deleteType="payer"
          onDeleted={handleDeleteSuccess}
        />
      )}

  <ToastContainer />
</div>

  );
};

export default PayersTable;


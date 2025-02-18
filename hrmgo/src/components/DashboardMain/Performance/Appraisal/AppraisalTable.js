// import { Link } from "react-router-dom";
// // import { TiEyeOutline } from "react-icons/ti";
// // import { LuPencil } from "react-icons/lu";
// // import { LuTrash2 } from "react-icons/lu";
// import React, { useState } from "react";
// import getAPI from "../../../../api/getAPI.js";

// import { formatDate } from "../../../../js/custom.js";

// import AppraisalDetailModal from "./AppraisalDetailModal.js";
// import ConfirmationDialog from "../../ConfirmationDialog";
// import AppraisalUpdateModal from "./AppraisalUpdateModal.js";

// const AppraisalTable = ({
//   appraisals,
//   setAppraisals,
//   selectedAppraisal,
//   setSelectedAppraisal,
//   updateAppraisal,
// }) => {
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleEntriesPerPageChange = (event) => {
//     setEntriesPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const filteredTrainers = trainers.filter((trainer) => {
//     const searchTerm = searchQuery.toLowerCase();
//     const fullName = `${trainer.firstName} ${trainer.lastName}`.toLowerCase();
//     return (
//       trainer.branch.toLowerCase().includes(searchTerm) ||
//       trainer.email.toLowerCase().includes(searchTerm) ||
//       fullName.includes(searchTerm) ||
//       trainer.contactNumber.includes(searchTerm)
//     );
//   });

//   const paginatedTrainers = filteredTrainers.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   console.log("appraisals from table", appraisals);

//   // Function to open the modal
//   const openViewModal = async (appraisal) => {
//     try {
//       const response = await getAPI(`/appraisal/${appraisal.id}`, {}, true);

//       if (!response.hasError && response.data.data) {
//         setSelectedAppraisal(response.data.data);

//         setIsDetailModalOpen(true);
//       } else {
//         console.error("Error fetching appraisal detail");
//       }
//     } catch (err) {
//       console.error("Error fetching Indicator Detail:", err);
//     }
//   };

//   const closeModal = () => {
//     setIsDetailModalOpen(false);
//     setIsUpdateModalOpen(false);
//     setSelectedAppraisal(null);
//   };

//   const openDeleteDialog = (appraisal) => {
//     setSelectedAppraisal(appraisal);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setSelectedAppraisal(null);
//   };

//   const handleDeleteConfirmed = (id) => {
//     setAppraisals((prevAppraisals) =>
//       prevAppraisals.filter((appraisal) => appraisal.id !== id)
//     );
//     setIsDeleteDialogOpen(false);
//   };

//   const handleUpdate = (appraisal) => {
//     console.log("appraisal from handle update", appraisal);
//     setSelectedAppraisal(appraisal);
//     setIsUpdateModalOpen(true);
//   };

//   const renderStars = (rating) => {
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStar;

//     let stars = [];
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<i key={`full-${i}`} className="text-warning fas fa-star" />);
//     }
//     if (halfStar) {
//       stars.push(
//         <i key="half" className="text-warning fas fa-star-half-alt" />
//       );
//     }
//     for (let i = 0; i < emptyStars; i++) {
//       stars.push(<i key={`empty-${i}`} className="fas fa-star" />);
//     }

//     return (
//       <span>
//         {stars}
//         <span className="theme-text-color">({rating})</span>
//       </span>
//     );
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-xl-12">
//           <div className="card">
//             <div className="card-header card-body table-border-style">
//               <div className="table-responsive">
//               <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
//                   <div className="dataTable-top">
//                     <div className="dataTable-dropdown">
//                       <label>
//                         <select
//                           className="dataTable-selector"
//                           value={entriesPerPage}
//                           onChange={handleEntriesPerPageChange}
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
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 <table className="table" id="pc-dt-simple">
//                   <thead>
//                     <tr>
//                       <th>BRANCH</th>
//                       <th>DEPARTMENT</th>
//                       <th>DESIGNATION</th>
//                       <th>EMPLOYEE</th>
//                       <th>TARGET RATING</th>
//                       <th>OVERALL RATING</th>
//                       <th>APPRAISAL DATE</th>
//                       <th width="200px">ACTION</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {paginatedTrainers.length > 0 ? (
//                     paginatedTrainers.map((appraisal) => (
//                       <tr key={appraisal.id}>
//                         <td>{appraisal.branch}</td>
//                         <td>{appraisal.department}</td>
//                         <td>{appraisal.designation}</td>
//                         <td>{appraisal.employee}</td>
//                         <td>{renderStars(appraisal.targetRating)}</td>
//                         <td>{renderStars(appraisal.overAllRating)}</td>

//                         <td>{formatDate(appraisal.createdAt)}</td>
//                         <td className="Action">
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-warning me-2">
//                                 <Link
//                                   onClick={() => openViewModal(appraisal)}
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-size="lg"
//                                   data-ajax-popup="true"
//                                   data-bs-toggle="tooltip"
//                                   title="Appraisal Detail"
//                                   data-bs-original-title="View"
//                                 >
//                                   <span className="text-white">
//                                     {/* <TiEyeOutline /> */}
//                                     <i className="ti ti-eye text-white"></i>
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-info me-2">
//                                 <Link
//                                   to="#"
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-size="lg"
//                                   data-ajax-popup="true"
//                                   data-bs-toggle="tooltip"
//                                   title="Edit Appraisal"
//                                   data-bs-original-title="Edit"
//                                   onClick={() => handleUpdate(appraisal)}
//                                 >
//                                   <span className="text-white">
//                                     {/* <LuPencil /> */}
//                                     <i className="ti ti-pencil text-white"></i>
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <form
//                                   method="POST"
//                                   acceptCharset="UTF-8"
//                                   id={`delete-form-${appraisal.id}`}
//                                 >
//                                   <input
//                                     name="_method"
//                                     type="hidden"
//                                     defaultValue="DELETE"
//                                   />
//                                   <input name="_token" type="hidden" />
//                                   <Link
//                                     to="#"
//                                     className="mx-3 btn btn-sm align-items-center bs-pass-para"
//                                     data-bs-toggle="tooltip"
//                                     title="Delete"
//                                     data-bs-original-title="Delete"
//                                     aria-label="Delete"
//                                     onClick={() => openDeleteDialog(appraisal)}
//                                   >
//                                     <span className="text-white">
//                                       {/* <LuTrash2 /> */}
//                                       <i className="ti ti-trash text-white"></i>
//                                     </span>
//                                   </Link>
//                                 </form>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     : (
//                       <tr>
//                         <td colSpan="5" className="text-center">
//                           No trainers available.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 <div className="dataTable-bottom">
//                       <div className="dataTable-info">
//                         Showing{" "}
//                         {Math.min(
//                           (currentPage - 1) * entriesPerPage + 1,
//                           trainers.length
//                         )}{" "}
//                         to{" "}
//                         {Math.min(
//                           currentPage * entriesPerPage,
//                           trainers.length
//                         )}{" "}
//                         of {trainers.length} entries
//                       </div>
//                       <nav className="dataTable-pagination">
//                         <ul className="dataTable-pagination-list">
//                           {currentPage > 1 && (
//                             <li className="page-item">
//                               <button
//                                 className="page-link prev-button"
//                                 onClick={() => setCurrentPage(currentPage - 1)}
//                               >
//                                 ‹
//                               </button>
//                             </li>
//                           )}

//                           {Array.from(
//                             {
//                               length: Math.ceil(
//                                 trainers.length / entriesPerPage
//                               ),
//                             },
//                             (_, index) => (
//                               <li
//                                 key={index + 1}
//                                 className={`page-item ${
//                                   currentPage === index + 1 ? "active" : ""
//                                 }`}
//                               >
//                                 <button
//                                   className="page-link"
//                                   onClick={() => setCurrentPage(index + 1)}
//                                   style={{
//                                     backgroundColor:
//                                       currentPage === index + 1
//                                         ? "#d9d9d9"
//                                         : "transparent",
//                                     color: "#6FD943",
//                                   }}
//                                 >
//                                   {index + 1}
//                                 </button>
//                               </li>
//                             )
//                           )}

//                           {currentPage <
//                             Math.ceil(trainers.length / entriesPerPage) && (
//                             <li className="page-item">
//                               <button
//                                 className="page-link next-button"
//                                 onClick={() => setCurrentPage(currentPage + 1)}
//                               >
//                                 ›
//                               </button>
//                             </li>
//                           )}
//                         </ul>
//                       </nav>
//                     </div>
//                   </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Detail Dialog */}
//       {isDetailModalOpen && (
//         <AppraisalDetailModal
//           closeModal={closeModal}
//           appraisal={selectedAppraisal}
//         />
//       )}

//       {/* Confirmation Dialog */}
//       {isDeleteDialogOpen && (
//         <ConfirmationDialog
//           onClose={handleDeleteCancel}
//           deleteType="appraisal"
//           id={selectedAppraisal.id}
//           onDeleted={handleDeleteConfirmed}
//         />
//       )}

//       {/* Update Modal */}
//       {isUpdateModalOpen && (
//         <AppraisalUpdateModal
//           appraisal={selectedAppraisal}
//           onClose={() => setIsUpdateModalOpen(false)}
//           closeModal={closeModal}
//           updateAppraisal={updateAppraisal}
//         />
//       )}
//     </>
//   );
// };

// export default AppraisalTable;

import { Link } from "react-router-dom";
import React, { useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import { formatDate } from "../../../../js/custom.js";
import AppraisalDetailModal from "./AppraisalDetailModal.js";
import ConfirmationDialog from "../../ConfirmationDialog";
import AppraisalUpdateModal from "./AppraisalUpdateModal.js";

const AppraisalTable = ({
  appraisals,
  setAppraisals,
  selectedAppraisal,
  setSelectedAppraisal,
  updateAppraisal,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const filteredAppraisals = appraisals.filter((appraisal) => {
    const searchTerm = searchQuery.toLowerCase();
    const fullName = `${appraisal.employee}`.toLowerCase();
    return (
      appraisal.branch.toLowerCase().includes(searchTerm) ||
      appraisal.department.toLowerCase().includes(searchTerm) ||
      appraisal.designation.toLowerCase().includes(searchTerm) ||
      fullName.includes(searchTerm)
    );
  });

  const paginatedAppraisals = filteredAppraisals.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const openViewModal = async (appraisal) => {
    try {
      const response = await getAPI(`/appraisal/${appraisal.id}`, {}, true);

      if (!response.hasError && response.data.data) {
        setSelectedAppraisal(response.data.data);
        setIsDetailModalOpen(true);
      } else {
        console.error("Error fetching appraisal detail");
      }
    } catch (err) {
      console.error("Error fetching Indicator Detail:", err);
    }
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedAppraisal(null);
  };

  const openDeleteDialog = (appraisal) => {
    setSelectedAppraisal(appraisal);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAppraisal(null);
  };

  const handleDeleteConfirmed = (id) => {
    setAppraisals((prevAppraisals) =>
      prevAppraisals.filter((appraisal) => appraisal.id !== id)
    );
    setIsDeleteDialogOpen(false);
  };

  const handleUpdate = (appraisal) => {
    setSelectedAppraisal(appraisal);
    setIsUpdateModalOpen(true);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="text-warning fas fa-star" />);
    }
    if (halfStar) {
      stars.push(
        <i key="half" className="text-warning fas fa-star-half-alt" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fas fa-star" />);
    }

    return (
      <span>
        {stars}
        <span className="theme-text-color">({rating})</span>
      </span>
    );
  };

  return (
    <>
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
                  <table className="table" id="pc-dt-simple">
                    <thead>
                      <tr>
                        <th>BRANCH</th>
                        <th>DEPARTMENT</th>
                        <th>DESIGNATION</th>
                        <th>EMPLOYEE</th>
                        <th>TARGET RATING</th>
                        <th>OVERALL RATING</th>
                        <th>APPRAISAL DATE</th>
                        <th width="200px">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAppraisals.length > 0 ? (
                        paginatedAppraisals.map((appraisal) => (
                          <tr key={appraisal.id}>
                            <td>{appraisal.branch}</td>
                            <td>{appraisal.department}</td>
                            <td>{appraisal.designation}</td>
                            <td>{appraisal.employee}</td>
                            <td>{renderStars(appraisal.targetRating)}</td>
                            <td>{renderStars(appraisal.overAllRating)}</td>
                            <td>{formatDate(appraisal.createdAt)}</td>
                            <td className="Action">
                              <div className="dt-buttons">
                                <span>
                                  <div className="action-btn bg-warning me-2">
                                    <Link
                                      onClick={() => openViewModal(appraisal)}
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title="Appraisal Detail"
                                      data-bs-original-title="View"
                                    >
                                      <span className="text-white">
                                        <i className="ti ti-eye text-white"></i>
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-info me-2">
                                    <Link
                                      to="#"
                                      className="mx-3 btn btn-sm align-items-center"
                                      data-size="lg"
                                      data-ajax-popup="true"
                                      data-bs-toggle="tooltip"
                                      title="Edit Appraisal"
                                      data-bs-original-title="Edit"
                                      onClick={() => handleUpdate(appraisal)}
                                    >
                                      <span className="text-white">
                                        <i className="ti ti-pencil text-white"></i>
                                      </span>
                                    </Link>
                                  </div>
                                  <div className="action-btn bg-danger">
                                    <form
                                      method="POST"
                                      acceptCharset="UTF-8"
                                      id={`delete-form-${appraisal.id}`}
                                    >
                                      <input
                                        name="_method"
                                        type="hidden"
                                        defaultValue="DELETE"
                                      />
                                      <input name="_token" type="hidden" />
                                      <Link
                                        to="#"
                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                        data-bs-toggle="tooltip"
                                        title="Delete"
                                        data-bs-original-title="Delete"
                                        aria-label="Delete"
                                        onClick={() => openDeleteDialog(appraisal)}
                                      >
                                        <span className="text-white">
                                          <i className="ti ti-trash text-white"></i>
                                        </span>
                                      </Link>
                                    </form>
                                  </div>
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No appraisals available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing{" "}
                      {Math.min(
                        (currentPage - 1) * entriesPerPage + 1,
                        filteredAppraisals.length
                      )}{" "}
                      to{" "}
                      {Math.min(
                        currentPage * entriesPerPage,
                        filteredAppraisals.length
                      )}{" "}
                      of {filteredAppraisals.length} entries
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

                        {Array.from(
                          {
                            length: Math.ceil(
                              filteredAppraisals.length / entriesPerPage
                            ),
                          },
                          (_, index) => (
                            <li
                              key={index + 1}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                                style={{
                                  backgroundColor:
                                    currentPage === index + 1
                                      ? "#d9d9d9"
                                      : "transparent",
                                  color: "#6FD943",
                                }}
                              >
                                {index + 1}
                              </button>
                            </li>
                          )
                        )}

                        {currentPage <
                          Math.ceil(filteredAppraisals.length / entriesPerPage) && (
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
      </div>

      {/* Detail Dialog */}
      {isDetailModalOpen && (
        <AppraisalDetailModal
          closeModal={closeModal}
          appraisal={selectedAppraisal}
        />
      )}

      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="appraisal"
          id={selectedAppraisal.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <AppraisalUpdateModal
          appraisal={selectedAppraisal}
          onClose={() => setIsUpdateModalOpen(false)}
          closeModal={closeModal}
          updateAppraisal={updateAppraisal}
        />
      )}
    </>
  );
};

export default AppraisalTable;

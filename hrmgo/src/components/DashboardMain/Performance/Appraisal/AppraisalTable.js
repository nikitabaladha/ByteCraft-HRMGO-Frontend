// import { Link } from "react-router-dom";
// import { TiEyeOutline } from "react-icons/ti";
// import { LuPencil } from "react-icons/lu";
// import { LuTrash2 } from "react-icons/lu";
// import React, { useEffect, useState } from "react";
// import getAPI from "../../../../api/getAPI.js";
// import moment from "moment";
// import AppraisalDetailModal from "./AppraisalDetailModal.js";
// import ConfirmationDialog from "../ConfirmationDialog.js";
// import AppraisalUpdateModal from "./AppraisalUpdateModal.js";

// const AppraisalTable = () => {
//   const [Appraisals, setAppraisals] = useState([]);
//   const [selectedAppraisal, setSelectedAppraisal] = useState(null);
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [appraisalIdToDelete, setAppraisalIdToDelete] = useState(null);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

//   // Function to render dynamic stars based on the rating
//   useEffect(() => {
//     const fetchAppraisalData = async () => {
//       try {
//         const response = await getAPI("/appraisal", {}, true);

//         if (!response.hasError && Array.isArray(response.data.data)) {
//           const data = response.data.data;

//           console.log("Appraisal get all API called", data);

//           setAppraisals(
//             data.map((item) => ({
//               branch: item.branch,
//               department: item.department,
//               designation: item.designation,
//               employee: item.employee,
//               targetRating: item.targetRating,
//               overallRating: item.overallRating,
//               appraisalDate: moment(item.appraisalDate).format("MMM DD, YYYY"),
//               id: item.appraisalId,
//             }))
//           );
//         } else {
//           console.error("Invalid response format or error in response");
//         }
//       } catch (err) {
//         console.error("Error fetching Appraisal Data:", err);
//       }
//     };

//     fetchAppraisalData();
//   }, []);

//   // Function to open the modal
//   const openViewModal = async (appraisal) => {
//     try {
//       const response = await getAPI(`/appraisal/${appraisal.id}`, {}, true);

//       if (!response.hasError && response.data.data) {
//         console.log("Appraisal by ID: ", response.data.data);

//         setSelectedAppraisal(response.data.data);
//         setIsDetailModalOpen(true);
//       } else {
//         console.error("Error fetching appraisal detail");
//       }
//     } catch (err) {
//       console.error("Error fetching Indicator Detail:", err);
//     }
//   };

//   const openUpdateModal = async (appraisal) => {
//     try {
//       const response = await getAPI(`/appraisal/${appraisal.id}`, {}, true);

//       if (!response.hasError && response.data.data) {
//         console.log("Appraisal by ID: ", response.data.data);
//         setSelectedAppraisal(response.data.data);
//         setIsUpdateModalOpen(true);
//       } else {
//         console.error("Error fetching appraisal detail");
//       }
//     } catch (err) {
//       console.error("Error fetching Appraisal Detail:", err);
//     }
//   };

//   const handleUpdateSuccess = (updateAppraisal) => {
//     setAppraisals((prev) =>
//       prev.map((appraisal) =>
//         appraisal.id === updateAppraisal.id ? updateAppraisal : appraisal
//       )
//     );
//     setIsUpdateModalOpen(false);
//   };

//   const closeModal = () => {
//     setIsDetailModalOpen(false);
//     setIsUpdateModalOpen(false);
//     setSelectedAppraisal(null);
//   };

//   const openDeleteDialog = (id) => {
//     setAppraisalIdToDelete(id);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteCancel = () => {
//     setIsDeleteDialogOpen(false);
//     setAppraisalIdToDelete(null);
//   };

//   const handleDeleteSuccess = (id) => {
//     setAppraisals((prev) => prev.filter((appraisal) => appraisal.id !== id));
//     setIsDeleteDialogOpen(false);
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
//                     {Appraisals.map((Appraisal) => (
//                       <tr key={Appraisal.id}>
//                         <td>{Appraisal.branch}</td>
//                         <td>{Appraisal.department}</td>
//                         <td>{Appraisal.designation}</td>
//                         <td>{Appraisal.employee}</td>
//                         <td>{renderStars(Appraisal.targetRating)}</td>
//                         <td>{renderStars(Appraisal.overallRating)}</td>
//                         <td>{Appraisal.appraisalDate}</td>
//                         <td className="Action">
//                           <div className="dt-buttons">
//                             <span>
//                               <div className="action-btn bg-warning me-2">
//                                 <Link
//                                   onClick={() => openViewModal(Appraisal)}
//                                   className="mx-3 btn btn-sm align-items-center"
//                                   data-size="lg"
//                                   data-ajax-popup="true"
//                                   data-bs-toggle="tooltip"
//                                   title="Appraisal Detail"
//                                   data-bs-original-title="View"
//                                 >
//                                   <span className="text-white">
//                                     <TiEyeOutline />
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
//                                   onClick={() => openUpdateModal(Appraisal)}
//                                 >
//                                   <span className="text-white">
//                                     <LuPencil />
//                                   </span>
//                                 </Link>
//                               </div>
//                               <div className="action-btn bg-danger">
//                                 <form
//                                   method="POST"
//                                   acceptCharset="UTF-8"
//                                   id={`delete-form-${Appraisal.id}`}
//                                 >
//                                   <input
//                                     name="_method"
//                                     type="hidden"
//                                     defaultValue="DELETE"
//                                   />
//                                   <input
//                                     name="_token"
//                                     type="hidden"
//                                     defaultValue="bv9JuUGnlZvo4e2tk0j8suLlMwPqxJ5lEkHaMTor"
//                                   />
//                                   <Link
//                                     to="#"
//                                     className="mx-3 btn btn-sm align-items-center bs-pass-para"
//                                     data-bs-toggle="tooltip"
//                                     title="Delete"
//                                     data-bs-original-title="Delete"
//                                     aria-label="Delete"
//                                     onClick={() =>
//                                       openDeleteDialog(Appraisal.id)
//                                     }
//                                   >
//                                     <span className="text-white">
//                                       <LuTrash2 />
//                                     </span>
//                                   </Link>
//                                 </form>
//                               </div>
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
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
//           appraisalId={appraisalIdToDelete}
//           onDeleted={handleDeleteSuccess}
//           deleteType="appraisal"
//         />
//       )}

//       {/* Update Modal */}
//       {isUpdateModalOpen && (
//         <AppraisalUpdateModal
//           closeModal={closeModal}
//           appraisal={selectedAppraisal}
//           onUpdateSuccess={handleUpdateSuccess}
//         />
//       )}
//     </>
//   );
// };

// export default AppraisalTable;

import { Link } from "react-router-dom";
import { TiEyeOutline } from "react-icons/ti";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import moment from "moment";

import AppraisalDetailModal from "./AppraisalDetailModal.js";
import ConfirmationDialog from "../../ConfirmationDialog";
import AppraisalUpdateModal from "./AppraisalUpdateModal.js";

const AppraisalTable = () => {
  const [Appraisals, setAppraisals] = useState([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [appraisalIdToDelete, setAppraisalIdToDelete] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppraisalData = async () => {
      try {
        const response = await getAPI("/appraisal", {}, true);

        if (!response.hasError && Array.isArray(response.data.data)) {
          const data = response.data.data;

          setAppraisals(
            data.map((item) => ({
              branch: item.branch,
              department: item.department,
              designation: item.designation,
              employee: item.employee,
              targetRating: item.targetRating,
              overallRating: item.overallRating,
              appraisalDate: moment(item.appraisalDate).format("MMM DD, YYYY"),
              id: item.appraisalId,
            }))
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Appraisal Data:", err);
      }
    };

    fetchAppraisalData();
  }, []);

  // Function to open the modal
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

  const openUpdateModal = async (appraisal) => {
    try {
      const response = await getAPI(`/appraisal/${appraisal.id}`, {}, true);

      if (!response.hasError && response.data.data) {
        console.log("Appraisal by ID: ", response.data.data);
        setSelectedAppraisal(response.data.data);
        setIsUpdateModalOpen(true);
      } else {
        console.error("Error fetching appraisal detail");
      }
    } catch (err) {
      console.error("Error fetching Appraisal Detail:", err);
    }
  };

  const handleUpdateSuccess = (updateAppraisal) => {
    setAppraisals((prev) =>
      prev.map((appraisal) =>
        appraisal.id === updateAppraisal.id ? updateAppraisal : appraisal
      )
    );
    setIsUpdateModalOpen(false);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsUpdateModalOpen(false);
    setSelectedAppraisal(null);
  };

  const openDeleteDialog = (id) => {
    setAppraisalIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setAppraisalIdToDelete(null);
  };

  const handleDeleteSuccess = (id) => {
    setAppraisals((prev) => prev.filter((appraisal) => appraisal.id !== id));
    setIsDeleteDialogOpen(false);
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
                    {Appraisals.map((Appraisal) => (
                      <tr key={Appraisal.id}>
                        <td>{Appraisal.branch}</td>
                        <td>{Appraisal.department}</td>
                        <td>{Appraisal.designation}</td>
                        <td>{Appraisal.employee}</td>
                        <td>{renderStars(Appraisal.targetRating)}</td>
                        <td>{renderStars(Appraisal.overallRating)}</td>
                        <td>{Appraisal.appraisalDate}</td>
                        <td className="Action">
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-warning me-2">
                                <Link
                                  onClick={() => openViewModal(Appraisal)}
                                  className="mx-3 btn btn-sm align-items-center"
                                  data-size="lg"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title="Appraisal Detail"
                                  data-bs-original-title="View"
                                >
                                  <span className="text-white">
                                    <TiEyeOutline />
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
                                  onClick={() => openUpdateModal(Appraisal)}
                                >
                                  <span className="text-white">
                                    <LuPencil />
                                  </span>
                                </Link>
                              </div>
                              <div className="action-btn bg-danger">
                                <form
                                  method="POST"
                                  acceptCharset="UTF-8"
                                  id={`delete-form-${Appraisal.id}`}
                                >
                                  <input
                                    name="_method"
                                    type="hidden"
                                    defaultValue="DELETE"
                                  />
                                  <input
                                    name="_token"
                                    type="hidden"
                                    defaultValue="bv9JuUGnlZvo4e2tk0j8suLlMwPqxJ5lEkHaMTor"
                                  />
                                  <Link
                                    to="#"
                                    className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                    data-bs-original-title="Delete"
                                    aria-label="Delete"
                                    onClick={() =>
                                      openDeleteDialog(Appraisal.id)
                                    }
                                  >
                                    <span className="text-white">
                                      <LuTrash2 />
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
          id={appraisalIdToDelete}
          onDeleted={handleDeleteSuccess}
        />
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <AppraisalUpdateModal
          closeModal={closeModal}
          appraisal={selectedAppraisal}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default AppraisalTable;

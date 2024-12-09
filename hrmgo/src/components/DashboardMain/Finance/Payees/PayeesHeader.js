// import React from 'react';
// import { Link } from 'react-router-dom';
// import { TiPlus } from "react-icons/ti";

// const PayeesHeader = () => {
//     return (
//         <div className="dash-content">
//             <div className="page-header">
//                 <div className="page-block">
//                     <div className="row align-items-center">
//                         <div className="col-auto">
//                             <div className="page-header-title">
//                                 <h4 className="m-b-10">Manage Payee</h4>
//                             </div>
//                             <ul className="breadcrumb">
//                                 <li className="breadcrumb-item">
//                                     <Link to="/hrmgo/dashboard">Home</Link>
//                                 </li>
//                                 <li className="breadcrumb-item">Payee</li>
//                             </ul>
//                         </div>
//                         <div className="col">
//                             <div className="float-end">
//                             <button
//                               type="button"
//                                 className="btn btn-sm btn-primary"
//                                title="Create"
//                                   >
//                                  <TiPlus /> 
//                            </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PayeesHeader;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import CreatePayeeModal from "./CreatePayeeModal"; // Import the modal component

const PayeesHeader = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Payee</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Payee</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  title="Create"
                  onClick={openModal} // Open modal on click
                >
                  <TiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render CreatePayeeModal when showModal is true */}
      {showModal && (
        <CreatePayeeModal closeModal={closeModal} /> // Pass closeModal as a prop
      )}
    </div>
  );
};

export default PayeesHeader;
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
import CreatePayeeModal from "./CreatePayeeModal"; 

const PayeesHeader = () => {
  const [showModal, setShowModal] = useState(false); 

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
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
                  onClick={openModal} 
                >
                  <TiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>

   
      {showModal && (
        <CreatePayeeModal closeModal={closeModal} /> 
      )}
    </div>
  );
};

export default PayeesHeader;

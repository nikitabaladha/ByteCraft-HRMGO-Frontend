// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import { TiPlus } from "react-icons/ti";
// import AccountCreateModal from "./AccountCreateModal.js";

// const AccountListHeader = () => {
//   return (
//     <div className="dash-content">
//     <div className="page-header">
//       <div className="page-block">
//         <div className="row align-items-center">
//           <div className="col-auto">
//             <div className="page-header-title">
//               <h4 className="m-b-10">Manage Account</h4>
//             </div>
//             <ul className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <a href="https://demo.workdo.io/hrmgo/dashboard">Home</a>
//               </li>
//               <li className="breadcrumb-item">Account</li>
//             </ul>
//           </div>
//           <div className="col">
//             <div className="float-end">
//               <Link
//                 href="#"
//                 data-url="https://demo.workdo.io/hrmgo/accountlist/create"
//                 data-ajax-popup="true"
//                 data-title="Create New Account"
//                 data-bs-toggle="tooltip"
//                 title=""
//                 className="btn btn-sm btn-primary"
//                 data-bs-original-title="Create"
//                 onCreateClick={openModal}
//               >
//                 <TiPlus />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//    </div>
   
//   );
// };

// export default AccountListHeader;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import AccountCreateModal from "./AccountCreateModal.js";

const AccountListHeader = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
    console.log("Form submitted!");
    setModalOpen(false);
  };

  return (
    <div className="dash-content">
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Account</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="https://demo.workdo.io/hrmgo/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Account</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={openModal}
                  title="Create"
                >
                  <TiPlus /> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <AccountCreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AccountListHeader;


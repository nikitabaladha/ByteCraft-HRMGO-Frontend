// import React from "react";
// import { Link } from "react-router-dom";

// const CreatePayeeModal = ({ closeModal }) => {
//   return (
//     <div
//       className="modal fade show"
//       id="commonModal"
//       tabIndex="-1"
//       role="dialog"
//       aria-labelledby="exampleModalLabel"
//       aria-modal="true"
//       style={{ display: "block" }}
//     >
//       <div className="modal-dialog modal-undefined" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel">
//               Create New Payee
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={closeModal} // Close modal on click
//             ></button>
//           </div>
//           <div className="body">
//             <form
//               method="POST"
//               action="https://demo.workdo.io/hrmgo/payees"
//               acceptCharset="UTF-8"
//               className="needs-validation"
//               noValidate
//             >
//               <input
//                 name="_token"
//                 type="hidden"
//                 value="DR52mwarUOZ6VizwBIwrqJKryhfGNLmaordhHbbH"
//               />
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="form-group">
//                     <label htmlFor="payee_name" className="form-label">
//                       Payee Name
//                     </label>
//                     <span className="text-danger">*</span>
//                     <input
//                       className="form-control"
//                       required
//                       placeholder="Enter Payee Name"
//                       name="payee_name"
//                       type="text"
//                       id="payee_name"
//                     />
//                   </div>
//                   <div className="col-md-12">
//                     <div className="form-group">
//                       <label htmlFor="contact_number" className="form-label">
//                         Contact Number
//                       </label>
//                       <span className="text-danger">*</span>
//                       <input
//                         className="form-control"
//                         placeholder="Enter Contact Number"
//                         pattern="^\\+\\d{1,3}\\d{9,13}$"
//                         id="contact_number"
//                         required
//                         name="contact_number"
//                         type="text"
//                       />
//                       <div className="text-xs text-danger">
//                         Please use with country code. (ex. +91)
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <Link
//                   to="#"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                   onClick={closeModal} // Close modal on click
//                 >
//                   Cancel
//                 </Link>
//                 <input
//                   type="submit"
//                   value="Create"
//                   className="btn btn-primary"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePayeeModal;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";  
import postAPI from "../../../../api/postAPI"; 
import "react-toastify/dist/ReactToastify.css";  

const CreatePayeeModal = ({ closeModal, fetchPayees }) => {
  const [payeeName, setPayeeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    fetchPayees();
    const payeeData = {
      payee_name: payeeName,
      contact_number: contactNumber,
    };

    try {
    
      const response = await postAPI('/create_Payee', payeeData ,true);
      if (!response.hasError) {
        toast.success("Payee Created Successfully");
        closeModal();
        fetchPayees();

        setPayeeName('');
        setContactNumber('');
      } else {
        toast.error(`Failed to create Payee: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating Payee.");
    }
  };

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{ display: "block" ,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040, 
      }}
    >
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Payee
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="body">
            <form
              onSubmit={handleSubmit}  
              method="POST"
              action="https://demo.workdo.io/hrmgo/payees"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate
            >
              <div className="modal-body">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="payee_name" className="form-label">
                      Payee Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Payee Name"
                      name="payee_name"
                      type="text"
                      id="payee_name"
                      value={payeeName}
                      onChange={(e) => setPayeeName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="contact_number" className="form-label">
                        Contact Number
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter Contact Number"
                        pattern="^\\+\\d{1,3}\\d{9,13}$"
                        id="contact_number"
                        required
                        name="contact_number"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                      <div className="text-xs text-danger">
                        Please use with country code. (ex. +91)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Cancel
                </Link>
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayeeModal;






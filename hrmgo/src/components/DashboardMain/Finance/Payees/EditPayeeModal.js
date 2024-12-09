// import React from "react";

// const EditPayeeModal = ({ payee, closeModal }) => {
//   return (
//     <div
//       className="modal fade show"
//       tabIndex="-1"
//       aria-labelledby="exampleModalLabel"
//       style={{ display: "block" }}
//       aria-modal="true"
//       role="dialog"
//     >
//       <div className="modal-dialog modal-md" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel">
//               Edit Payee
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={closeModal}
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="body">
//             <form
//               method="POST"
//               action={`https://demo.workdo.io/hrmgo/payees/${payee.id}`}
//               acceptCharset="UTF-8"
//               className="needs-validation"
//               noValidate
//             >
//               <input name="_method" type="hidden" value="PUT" />
//               <input
//                 name="_token"
//                 type="hidden"
//                 value="DR52mwarUOZ6VizwBIwrqJKryhfGNLmaordhHbbH"
//               />
//               <div className="modal-body">
//                 <div className="row">
//                   <div className="col-md-12">
//                     <div className="form-group">
//                       <label htmlFor="payer_name" className="col-form-label">
//                         Payee Name
//                       </label>
//                       <span className="text-danger">*</span>
//                       <input
//                         className="form-control"
//                         required
//                         placeholder="Enter Payee Name"
//                         name="payer_name"
//                         type="text"
//                         defaultValue={payee.name}
//                         id="payer_name"
//                       />
//                     </div>
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
//                         pattern="^\+\d{1,3}\d{9,13}$"
//                         id="contact_number"
//                         required
//                         name="contact_number"
//                         type="text"
//                         defaultValue={payee.contact}
//                       />
//                       <div className="text-xs text-danger">
//                         Please use with country code. (ex. +91)
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={closeModal}
//                 >
//                   Cancel
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditPayeeModal;

import React, { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";

const EditPayeeModal = ({ payee, closeModal }) => {
  const [formData, setFormData] = useState({
    payee_name: "", // Corrected to match the state key
    contact_number: "",
  });

  useEffect(() => {
    // Populate form data when payee changes
    console.log("Payee passed to modal:", payee);
    setFormData({
      payee_name: payee?.payee_name || "", // Ensure key matches state
      contact_number: payee?.contact_number || "",
    });
  }, [payee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putAPI(`/update_Payee/${payee._id}`, formData, true);
      if (!response.hasError) {
        toast.success("Payee updated successfully");
        closeModal(); // Close modal on success
      } else {
        toast.error(`Failed to update Payee: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the Payee.");
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040, 
       }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Payee
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="payee_name">Payee Name</label>
                <input
                  className="form-control"
                  name="payee_name" // Corrected name attribute
                  type="text"
                  value={formData.payee_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact_number">Contact Number</label>
                <input
                  className="form-control"
                  name="contact_number"
                  type="text"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPayeeModal;




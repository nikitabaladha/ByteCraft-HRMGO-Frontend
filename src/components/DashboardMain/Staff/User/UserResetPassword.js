// import React, { useState } from 'react';

// const UserResetPassword = ({user, onClose}) => {
//   const [password, setPassword] = useState('');
//   console.log("user from reset password popup", user)
//   const [passwordConfirmation, setPasswordConfirmation] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform form submission logic here
//     console.log('Password:', password);
//     console.log('Confirm Password:', passwordConfirmation);

//     // You can add your API call here, e.g., using fetch or axios
//     // Example:
//     // fetch('https://demo.workdo.io/hrmgo/user-reset-password/23', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ password, password_confirmation: passwordConfirmation }),
//     // })
//     // .then(response => response.json())
//     // .then(data => console.log(data))
//     // .catch(error => console.error('Error:', error));
//   };

//   return (
//     <div
//       className="modal fade show"
//       id="commonModal"
//       tabIndex="-1"
//       role="dialog"
//       aria-labelledby="exampleModalLabel"
//       aria-modal="true"
//       style={{ display: 'block' }}
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="exampleModalLabel">
//               Change Password
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//               onClick={onClose}
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form
//               onSubmit={handleSubmit}
//               className="needs-validation"
//               noValidate
//             >
//               <div className="row">
//                 <div className="form-group">
//                   <label htmlFor="password" className="col-form-label">
//                     Password
//                   </label>
//                   <span className="text-danger">*</span>
//                   <input
//                     id="password"
//                     type="password"
//                     className="form-control"
//                     name="password"
//                     required
//                     autoComplete="new-password"
//                     placeholder="Enter Your New Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="passwordConfirmation" className="col-form-label">
//                     Confirm Password
//                   </label>
//                   <span className="text-danger">*</span>
//                   <input
//                     id="passwordConfirmation"
//                     type="password"
//                     className="form-control"
//                     name="password_confirmation"
//                     required
//                     autoComplete="new-password"
//                     placeholder="Enter Your Confirm Password"
//                     value={passwordConfirmation}
//                     onChange={(e) => setPasswordConfirmation(e.target.value)}
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                   onClick={onClose}
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

// export default UserResetPassword;

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";

const UserResetPassword = ({ user, onClose }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match with Conform Password!");
      return;
    }

    try {
      const response = await putAPI(
        "/reset-password-user",
        {
          userId: user._id,
          newPassword: password,
        },
        {},
        true
      );

      if (!response.hasError) {
        toast.success(response.message || "Password updated successfully!");
        onClose();
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
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
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Change Password
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form
              onSubmit={handleUpdate}
              className="needs-validation"
              noValidate
            >
              <div className="row">
                <div className="form-group">
                  <label htmlFor="password" className="col-form-label">
                    Password
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    autoComplete="new-password"
                    placeholder="Enter Your New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="passwordConfirmation"
                    className="col-form-label"
                  >
                    Confirm Password
                  </label>
                  <span className="text-danger">*</span>
                  <input
                    id="passwordConfirmation"
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    required
                    autoComplete="new-password"
                    placeholder="Enter Your Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
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
    </div>
  );
};

export default UserResetPassword;

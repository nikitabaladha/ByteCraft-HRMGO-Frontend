// import React, { useState } from "react";
// import { toast } from 'react-toastify';
// import  postAPI  from '../../../../api/postAPI'; 

// const Modal = ({ onClose, employee}) => {
//     const [salaryType, setSalaryType] = useState( "");
//     const [salary, setSalary] = useState( "");
   
    
//     console.log("Employee ID:", employee.id);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const policyData = {
//           employeeId: employee.id,  
//           salaryType: salaryType,
//           salary: salary
//         };
    
//         try {
//           const response = await postAPI('/create_payrolltype', policyData, true);  
    
//           if (!response.hasError) {
//             toast.success('Salary Created Successfully');
//             onClose(); 
//           } else {
//             toast.error(`Failed to create salary: ${response.message}`);
//           }
//         } catch (error) {
//           toast.error('Salary record for this employee already exists.');
//         }
//       };

//     return (
//         <div className="modal fade show modal-overlay" style={{ display: "block" }} aria-labelledby="exampleModalLabel" aria-modal="true">
//             <div className="modal-dialog" role="document">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="exampleModalLabel">Set Basic Salary</h5>
//                         <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
//                     </div>
//                     <div className="modal-body">
//                         <form className="needs-validation" noValidate onSubmit={handleSubmit}>
//                             <div className="row">
//                                 <div className="form-group">
//                                     <label htmlFor="salary_type" className="col-form-label">
//                                         Payslip Type<span className="text-danger">*</span>
//                                     </label>
//                                     <select
//                                         className="form-control"
//                                         required
//                                         id="salary_type"
//                                         name="salaryType"
//                                         value={salaryType}
//                                         onChange={(e) => setSalaryType(e.target.value)}
//                                     >
//                                         <option value="">Select Payslip Type</option>
//                                         <option value="Monthly Payslip">Monthly Payslip</option>
//                                         <option value="Hourly Payslip">Hourly Payslip</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="salary" className="col-form-label">
//                                         Salary<span className="text-danger">*</span>
//                                     </label>
//                                     <input
//                                         className="form-control"
//                                         required
//                                         name="salary"
//                                         type="number"
//                                         id="salary"
//                                         value={salary}
//                                         onChange={(e) => setSalary(e.target.value)}
//                                     />
//                                 </div>
//                                 </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" onClick={onClose}>
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="btn btn-primary">
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import postAPI from "../../../../api/postAPI";
import getAPI from "../../../../api/getAPI";

const Modal = ({ onClose, employee, grandTotal }) => {
  const [salaryType, setSalaryType] = useState("");
  const [salary, setSalary] = useState("");
  const [payslipTypes, setPayslipTypes] = useState([]);

  useEffect(() => {
    const fetchPayslipTypes = async () => {
      try {
        const response = await getAPI("/payslip-type-get-all", true);
        if (!response.hasError) {
          setPayslipTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch payslip types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching payslip types.");
      }
    };

    fetchPayslipTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const policyData = {
      employeeId: employee.id,
      salaryType,
      salary,
      grandTotal,
    };

    try {
      const response = await postAPI("/create_payrolltype", policyData, true);

      if (!response.hasError) {
        toast.success("Salary Created Successfully");
        onClose();
      } else {
        toast.error(`Failed to create salary: ${response.message}`);
      }
    } catch (error) {
      toast.error("Salary record for this employee already exists.");
    }
  };

  return (
    <div
      className="modal fade show modal-overlay"
      style={{ display: "block" }}
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Set Basic Salary
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group">
                  <label htmlFor="salary_type" className="col-form-label">
                    Payslip Type<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    required
                    id="salary_type"
                    name="salaryType"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                  >
                    <option value="">Select Payslip Type</option>
                    {payslipTypes.map((type) => (
                      <option key={type._id} value={type.payslipType}>
                        {type.payslipType}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="salary" className="col-form-label">
                    Salary<span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    required
                    name="salary"
                    type="number"
                    id="salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;







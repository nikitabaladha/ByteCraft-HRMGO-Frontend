import React, { useState ,useEffect} from "react";
import postAPI from "../../../../api/postAPI.js"; 
import { toast } from "react-toastify"; 
import getAPI from "../../../../api/getAPI.js"; 

const AccountCreateModal = ({ isOpen, onClose }) => {
  const [accountName, setAccountName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [bankBranch, setBankBranch] = useState('');

  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [employeeNames, setEmployeeNames] = useState([]); 

  useEffect(() => {
    const fetchEmployeeNames = async () => {
      try {
        const response = await getAPI('/employee-get-all-name',{},true); 
        if (response.data && !response.data.hasError) {
          setEmployeeNames(response.data.data); 
        } else {
          toast.error("Failed to fetch employee names.");
        }
      } catch (error) {
        console.error("Error fetching employee names:", error);
        toast.error("An error occurred while fetching employee names.");
      }
    };

    fetchEmployeeNames();
  }, []); 

  if (!isOpen) return null; 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "account_name") setAccountName(value);
    if (name === "initial_balance") setInitialBalance(value);
    if (name === "account_number") setAccountNumber(value);
    if (name === "branch_code") setBranchCode(value);
    if (name === "bank_branch") setBankBranch(value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setErrorMessage(''); 
    setSuccessMessage(''); 

    
    const accountData = {
      account_name: accountName,
      initial_balance: initialBalance,
      account_number: accountNumber,
      branch_code: branchCode,
      bank_branch: bankBranch
    };

    try {
     
      const response = await postAPI('/Create-AccountList', accountData, true);

      if (!response.hasError) {
        toast.success("Account Created Successfully");
        onClose();
        
     
        setAccountName('');
        setInitialBalance('');
        setAccountNumber('');
        setBranchCode('');
        setBankBranch('');
        
      } else {
        toast.error(`Failed to create Account: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating account.");
    } 
      
  };

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block', paddingLeft: '0px', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}>
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Account</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="account_name" className="col-form-label">
                        Account Name
                        </label><span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required
                        name="account_name"
                        id="account_name"
                        value={accountName}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Account Name</option>
                        {employeeNames.map((employee) => (
                          <option key={employee._id} value={employee.name}>
                            {employee.name}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="initial_balance" className="col-form-label">
                        Initial Balance
                      </label><span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Initial Balance"
                        name="initial_balance"
                        type="number"
                        id="initial_balance"
                        value={initialBalance}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="account_number" className="col-form-label">
                        Account Number
                      </label><span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Account Number"
                        name="account_number"
                        type="number"
                        id="account_number"
                        value={accountNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="branch_code" className="col-form-label">
                        IFSC Code
                      </label><span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter IFSC Code"
                        name="branch_code"
                        type="text"
                        id="branch_code"
                        value={branchCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="bank_branch" className="col-form-label">
                        Bank Name
                      </label><span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        placeholder="Enter Bank Name"
                        name="bank_branch"
                        type="text"
                        id="bank_branch"
                        value={bankBranch}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              <div className="modal-footer">
                <input
                  type="button"
                  value="Cancel"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                />
                <input type="submit" value="Create" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCreateModal;






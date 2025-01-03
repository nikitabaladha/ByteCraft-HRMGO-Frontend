import React, { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI.js"; 
import { toast } from "react-toastify"; 

const AccountUpdateModal = ({ isOpen, onClose, accountData }) => {
  const [accountName, setAccountName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [bankBranch, setBankBranch] = useState('');
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  
  useEffect(() => {
    if (accountData) {
      setAccountName(accountData.account_name);
      setInitialBalance(accountData.initial_balance);
      setAccountNumber(accountData.account_number);
      setBranchCode(accountData.branch_code);
      setBankBranch(accountData.bank_branch);
    }
  }, [accountData]);

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
    setLoading(true);
    setErrorMessage(''); 

    const accountDataToUpdate = {
      account_name: accountName,
      initial_balance: initialBalance,
      account_number: accountNumber,
      branch_code: branchCode,
      bank_branch: bankBranch,
    };

    try {
      const response = await putAPI(`/Update-AccountList/${accountData._id}`, accountDataToUpdate, true);

      if (!response.hasError) {
        toast.success("Account Updated Successfully");
        onClose(); 
      } else {
        toast.error(`Failed to update Account: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the account.");
    } 
  };


  if (!isOpen) return null;

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block', paddingLeft: '0px', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}>
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Account</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="modal-body">
                {/* Form Fields */}
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="account_name" className="col-form-label">Account Name</label>
                      <input className="form-control" required name="account_name" type="text" id="account_name" value={accountName} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="initial_balance" className="col-form-label">Initial Balance</label>
                      <input className="form-control" required name="initial_balance" type="number" id="initial_balance" value={initialBalance} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="account_number" className="col-form-label">Account Number</label>
                      <input className="form-control" required name="account_number" type="text" id="account_number" value={accountNumber} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="branch_code" className="col-form-label">Branch Code</label>
                      <input className="form-control" required name="branch_code" type="text" id="branch_code" value={branchCode} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="bank_branch" className="col-form-label">Bank Branch</label>
                      <input className="form-control" required name="bank_branch" type="text" id="bank_branch" value={bankBranch} onChange={handleChange} />
                    </div>
                  </div>
                </div>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdateModal;

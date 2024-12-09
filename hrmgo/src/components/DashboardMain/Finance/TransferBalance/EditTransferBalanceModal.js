import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.js"; 
import putAPI from "../../../../api/putAPI.js"; // Use putAPI for updating data

const EditTransferBalanceModal = ({ isOpen, onClose, selectedTransferBalance }) => {
  const [currentDate, setCurrentDate] = useState(selectedTransferBalance?.date || null);
  const [fromAccountId, setFromAccountId] = useState(selectedTransferBalance?.fromAccountId || '');
  const [toAccountId, setToAccountId] = useState(selectedTransferBalance?.toAccountId || '');
  const [amount, setAmount] = useState(selectedTransferBalance?.amount || '');
  const [paymentTypeId, setPaymentTypeId] = useState(selectedTransferBalance?.paymentTypeId || '');
  const [referalId, setReferalId] = useState(selectedTransferBalance?.referalId || '');
  const [description, setDescription] = useState(selectedTransferBalance?.description || '');
  const [accountNames, setAccountNames] = useState([]);

  // Fetch account names
  useEffect(() => {
    const fetchAccountNames = async () => {
      try {
        const response = await getAPI('/AccountList-get-all', {}, true);
        if (response.data && !response.data.hasError) {
          setAccountNames(response.data.data);
        } else {
          toast.error("Failed to fetch account names.");
        }
      } catch (error) {
        console.error("Error fetching account names:", error);
        toast.error("An error occurred while fetching account names.");
      }
    };

    fetchAccountNames();
  }, []);

  // Handle Date Change
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  // Submit the form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const transferData = {
      fromAccountId,
      toAccountId,
      amount: parseFloat(amount),
      date: currentDate,
      paymentTypeId,
      referalId,
      description,
    };

    try {
      const response = await putAPI(`/update_transferbalance/${selectedTransferBalance._id}`, transferData, true);  // Use PUT to update transfer balance
      if (!response.hasError) {
        toast.success("Transfer Balance Updated Successfully");
        onClose();
      } else {
        toast.error(`Failed to update transfer balance: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the transfer balance.");
    }
  };

  if (!isOpen || !selectedTransferBalance) return null;

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block', paddingLeft: '0px', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Transfer Balance</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="from_account_id" className="col-form-label">From Account</label><span className="text-danger">*</span>
                    <select className="form-control" required id="from_account_id" name="fromAccountId" value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                      {accountNames.map((account) => (
                        <option key={account._id} value={account.account_name}>
                          {account.account_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="to_account_id" className="col-form-label">To Account</label><span className="text-danger">*</span>
                    <select className="form-control" required id="to_account_id" name="toAccountId" value={toAccountId} onChange={(e) => setToAccountId(e.target.value)}>
                      {accountNames.map((account) => (
                        <option key={account._id} value={account.account_name}>
                          {account.account_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="date" className="col-form-label">Date</label><span className="text-danger">*</span>
                    <div>
                    <DatePicker 
                      className="form-control d_week current_date datepicker-input" 
                      selected={currentDate ? new Date(currentDate) : null} 
                      onChange={handleDateChange}  
                      dateFormat="yyyy-MM-dd"  
                      required 
                      autoComplete="off" 
                      name="date" 
                      type="text" 
                      id="date" 
                      value={currentDate} 
                      style={{ width: '100%' }} 
                    />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="amount" className="col-form-label">Amount</label><span className="text-danger">*</span>
                    <input className="form-control" required type="number" step="0.01" placeholder="Enter Amount" id="amount" name="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="payment_type_id" className="col-form-label">Payment Method</label><span className="text-danger">*</span>
                    <select className="form-control" required id="payment_type_id" name="paymentTypeId" value={paymentTypeId} onChange={(e) => setPaymentTypeId(e.target.value)}>
                      <option value="">Choose Payment Method</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="referal_id" className="col-form-label">Ref#</label>
                    <input className="form-control" placeholder="Enter Ref#" id="referal_id" name="referalId" value={referalId} onChange={(e) => setReferalId(e.target.value)} />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="description" className="col-form-label">Description</label>
                    <textarea className="form-control" placeholder="Description" rows="3" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTransferBalanceModal;

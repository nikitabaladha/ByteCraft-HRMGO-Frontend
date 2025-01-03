import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import getAPI from "../../../../api/getAPI.js"; 
import postAPI from "../../../../api/postAPI.js"; 

const TransferBalanceModal = ({ isOpen, onClose }) => {
  const [accountNames, setAccountNames] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [fromAccountId, setFromAccountId] = useState('');
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentTypeId, setPaymentTypeId] = useState('');
  const [referalId, setReferalId] = useState('');
  const [description, setDescription] = useState('');
  const [paymentTypes, setPaymentTypes] = useState([]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await getAPI("/payment-type-get-all", {}, true);
        if (response.data && !response.data.hasError) {
          setPaymentTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch payment types: ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching payment types:", error);
        toast.error("An error occurred while fetching payment types.");
      }
    };

    fetchPaymentTypes();
  }, []);

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

  
  useEffect(() => {
    const now = new Date();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    const today = now.getFullYear() + "-" + month + "-" + day;
    setCurrentDate(today);
  }, []);

  const handleDateChange = (date) => {
    setCurrentDate(date);  
  };

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
      const response = await postAPI('/create_transferbalance', transferData, true); 
      if (!response.hasError) {
        toast.success("Transfer Balance Created Successfully");
        onClose(); 
      } else {
        toast.error(`Failed to create transfer balance: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the transfer balance.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Transfer Balance</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="from_account_id" className="col-form-label">From Account</label><span className="text-danger">*</span>
                    <select className="form-control" required id="from_account_id" name="fromAccountId" value={fromAccountId} onChange={(e) => setFromAccountId(e.target.value)}>
                    <option value="">Choose From Account</option>
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
                    <option value="">Choose To Account</option>
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
                        {paymentTypes.map((type) => (
                          <option key={type._id} value={type.paymentName}>
                            {type.paymentName}
                          </option>
                        ))}
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
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  TransferBalanceModal;

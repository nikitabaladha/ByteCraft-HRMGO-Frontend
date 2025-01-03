import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import postAPI from "../../../../api/postAPI.js";
import getAPI from "../../../../api/getAPI.js";

const ExpenseModal = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(null);
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [payeeId, setPayeeId] = useState('');
  const [paymentTypeId, setPaymentTypeId] = useState('');
  const [refId, setRefId] = useState('');
  const [description, setDescription] = useState('');
  const [accountNames, setAccountNames] = useState([]);
  const [payeeNames, setPayeeNames] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [expenseTypes, setExpenseTypes] = useState([]);


  useEffect(() => {
    const fetchExpenseTypes = async () => {
      try {
        const response = await getAPI("/expense-type-get-all", {}, true);
        if (response.data && !response.data.hasError) {
          setExpenseTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch expense types: ${response.message}`);
        }
      } catch (error) {
        console.error("Error fetching expense types:", error);
        toast.error("An error occurred while fetching expense types.");
      }
    };

    fetchExpenseTypes();
  }, []);


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
    const fetchPayeeNames = async () => {
      try {
        const response = await getAPI('/getall_Payee', {}, true);
        if (response.data && !response.data.hasError) {
          setPayeeNames(response.data.data);
        } else {
          toast.error("Failed to fetch payee names.");
        }
      } catch (error) {
        console.error("Error fetching payee names:", error);
        toast.error("An error occurred while fetching payee names.");
      }
    };

    fetchPayeeNames();
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

    const expenseData = {
      account_name: accountId,
      amount: parseFloat(amount),
      date: currentDate,
      category: category,
      payee_name: payeeId,
      payment_type: paymentTypeId,
      ref: refId,
      description: description,
    };

    try {

      const response = await postAPI('/create_expense', expenseData, true);
      if (!response.hasError) {
        toast.success("Expense Created Successfully");
        onClose();
      } else {
        toast.error(`Failed to create expense: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the expense.");
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Expense</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <form method="POST" action="https://demo.workdo.io/hrmgo/expense" acceptCharset="UTF-8" className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  {/* Account Field */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="account_id" className="col-form-label">Account</label><span className="text-danger">*</span>
                      <select className="form-control" required id="account_id" name="account_id" onChange={(e) => setAccountId(e.target.value)}>
                      <option value="">Select Account Name</option>
                        {accountNames.map((account) => (
                          <option key={account._id} value={account.account_name}>
                            {account.account_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Amount Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="amount" className="col-form-label">Amount</label><span className="text-danger">*</span>
                      <input className="form-control" required placeholder="Amount" step="0.01" name="amount" type="number" id="amount" onChange={(e) => setAmount(e.target.value)} />
                    </div>
                  </div>

                  {/* Date Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="date" className="col-form-label">Date</label><span className="text-danger">*</span>
                      <div>
                        <DatePicker
                          className="form-control d_week current_date datepicker-input"
                          selected={currentDate ? new Date(currentDate) : null} // Pass selected date
                          onChange={handleDateChange}  // Update state on date change
                          dateFormat="yyyy-MM-dd"
                          required
                          autoComplete="off"
                          name="date"
                          type="text"
                          id="date"
                          value={currentDate}
                          style={{ width: '100%' }} // Apply width style here
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="income_category_id" className="col-form-label">Category</label><span className="text-danger">*</span>
                      <select className="form-control" required id="income_category_id" name="income_category_id" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose a Category</option>
                        {expenseTypes.map((expenseType) => (
                          <option key={expenseType._id} value={expenseType.expenseName}>
                            {expenseType.expenseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Payee Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="payee_id" className="col-form-label">Payee</label>
                      <select className="form-control" id="payee_id" name="payee_id" onChange={(e) => setPayeeId(e.target.value)}>
                      <option value="">Choose a payee</option>
                        {payeeNames.map((payee) => (
                          <option key={payee._id} value={payee.payee_name}>
                            {payee.payee_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Payment Method Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="payment_type_id" className="col-form-label">Payment Method</label><span className="text-danger">*</span>
                      <select className="form-control" required id="payment_type_id" name="payment_type_id" onChange={(e) => setPaymentTypeId(e.target.value)}>
                        <option value="">Choose Payment Method</option>
                        {paymentTypes.map((type) => (
                          <option key={type._id} value={type.paymentName}>
                            {type.paymentName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Ref# Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="referral_id" className="col-form-label">Ref#</label>
                      <input className="form-control" placeholder="Enter Ref#" name="referral_id" type="text" id="referral_id" onChange={(e) => setRefId(e.target.value)} />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="description" className="col-form-label">Description</label>
                      <textarea className="form-control" placeholder="Description" rows="3" name="description" id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <input type="button" value="Cancel" onClick={onClose} className="btn btn-secondary" data-bs-dismiss="modal" />
                <input type="submit" value="Create" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseModal;

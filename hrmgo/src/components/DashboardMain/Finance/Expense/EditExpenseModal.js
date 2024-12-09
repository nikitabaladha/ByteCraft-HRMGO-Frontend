import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for date picker
import { toast } from "react-toastify";
import putAPI from "../../../../api/putAPI.js";  // Import the putAPI method
import getAPI from "../../../../api/getAPI.js";

const EditExpenseModal = ({ isOpen, onClose, selectedExpense }) => {
  const [currentDate, setCurrentDate] = useState(selectedExpense?.date || null);
  const [accountname, setAccountId] = useState(selectedExpense?.account_name || '');
  const [amount, setAmount] = useState(selectedExpense?.amount || '');
  const [category, setCategory] = useState(selectedExpense?.category || '');
  const [payeeName, setPayeeId] = useState(selectedExpense?.payee_name || '');  // Changed from payer_name to payee_name
  const [paymentType, setPaymentTypeId] = useState(selectedExpense?.payment_type || '');
  const [ref, setRefId] = useState(selectedExpense?.ref || '');
  const [description, setDescription] = useState(selectedExpense?.description || '');
  const [accountNames, setAccountNames] = useState([]);
  const [payeeNames, setPayeeNames] = useState([]);  // Changed from payerNames to payeeNames

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
        const response = await getAPI('/getall_Payee', {}, true);  // Changed from /getall_Payer to /getall_Payee
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
    if (selectedExpense) {
      setCurrentDate(selectedExpense.date);
      setAccountId(selectedExpense.account_name);
      setAmount(selectedExpense.amount);
      setCategory(selectedExpense.category);
      setPayeeId(selectedExpense.payee_name);  // Changed from payer_name to payee_name
      setPaymentTypeId(selectedExpense.payment_type);
      setRefId(selectedExpense.ref);
      setDescription(selectedExpense.description);
    }
  }, [selectedExpense]);

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      account_name: accountname,
      amount: parseFloat(amount),
      date: currentDate,
      category: category,
      payee_name: payeeName,  // Changed from payer_name to payee_name
      payment_type: paymentType,
      ref: ref,
      description: description,
    };

    try {
      const response = await putAPI(`/update_expense/${selectedExpense._id}`, expenseData, true);  // Changed from update_deposit to update_expense
      if (!response.hasError) {
        toast.success("Expense Updated Successfully");
        onClose();
      } else {
        toast.error(`Failed to update expense: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the expense.");
    }
  };

  if (!isOpen || !selectedExpense) return null;

  return (
    <div className="modal fade show" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block', paddingLeft: '0px', position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Expense</h5>  {/* Changed from Edit Deposit to Edit Expense */}
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
                      <select className="form-control" required id="account_id" value={accountname} name="account_id" onChange={(e) => setAccountId(e.target.value)}>
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
                      <input className="form-control" required placeholder="Amount" step="0.01" name="amount" type="number" value={amount} id="amount" onChange={(e) => setAmount(e.target.value)} />
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
                          value={currentDate}
                          onChange={handleDateChange}  // Update state on date change
                          dateFormat="yyyy-MM-dd"
                          required
                          autoComplete="off"
                          name="date"
                          type="text"
                          id="date"
                          style={{ width: '100%' }} // Apply width style here
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="income_category_id" className="col-form-label">Category</label><span className="text-danger">*</span>
                      <select className="form-control" required id="income_category_id" value={category} name="income_category_id" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose a Category</option>
                        <option value="Event">Event</option>
                        <option value="Extra Expense">Extra Expense</option>
                        <option value="Rent or Lease">Rent or Lease</option>
                      </select>
                    </div>
                  </div>

                  {/* Payee Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="payee_id" className="col-form-label">Payee</label>  {/* Changed from Payer to Payee */}
                      <select className="form-control" id="payee_id" name="payee_id" value={payeeName} onChange={(e) => setPayeeId(e.target.value)}>
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
                      <select className="form-control" required id="payment_type_id" value={paymentType} name="payment_type_id" onChange={(e) => setPaymentTypeId(e.target.value)}>
                        <option value="">Choose Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank">Bank</option>
                      </select>
                    </div>
                  </div>

                  {/* Ref# Field */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="referal_id" className="col-form-label">Ref#</label>
                      <input className="form-control" placeholder="Enter Ref#" name="referal_id" value={ref} type="text" id="referal_id" onChange={(e) => setRefId(e.target.value)} />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="description" className="col-form-label">Description</label>
                      <textarea className="form-control" placeholder="Description" value={description} rows="3" name="description" id="description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <input type="button" value="Cancel" onClick={onClose} className="btn btn-secondary" data-bs-dismiss="modal" />
                <input type="submit" value="Update" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;

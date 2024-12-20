import React, { useState } from 'react';
import { toast } from 'react-toastify';
import postAPI from '../../../../api/postAPI';

const CreateOtherPaymentModal = ({ onClose, employee ,toggleUpdateNetSalaryModal}) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Fixed');
    const [amount, setAmount] = useState('');
    const baseAmount = 1000;

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let calculatedAmount = 0;
        if (type === 'Percentage') {
            const numericPercentage = parseFloat(amount);
            if (isNaN(numericPercentage) || numericPercentage <= 0) {
                toast.error('Please enter a valid percentage.');
                return;
            }
            calculatedAmount = (baseAmount * numericPercentage) / 100;
        } else {
            calculatedAmount = parseFloat(amount) || baseAmount;
        }

        const paymentData = {
            employeeId: employee.id,
            employeeName: employee.name,
            title: title,
            type: type,
            amount: calculatedAmount,
        };

        try {
            const response = await postAPI('/create_otherpayment', paymentData, true);
            if (!response.hasError) {
                toast.success('Other Deduction Created Successfully');
                toggleUpdateNetSalaryModal();
                onClose();
            } else {
                toast.error(`Failed to create Other Deduction: ${response.message}`);
            }
        } catch (error) {
            toast.error('Error occurred while creating Other Deduction.');
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-md modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Other Deduction</h5>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit} method="POST" acceptCharset="UTF-8" className="needs-validation" noValidate>
                        <div className="modal-body">
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="title" className="col-form-label">Title</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        placeholder="Enter Title"
                                        name="title"
                                        type="text"
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="type" className="col-form-label">Type</label><span className="text-danger">*</span>
                                    <select
                                        className="form-control"
                                        required
                                        id="type"
                                        name="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option value="Fixed">Fixed</option>
                                        <option value="Percentage">Percentage</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="amount" className="col-form-label">Amount</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        step="0.01"
                                        placeholder="Enter Amount"
                                        name="amount"
                                        type="number"
                                        id="amount"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" value="Cancel" className="btn btn-secondary"  onClick={onClose} />
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateOtherPaymentModal;
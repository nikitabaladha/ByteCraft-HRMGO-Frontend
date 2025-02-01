import React, { useState } from 'react';
import { toast } from 'react-toastify';
import postAPI from '../../../../api/postAPI';
import { Link } from 'react-router-dom';

const CreateCommissionModal = ({ onClose, employee }) => {
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

        const commissionData = {
            employeeId: employee.id,
            employeeName: employee.name,
            title: title,
            type: type,
            amount: calculatedAmount,
        };

        try {
            const response = await postAPI('/create_commission', commissionData, true);

            if (!response.hasError) {
                toast.success('Commission Created Successfully');
                onClose();
            } else {
                toast.error(`Failed to create commission: ${response.message}`);
            }
        } catch (error) {
            toast.error('Error occurred while creating commission.');
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Commission</h5>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="card-footer text-end">
                                <Link href="#" className="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-url="https://demo.workdo.io/hrmgo/generate/commission" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
                                    <i className="fas fa-robot"></i> Generate With AI
                                </Link>
                            </div>

                            <div className="row">
                                <div className="form-group">
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

                                <div className="form-group">
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

                                <div className="form-group">
                                    <label htmlFor="amount" className="col-form-label">Amount</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        step="0.01"
                                        placeholder="Enter Amount"
                                        autoComplete="off"
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
                            <button type="button" onClick={onClose} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCommissionModal;

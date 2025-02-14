import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import putAPI from '../../../../api/putAPI'; 
import getAPI from '../../../../api/getAPI';

const UpdateLoanModal = ({ onClose, employee, loanData}) => {
    const [loanOption, setLoanOption] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Fixed');
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
       const [loanOptions, setLoanOptions] = useState([]);
    const baseAmount = 1000;

    useEffect(() => {
        const fetchLoanOptions = async () => {
            try {
                const response = await getAPI('/loan-option-get-all', true);
                if (!response.hasError) {
                    setLoanOptions(response.data.data); 
                } else {
                    toast.error(`Failed to fetch loan options: ${response.message}`);
                }
            } catch (error) {
                toast.error('An error occurred while fetching loan options.');
            }
        };

        fetchLoanOptions();
    }, []);

    useEffect(() => {
        if (loanData) {
            setLoanOption(loanData.loanOption);
            setTitle(loanData.title);
            setType(loanData.type);
            setAmount(loanData.amount);
            setReason(loanData.reason);
        }
    }, [loanData]);

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

        const updatedLoanData = {
            employeeId: employee.id,
            employeeName: employee.name,
            title: title,
            loanOption: loanOption,
            type: type,
            amount: calculatedAmount,
            reason: reason,
        };

        try {
         
            const response = await putAPI(`/updateloan/${loanData._id}`, updatedLoanData, true);
        
            if (!response.hasError) {
                toast.success('Loan Updated Successfully');
                onClose();
            } else {
                toast.error(`Failed to update loan: ${response.message}`);
            }
        } catch (error) {
            toast.error('Error occurred while updating loan.');
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-md modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Loan Deduction</h5>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit} method="POST" className="needs-validation" noValidate>
                        <input name="_token" type="hidden" value="PBlEztkrXr5o6EoYBvViDCeTKfO8flRfCVfW4G5R" />
                        <input name="employee_id" type="hidden" />
                        <div className="modal-body">
                            <div className="card-footer text-end">
                                <Link href="#" className="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-url="https://demo.workdo.io/hrmgo/generate/loan" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
                                    <i className="fas fa-robot"></i> Generate With AI
                                </Link>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
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
                                    <label htmlFor="loan_option" className="col-form-label">Loan Options</label><span className="text-danger">*</span>
                                    <select
                                        className="form-control"
                                        required
                                        id="loan_option"
                                        name="loan_option"
                                        value={loanOption}
                                        onChange={(e) => setLoanOption(e.target.value)}
                                    >
                                            <option value="">Select Loan Option</option>
                                           {loanOptions.map((option) => (
                                            <option key={option._id} value={option.loanName}>
                                                {option.loanName}
                                            </option>
                                        ))}
                                    </select>
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
                                    <label htmlFor="amount" className="col-form-label">Loan Amount</label><span className="text-danger">*</span>
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

                                <div className="form-group col-md-12">
                                    <label htmlFor="reason" className="col-form-label">Reason</label><span className="text-danger">*</span>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        required
                                        placeholder="Enter Reason"
                                        name="reason"
                                        id="reason"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                        <input type="button" value="Cancel" className="btn btn-secondary"  onClick={onClose} />
                        <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateLoanModal;

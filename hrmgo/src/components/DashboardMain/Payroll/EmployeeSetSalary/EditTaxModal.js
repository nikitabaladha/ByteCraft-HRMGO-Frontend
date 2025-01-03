import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import putAPI from '../../../../api/putAPI'; 
import getAPI from '../../../../api/getAPI';

const UpdateTaxModal = ({ onClose, employee, taxData}) => {
    const [taxes, setTaxes] = useState('');
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Fixed');
    const [amount, setAmount] = useState('');
    const [taxOptions, setTaxOptions] = useState([]);
    const baseAmount = 1000;

    useEffect(() => {
        const fetchTaxOptions = async () => {
            try {
                const response = await getAPI('/deduction-option-get-all',true); 
                if (!response.hasError) {
                    setTaxOptions(response.data.data); 
                } else {
                    toast.error(`Failed to fetch tax options: ${response.message}`);
                }
            } catch (error) {
                toast.error("An error occurred while fetching tax options.");
            }
        };

        fetchTaxOptions();
    }, []);

    useEffect(() => {
        if (taxData) {
            setTaxes(taxData.taxes);
            setTitle(taxData.title);
            setType(taxData.type);
            setAmount(taxData.amount);
        }
    }, [taxData]);

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

        const updatedTaxData = {
            employeeId: employee.id,
            employeeName: employee.name,
            title: title,
            taxes: taxes,
            type: type,
            amount: calculatedAmount,
        };

        try {
            const response = await putAPI(`/updatetax/${taxData._id}`, updatedTaxData, true);
        
            if (!response.hasError) {
                toast.success('Tax Updated Successfully');
                onClose();
            } else {
                toast.error(`Failed to update tax: ${response.message}`);
            }
        } catch (error) {
            toast.error('Error occurred while updating tax.');
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-md modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Tax Deduction</h5>
                        <button type="button" onClick={onClose} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit} method="POST" className="needs-validation" noValidate>
                        <input name="_token" type="hidden" value="PBlEztkrXr5o6EoYBvViDCeTKfO8flRfCVfW4G5R" />
                        <input name="employee_id" type="hidden" />
                        <div className="modal-body">
                            <div className="card-footer text-end">
                                <Link href="#" className="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-url="https://demo.workdo.io/hrmgo/generate/tax" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
                                    <i className="fas fa-robot"></i> Generate With AI
                                </Link>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="title" className="col-form-label">Title</label><span className="text-danger">*</span>
                                    <select
                                        className="form-control"
                                        required
                                        id="taxes"
                                        name="taxes"
                                        value={taxes}
                                        onChange={(e) => setTaxes(e.target.value)}
                                    >
                                        <option value="">Select Taxes</option>
                                        {taxOptions.map((taxOption) => (
                                            <option key={taxOption._id} value={taxOption.deductionName}>{taxOption.deductionName}</option>  
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-md-6">
                                    <label htmlFor="taxes" className="col-form-label">Taxes</label><span className="text-danger">*</span>
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
                                    <label htmlFor="amount" className="col-form-label">Tax Amount</label><span className="text-danger">*</span>
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
                        <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaxModal;

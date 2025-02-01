import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import putAPI from '../../../../api/putAPI';

const EditOvertimeModal = ({ onClose, employee, overtimeData}) => {
    const [title, setTitle] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [hours, setHours] = useState('');
    const [amount, setRate] = useState('');

    useEffect(() => {
        if (overtimeData) {
            setTitle(overtimeData.title);
            setNumberOfDays(overtimeData.numberOfDays);
            setHours(overtimeData.hours);
            setRate(overtimeData.amount);
        }
    }, [overtimeData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedOvertimeData = {
            employeeId: employee.id,
            employeeName: employee.name,
            title: title,
            numberOfDays: numberOfDays,
            hours: hours,
            amount: parseFloat(amount) || 0,
        };

        try {
            const response = await putAPI(`/updateovertime/${overtimeData._id}`, updatedOvertimeData, true);

            if (!response.hasError) {
                toast.success('Overtime Updated Successfully');
                onClose();
            } else {
                toast.error(`Failed to update overtime: ${response.message}`);
            }
        } catch (error) {
            toast.error('Error occurred while updating overtime.');
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-lg modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Overtime</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <form method="POST" className="needs-validation" noValidate onSubmit={handleSubmit}>
                        <input name="_token" type="hidden" value="1UQqfCPtfBqtDR2dy3MAMmpeCd2m0ES7nCQxTiKw" />
                        <input name="employee_id" type="hidden" />
                        <div className="modal-body">
                            <div className="card-footer text-end">
                                <Link href="#" className="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-url="https://demo.workdo.io/hrmgo/generate/overtime" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
                                    <i className="fas fa-robot"></i> Generate With AI
                                </Link>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="title" className="col-form-label">Overtime Title</label><span className="text-danger">*</span>
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
                                <div className="form-group col-md-4">
                                    <label htmlFor="number_of_days" className="col-form-label">Number of days</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        step="0.01"
                                        placeholder="Enter Number of days"
                                        name="number_of_days"
                                        type="number"
                                        id="number_of_days"
                                        value={numberOfDays}
                                        onChange={(e) => setNumberOfDays(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="hours" className="col-form-label">Hours</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        step="0.01"
                                        placeholder="Enter Hours"
                                        name="hours"
                                        type="number"
                                        id="hours"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="rate" className="col-form-label">Rate</label><span className="text-danger">*</span>
                                    <input
                                        className="form-control"
                                        required
                                        step="0.01"
                                        placeholder="Enter Rate"
                                        name="rate"
                                        type="number"
                                        id="rate"
                                        value={amount}
                                        onChange={(e) => setRate(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <input type="button" value="Cancel" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose} />
                            <input type="submit" value="Update" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditOvertimeModal;

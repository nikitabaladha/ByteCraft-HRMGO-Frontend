import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import putAPI from "../../../../api/putAPI.js";


const EditLeaveTypeModal = ({ closeModal, leaveType }) => {
    const [name, setName] = useState('');
    const [daysPerYear, setDaysPerYear] = useState('');

    useEffect(() => {
        if (leaveType) {
            setName(leaveType.leaveTypeName);
            setDaysPerYear(leaveType.daysPerYear);
        }
    }, [leaveType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!leaveType?._id) {
            toast.error("Invalid leave type details.");
            return;
        }

        const leaveTypeData = {
            leaveTypeName: name,
            daysPerYear,
        };

        try {
            const response = await putAPI(`/update-leave-type/${leaveType._id}`, leaveTypeData, true);

            if (!response.hasError) {
                toast.success("Leave Type updated successfully");
                closeModal();
            } else {
                toast.error(`Failed to update leave type: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while updating the leave type.");
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Leave Type</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Name</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Leave Type Name"
                                                    name="name"
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="daysPerYear" className="form-label">Days per Year</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Days per Year"
                                                    name="daysPerYear"
                                                    type="number"
                                                    id="daysPerYear"
                                                    value={daysPerYear}
                                                    onChange={(e) => setDaysPerYear(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditLeaveTypeModal;

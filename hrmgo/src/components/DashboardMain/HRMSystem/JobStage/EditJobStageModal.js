import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import putAPI from "../../../../api/putAPI.js";

const EditJobStageModal = ({ closeModal, jobStage }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (jobStage) {
            setName(jobStage.stageName);
        }
    }, [jobStage]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobStage?._id) {
            toast.error("Invalid job stage details.");
            return;
        }

        const jobStageData = {
            stageName: name,
        };

        try {
            const response = await putAPI(`/update-job-stage/${jobStage._id}`, jobStageData, true);

            if (!response.hasError) {
                toast.success("Job stage updated successfully");
                closeModal();
            } else {
                toast.error(`Failed to update job stage: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while updating the job stage.");
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Job Stage</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Title</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Stage Title"
                                                    name="name"
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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

export default EditJobStageModal;

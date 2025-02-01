import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
import postAPI from "../../../../api/postAPI.js";

const CreateDocumentTypeModal = ({ closeModal }) => {
    const [name, setName] = useState('');
    const [isRequired, setIsRequired] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const documentData = {
            documentType: name,
            isRequired: isRequired,
        };

        try {
            const response = await postAPI('/document-type', documentData, true);

            if (!response.hasError) {
                toast.success("Document Type Created Successfully");
                closeModal();
            } else {
                toast.error(`Failed to create document type: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while creating the document type.");
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create New Document Type</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <input name="_token" type="hidden" value="9Nkf2xqTxvNdcL6qbjpAO4Bsjd5kvEZUVXG7qBWX" />
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Name</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Document Name"
                                                    name="name"
                                                    type="text"
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="is_required" className="form-label">Required Field</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <select
                                                    className="form-control"
                                                    id="is_required"
                                                    name="is_required"
                                                    value={isRequired}
                                                    onChange={(e) => setIsRequired(e.target.value)}
                                                >
                                                    <option value="">Select Department</option>
                                                    <option value="Not Required">Not Required</option>
                                                    <option value="Required">Is Required</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <input type="button" value="Cancel" className="btn btn-secondary" onClick={closeModal} />
                                <input type="submit" value="Create" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDocumentTypeModal;

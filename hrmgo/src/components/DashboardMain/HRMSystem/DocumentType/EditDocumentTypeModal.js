import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 
import putAPI from "../../../../api/putAPI.js";

const EditDocumentTypeModal = ({ closeModal, documentType }) => {
    const [name, setName] = useState('');
    const [isRequired, setIsRequired] = useState('');

    useEffect(() => {
        if (documentType) {
            setName(documentType.documentType);
            setIsRequired(documentType.isRequired);
        }
    }, [documentType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Document type name is required.");
            return;
        }

        if (!documentType?._id) {
            toast.error("Invalid document type details.");
            return;
        }

        const documentData = {
            documentType: name,
            isRequired,
        };

        try {
            const response = await putAPI(`/update-document-type/${documentType._id}`, documentData, true);

            if (!response.hasError) {
                toast.success("Document type updated successfully");
                closeModal();
            } else {
                toast.error(`Failed to update document type: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while updating the document type.");
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Document Type</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label"> Name</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Enter Document Type Name"
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
                                            <label htmlFor="isRequired" className="form-label">Required Field</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <select
                                                    className="form-control"
                                                    id="isRequired"
                                                    name="isRequired"
                                                    value={isRequired}
                                                    onChange={(e) => setIsRequired(e.target.value)}
                                                >
                                                    <option value="Not Required">Not Required</option>
                                                    <option value="Required">Is Required</option>
                                                </select>
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

export default EditDocumentTypeModal;

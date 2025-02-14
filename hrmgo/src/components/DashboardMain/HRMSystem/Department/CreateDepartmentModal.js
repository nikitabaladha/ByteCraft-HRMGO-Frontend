import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import postAPI from "../../../../api/postAPI.js";
import getAPI from "../../../../api/getAPI";

const CreateDepartmentModal = ({ closeModal }) => {
    const [branchId, setBranchId] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getAPI("/branch-get-all", true); 
                if (!response.hasError) {
                    setBranches(response.data.data); 
                } else {
                    toast.error(`Failed to fetch branches: ${response.message}`);
                }
            } catch (error) {
                toast.error("An error occurred while fetching branches.");
            }
        };

        fetchBranches();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const departmentData = {
            departmentName,
            branchId,
        };

        try {
            const response = await postAPI('/department', departmentData, true); 

            if (!response.hasError) {
                toast.success("Department Created Successfully");
                closeModal();
            } else {
                toast.error(`Failed to create department: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while creating the department.");
        }
    };

    const handleBranchChange = (e) => {
        setBranchId(e.target.value);
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create New Department</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                            <input name="_token" type="hidden" value="OYzJQFXWqx1d9iWbHPH2ntDxxtmt4I8jLovG1Fuv" />
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="branch_id" className="form-label">Branch</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <select
                                                    className="form-control"
                                                    required
                                                    id="branch_id"
                                                    name="branch_id"
                                                    value={branchId}
                                                    onChange={handleBranchChange}
                                                >
                                                    <option value="">Select Branch</option>
                                                    {branches.map((branch) => (
                                                        <option key={branch._id} value={branch._id}>
                                                            {branch.branchName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="department_name" className="form-label">Name</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Department Name"
                                                    name="department_name"
                                                    type="text"
                                                    id="department_name"
                                                    value={departmentName}
                                                    onChange={(e) => setDepartmentName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDepartmentModal;

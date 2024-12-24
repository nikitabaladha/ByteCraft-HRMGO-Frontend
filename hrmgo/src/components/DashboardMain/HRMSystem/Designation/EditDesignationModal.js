import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import putAPI from "../../../../api/putAPI";
import getAPI from "../../../../api/getAPI";

const EditDesignationModal = ({ closeModal, designation }) => {
    const [branchId, setBranchId] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [designationName, setDesignationName] = useState('');
    const [branches, setBranches] = useState([]);
    const [departments, setDepartments] = useState([]);

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

        if (designation) {
            setBranchId(designation.branchId._id);
            setDepartmentId(designation.departmentId._id);
            setDesignationName(designation.designationName);

            // Fetch departments after the designation is loaded
            const fetchDepartments = async () => {
                if (designation.branchId) {
                    try {
                        const response = await getAPI(
                            `/department-get-all-by-branch-id?branchId=${designation.branchId._id}`,
                            {},
                            true
                        );
                        if (!response.hasError && Array.isArray(response.data.data)) {
                            setDepartments(response.data.data);
                        } else {
                            toast.error("Failed to load departments.");
                        }
                    } catch (err) {
                        toast.error("Error fetching departments.");
                    }
                }
            };

            fetchDepartments();
        }
    }, [designation]);

    const handleBranchChange = async (e) => {
        const branchId = e.target.value;
        setBranchId(branchId);
        setDepartments([]);

        if (branchId) {
            try {
                const response = await getAPI(
                    `/department-get-all-by-branch-id?branchId=${branchId}`,
                    {},
                    true
                );
                if (!response.hasError && Array.isArray(response.data.data)) {
                    setDepartments(response.data.data);
                } else {
                    toast.error("Failed to load departments.");
                }
            } catch (err) {
                toast.error("Error fetching departments.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedDesignation = {
            designationName,
            branchId,
            departmentId,
        };

        try {
            const response = await putAPI(`/update-designation/${designation._id}`, updatedDesignation, true);

            if (!response.hasError) {
                toast.success("Designation Updated Successfully");
                closeModal();
            } else {
                toast.error(`Failed to update designation: ${response.message}`);
            }
        } catch (error) {
            toast.error("An error occurred while updating the designation.");
        }
    };

    return (
        <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
            <div className="modal-dialog modal-undefined" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Designation</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="body">
                        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
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
                                            <label htmlFor="department_id" className="form-label">Department</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <select
                                                    className="form-control"
                                                    required
                                                    id="department_id"
                                                    name="department_id"
                                                    value={departmentId}
                                                    onChange={(e) => setDepartmentId(e.target.value)}
                                                >
                                                    <option value="">Select Department</option>
                                                    {departments.map((department) => (
                                                        <option key={department._id} value={department._id}>
                                                            {department.departmentName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="designation_name" className="form-label">Designation Name</label><span className="text-danger">*</span>
                                            <div className="form-icon-user">
                                                <input
                                                    className="form-control"
                                                    required
                                                    placeholder="Designation Name"
                                                    name="designation_name"
                                                    type="text"
                                                    id="designation_name"
                                                    value={designationName}
                                                    onChange={(e) => setDesignationName(e.target.value)}
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

export default EditDesignationModal;

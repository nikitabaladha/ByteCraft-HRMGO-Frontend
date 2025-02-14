import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import  putAPI  from "../../../api/putAPI"; 
import getAPI from  "../../../api/getAPI";

const EditPolicyModal = ({ onClose, policy }) => {
  const [branchNames, setBranchNames] = useState([]);
  const [formData, setFormData] = useState({
    branch: policy?.branch || '',
    title: policy?.title || '',
    description: policy?.description || ''
  });

  useEffect(() => {
    const fetchBranchNames = async () => {
      try {
        const response = await getAPI('/branch-get-all', {}, true);
        if (response.data && !response.data.hasError) {
          setBranchNames(response.data.data);
        } else {
          toast.error("Failed to fetch branch names.");
        }
      } catch (error) {
        console.error("Error fetching branch names:", error);
        toast.error("An error occurred while fetching branch names.");
      }
    };

    fetchBranchNames();
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPolicy = {
      branch: formData.branch,
      title: formData.title,
      description: formData.description
    };

    try {
      const response = await putAPI(`/updatecompany_policy/${policy._id}`, updatedPolicy, true);

      if (!response.hasError) {
        toast.success("Company policy updated successfully!");
        onClose(); 
      } else {
        toast.error(`Failed to update company policy: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating company policy.");
    }
  };

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Company Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <form method="POST" onSubmit={handleSubmit} className="needs-validation" noValidate>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="branch" className="form-label">Branch</label><span className="text-danger">*</span>
                      <div className="form-icon-user">
                        <select
                          className="form-control"
                          required
                          id="branch"
                          name="branch"
                          value={formData.branch}
                          onChange={handleChange}
                        >
                          <option value="">Select Branch</option>
                          {branchNames.map((branch) => (
                            <option key={branch._id} value={branch.branchName}>
                              {branch.branchName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">Title</label><span className="text-danger">*</span>
                      <div className="form-icon-user">
                        <input
                          className="form-control"
                          required
                          placeholder="Enter Company Policy Title"
                          name="title"
                          type="text"
                          id="title"
                          value={formData.title}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">Description</label>
                      <div className="form-icon-user">
                        <textarea
                          className="form-control"
                          rows="6"
                          placeholder="Enter Description"
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
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
    </div>
  );
};

export default EditPolicyModal;

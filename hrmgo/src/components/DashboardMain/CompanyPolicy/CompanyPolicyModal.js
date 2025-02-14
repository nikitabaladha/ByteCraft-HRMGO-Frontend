import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import getAPI from "../../../api/getAPI";
import { Link } from "react-router-dom";
import postAPI from "../../../api/postAPI";

const CreatePolicyModal = ({ onClose }) => {
  const [branch, setBranch] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [branchNames, setBranchNames] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const policyData = {
      branch,
      title,
      description,
    };

    try {
      const response = await postAPI('/createcompany_policy', policyData, true);
      
      if (!response.hasError) {
        toast.success("Company Policy Created Successfully");
        onClose();
      } else {
        toast.error(`Failed to create policy: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the policy.");
    }
  };

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" aria-labelledby="exampleModalLabel" style={{ display: 'block' }} aria-modal="true" role="dialog">
      <div className="modal-dialog modal-lg modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Company Policy</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="body">
            <form method="POST"  onSubmit={handleSubmit} action="https://demo.workdo.io/hrmgo/company-policy" acceptCharset="UTF-8" encType="multipart/form-data" className="needs-validation" noValidate>
              <input name="_token" type="hidden" value="mk5mLbOtoudKEfEv857K3B9oUup58se2KxNTlOEa" />
              <div className="modal-body">
                <div className="text-end">
                  <Link to="https://demo.workdo.io/hrmgo/generate/company-policy" className="btn btn-sm btn-primary" data-size="medium" data-ajax-popup-over="true" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate" data-title="Generate Content With AI">
                    <i className="fas fa-robot"></i> Generate With AI
                  </Link>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="branch" className="form-label">Branch</label><span className="text-danger">*</span>
                      <div className="form-icon-user">
                        <select className="form-control" 
                        required id="branch"
                         name="branch" 
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}>
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
                        <input className="form-control" 
                        required placeholder="Enter Company Policy Title" 
                        name="title" 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="description" className="form-label">Description</label>
                      <div className="form-icon-user">
                        <textarea className="form-control" rows="6" 
                        placeholder="Enter Description" 
                        name="description" 
                        cols="50" 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}>
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" value="Cancel" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose} />
                <input type="submit" value="Create" className="btn btn-primary" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePolicyModal;

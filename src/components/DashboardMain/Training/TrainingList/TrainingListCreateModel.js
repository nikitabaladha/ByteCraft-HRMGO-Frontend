import React, { useState, useEffect } from "react";
import postAPI from "../../../../api/postAPI";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";

const TrainingListCreateModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    branch: "",
    trainerOption: "0",
    trainingType: "1",
    trainer: "",
    trainingCost: "",
    employee: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [branches, setBranches] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await getAPI(`/branch-get-all`, {}, true); 
        if (response.data && response.data.data) {
          setBranches(response.data.data);
        } else {
          toast.error("Failed to fetch branches.");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
        toast.error("An error occurred while fetching branches.");
      }
    };

    const fetchEmployeeData = async () => {
        try {
          const response = await getAPI(`/employee-get-all`, {}, true);
          if (
            !response.hasError &&
            response.data &&
            Array.isArray(response.data.data)
          ) {
            setEmployeeData(response.data.data);
            console.log("Employee Data fetched successfully", response.data.data);
          } else {
            console.error("Invalid response format or error in response");
          }
        } catch (err) {
          console.error("Error fetching Employee Data:", err);
        }
      };

      const fetchTrainers = async () => {
        try {
          const response = await getAPI("/trainee-get-all", {}, true);
          if (response.data && response.data.data) {
            setTrainers(response.data.data);
          } else {
            toast.error("Failed to fetch trainers.");
          }
        } catch (error) {
          console.error("Error fetching trainers:", error);
          toast.error("An error occurred while fetching trainers.");
        }
      };
  
      fetchTrainers();
  
      fetchEmployeeData();

    fetchBranches();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await postAPI(
        'training-list', // Update with your API endpoint
        formData
      );
      console.log("Form Submitted", response.data);
      // Add any other logic after successful submission (like closing the modal)
      onClose();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        style={{ display: 'block', paddingLeft: 0 }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Training
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {/* Form Fields */}
                <div className="row">
                  {/* Branch Field */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="branch" className="col-form-label">
                        Branch
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control select2"
                        required
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                      >
                        <option value="">Select Branch</option>
                        {branches.map((branch) => (
                          <option key={branch.value} value={branch.branchName}>
                            {branch.branchName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Trainer Option */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="trainer_option" className="col-form-label">
                        Trainer Option
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required
                        id="trainer_option"
                        name="trainerOption"
                        value={formData.trainerOption}
                        onChange={handleChange}
                      >
                        <option value="Internal">Internal</option>
                        <option value="External">External</option>
                      </select>
                    </div>
                  </div>

                  {/* Training Type */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="training_type" className="col-form-label">
                        Training Type
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required
                        id="training_type"
                        name="trainingType"
                        value={formData.trainingType}
                        onChange={handleChange}
                      >
                        <option value="Job Training">Job Training</option>
                        <option value="Management Training">Management Training</option>
                      </select>
                    </div>
                  </div>

                  {/* Trainer */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="trainer" className="col-form-label">
                        Trainer
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control select2"
                        required
                        id="trainer"
                        name="trainer"
                        value={formData.trainer}
                        onChange={handleChange}
                      >
                        {trainers.map((trainer) => (
                          <option key={trainer.value} value={trainer.firstName}>
                            {trainer.firstName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Training Cost */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="training_cost" className="col-form-label">
                        Training Cost
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        step="0.01"
                        required
                        placeholder="Enter Training Cost"
                        name="trainingCost"
                        type="number"
                        id="training_cost"
                        value={formData.trainingCost}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Employee */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="employee" className="form-label">
                        Employee
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        name="employee"
                        id="employee"
                        className="form-control"
                        required
                        value={formData.employee}
                        onChange={handleChange}
                      >
                        <option value="">Select Employee</option>
                        {employeeData.map((employee) => (
                          <option key={employee.value} value={employee.name}>
                            {employee.name}
                          </option>
                        ))}
                        {/* Add employee options dynamically if needed */}
                      </select>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="start_date" className="col-form-label">
                        Start Date
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        autoComplete="off"
                        name="startDate"
                        type="date"
                        id="start_date"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="end_date" className="col-form-label">
                        End Date
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        required
                        autoComplete="off"
                        name="endDate"
                        type="date"
                        id="end_date"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group col-lg-12">
                    <label htmlFor="description" className="col-form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Description"
                      rows="3"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingListCreateModel;


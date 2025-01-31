import React, { useState, useEffect } from "react";
import getAPI from "../../../../api/getAPI";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";

const TrainingListUpdateModel = ({ onClose, training, _id }) => {
  const formatDateForInput = (date) => {
    if (!date) return ""; 
    const parsedDate = new Date(date); 
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  console.log("trainingList from update mode", training)
  const [formData, setFormData] = useState({
    branch: training.branch || "",
    trainerOption: training.trainerOption || "",
    trainingType: training.trainingType || "",
    trainer: training.trainer || "",
    trainingCost: training.trainingCost || "",
    employee: training.employee || "",
    startDate: formatDateForInput(training.startDate) || "",
    endDate: formatDateForInput(training.endDate) || "",
    description: training.description || "",
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putAPI(
        `/training-list-update/${training._id}`,
        formData
        

      );
      toast(response.data.message || "Training updated successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error updating training:", error);
      toast(error.response?.data?.message || "Failed to update training");
    }
  };

  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", paddingLeft: "0px" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Training
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="branch" className="col-form-label">
                        Branch
                      </label>
                      <select
                        className="form-control"
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      >
                       <option value="">Select a Branch</option>
                      {branches.map((branch) => (
                        <option key={branch._id} value={branch.branchName}>
                          {branch.branchName}
                        </option>
                      ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label
                        htmlFor="trainerOption"
                        className="col-form-label"
                      >
                        Trainer Option
                      </label>
                      <select
                        className="form-control"
                        id="trainerOption"
                        name="trainerOption"
                        value={formData.trainerOption}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Trainer Option</option>
                        <option value="Internal">Internal</option>
                        <option value="External">External</option>
                      </select>
                    </div>
                  </div>

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
                        <option value="">Select Training Type</option>
                        <option value="Job Training">Job Training</option>
                        <option value="Management Training">Management Training</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="trainer" className="col-form-label">
                        Trainer
                      </label>
                      <span className="text-danger">*</span>
                      <select
                        className="form-control"
                        required
                        id="trainer"
                        name="trainer"
                        value={formData.trainer}
                        onChange={handleChange}
                      >
                        <option value="">Select Trainer</option>
                      {trainers.map((trainer) => (
                          <option key={trainer._id} value={trainer.firstName}>
                            {trainer.firstName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
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
                        value={formData.trainingCost}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="employee" className="col-form-label">
                        Employee
                      </label>
                      <select
                        className="form-control"
                        required
                        id="employee"
                        name="employee"
                        value={formData.employee}
                        onChange={handleChange}
                      >
                        <option value="">Select Employee</option>
                        {employeeData.map((employee) => (
                          <option key={employee._id} value={employee.name}>
                            {employee.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>


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
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default TrainingListUpdateModel;


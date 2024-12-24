import React, { useState } from 'react';
import { toast } from 'react-toastify';
import postAPI from "../../../../api/postAPI";

const CreateExpenseTypeModal = ({ closeModal }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Expense type name is required.");
      return;
    }

    const expenseTypeData = {
      expenseName: name,
    };

    try {
      const response = await postAPI("/create-expense-type", expenseTypeData, true);

      if (!response.hasError) {
        toast.success("Expense type created successfully");
        closeModal();
      } else {
        toast.error(`Failed to create expense type: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating the expense type.");
    }
  };

  return (
    <div className="modal fade show modal-overlay" id="commonModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-modal="true" style={{ display: 'block' }}>
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Create New Expense Type</h5>
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
                          placeholder="Enter Expense Type Name"
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
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseTypeModal;

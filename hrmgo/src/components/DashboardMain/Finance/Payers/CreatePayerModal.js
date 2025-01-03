import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 
import postAPI from "../../../../api/postAPI"; 
import "react-toastify/dist/ReactToastify.css";

const CreatePayerModal = ({ closeModal }) => {
  const [payerName, setPayerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const payerData = {
      payer_name: payerName,
      contact_number: contactNumber,
    };

    try {
   
      const response = await postAPI('/create_Payer', payerData, true);
      if (!response.hasError) {
        toast.success("Payer Created Successfully");
        closeModal();
      } else {
        toast.error(`Failed to create Payer: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while creating Payer.");
    }
  };

  return (
    <div
      className="modal fade show modal-overlay"
      id="commonModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
    
    >
      <div className="modal-dialog modal-undefined" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Create New Payer
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="body">
            <form
              onSubmit={handleSubmit} 
              method="POST"
              action="https://demo.workdo.io/hrmgo/payers"
              acceptCharset="UTF-8"
              className="needs-validation"
              noValidate
            >
              <div className="modal-body">
                <div className="row">
                  <div className="form-group">
                    <label htmlFor="payer_name" className="form-label">
                      Payer Name
                    </label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      required
                      placeholder="Enter Payer Name"
                      name="payer_name"
                      type="text"
                      id="payer_name"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="contact_number" className="form-label">
                        Contact Number
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        className="form-control"
                        placeholder="Enter Contact Number"
                        pattern="^\\+\\d{1,3}\\d{9,13}$"
                        id="contact_number"
                        required
                        name="contact_number"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                      />
                      <div className="text-xs text-danger">
                        Please use with country code. (ex. +91)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  to="#"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={closeModal}
                >
                  Cancel
                </Link>
                <input
                  type="submit"
                  value="Create"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePayerModal;


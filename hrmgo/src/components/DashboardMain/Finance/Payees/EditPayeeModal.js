import React, { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";

const EditPayeeModal = ({ payee, closeModal,fetchPayees }) => {
  const [formData, setFormData] = useState({
    payee_name: "",
    contact_number: "",
  });

  useEffect(() => {
    
    console.log("Payee passed to modal:", payee);
    setFormData({
      payee_name: payee?.payee_name || "", 
      contact_number: payee?.contact_number || "",
    });
  }, [payee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putAPI(`/update_Payee/${payee._id}`, formData, true);
      if (!response.hasError) {
        toast.success("Payee updated successfully");
        closeModal(); 
        fetchPayees();
      } else {
        toast.error(`Failed to update Payee: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the Payee.");
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{ display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040, 
       }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-md" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Payee
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="payee_name text-dark">Payee Name</label>
                <input
                  className="form-control"
                  name="payee_name" 
                  type="text"
                  value={formData.payee_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact_number text-dark">Contact Number</label>
                <input
                  className="form-control"
                  name="contact_number"
                  type="text"
                  value={formData.contact_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPayeeModal;




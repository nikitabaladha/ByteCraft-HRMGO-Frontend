import React, { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI.js";
import { toast } from "react-toastify";

const EditPayerModal = ({ payer, closeModal }) => {
  const [formData, setFormData] = useState({
    payer_name: "", // Updated to match the state key
    contact_number: "",
  });

  useEffect(() => {
    // Populate form data when payer changes
    console.log("Payer passed to modal:", payer);
    setFormData({
      payer_name: payer?.payer_name || "", // Ensure key matches state
      contact_number: payer?.contact_number || "",
    });
  }, [payer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await putAPI(`/update_Payer/${payer._id}`, formData, true);
      if (!response.hasError) {
        toast.success("Payer updated successfully");
        closeModal(); // Close modal on success
      } else {
        toast.error(`Failed to update Payer: ${response.message}`);
      }
    } catch (error) {
      toast.error("An error occurred while updating the Payer.");
    }
  };

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      style={{
        display: "block",
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
              Edit Payer
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
                <label htmlFor="payer_name">Payer Name</label>
                <input
                  className="form-control"
                  name="payer_name" // Updated name attribute
                  type="text"
                  value={formData.payer_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact_number">Contact Number</label>
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

export default EditPayerModal;


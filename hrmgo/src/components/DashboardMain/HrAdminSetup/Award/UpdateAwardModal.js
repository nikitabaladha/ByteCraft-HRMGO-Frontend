import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import putAPI from "../../../../api/putAPI.js";
import getAPI from "../../../../api/getAPI.js";

const UpdateAwardModal = ({ award, onClose, updateAward }) => {
  const [employeeName, setEmployeeName] = useState(award?.employeeName || "");
  const [awardTypeId, setAwardTypeId] = useState("");
  const [date, setDate] = useState(
    award?.date ? new Date(award.date).toISOString().split("T")[0] : ""
  );
  const [gift, setGift] = useState(award?.gift || "");
  const [description, setDescription] = useState(award?.description || "");
  const [awardTypes, setAwardTypes] = useState([]);

  // Fetch award types on component mount
  useEffect(() => {
    const fetchAllAwardType = async () => {
      try {
        const response = await getAPI("/award-type-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setAwardTypes(response.data.data);

          // Find and set the existing awardTypeId based on award.awardType
          const existingAwardType = response.data.data.find(
            (type) => type.awardName === award.awardType
          );
          if (existingAwardType) {
            setAwardTypeId(existingAwardType._id);
          }
        } else {
          toast.error("Failed to load award types.");
        }
      } catch (err) {
        toast.error("Error fetching award type data.");
      }
    };
    fetchAllAwardType();
  }, [award]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Prepare updated award data
    const updatedAward = {
      awardTypeId: awardTypeId || award.awardTypeId,
      date,
      gift,
      description,
    };

    try {
      const response = await putAPI(`/award/${award.id}`, updatedAward, true);

      if (!response.hasError) {
        toast.success("Award updated successfully!");

        // Find the selected award type for display
        const selectedAwardType = awardTypes.find(
          (type) => type._id === awardTypeId
        );

        const newUpdatedAward = {
          id: response.data.data._id,
          employeeName,
          awardType: selectedAwardType
            ? selectedAwardType.awardName
            : award.awardType,
          date: response.data.data.date,
          gift: response.data.data.gift,
          description: response.data.data.description,
          employeeId: response.data.data.employeeId,
        };

        updateAward(newUpdatedAward);
        onClose();
      } else {
        toast.error("Failed to update award.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div
      className="modal fade show"
      id="commonModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{
        display: "block",
        paddingLeft: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Award</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleUpdate}
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="col-form-label">Employee</label>
                  <input
                    className="form-control"
                    value={employeeName}
                    disabled
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="col-form-label">
                    Award Type <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="awardTypeId"
                    value={awardTypeId}
                    onChange={(e) => setAwardTypeId(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select Award Type
                    </option>
                    {awardTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.awardName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-form-label">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="col-form-label">
                    Gift <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="gift"
                    value={gift}
                    onChange={(e) => setGift(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group col-md-12">
                  <label className="col-form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Update"
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

export default UpdateAwardModal;

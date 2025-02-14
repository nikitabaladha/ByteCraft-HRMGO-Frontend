import React from "react";

const TraineeViewModel = ({ trainee, onClose }) => {
  return (
    <div>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Trainer Details
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td className="text-dark fw-bold">Branch</td>
                      <td>{trainee.branch}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">First Name</td>
                      <td>{trainee.firstName}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">Last Name</td>
                      <td>{trainee.lastName}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">Contact Number</td>
                      <td>{trainee.contactNumber}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">Email</td>
                      <td>{trainee.email}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">Expertise</td>
                      <td>{trainee.expertise}</td>
                    </tr>
                    <tr>
                      <td className="text-dark fw-bold">Address</td>
                      <td>{trainee.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TraineeViewModel;


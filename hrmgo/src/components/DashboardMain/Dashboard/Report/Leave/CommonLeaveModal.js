import React from "react";

const CommonLeaveModal = ({ employee, onClose }) => {
  const { leaves, leaveStatus } = employee;

  // Filter leaves based on the selected status
  const filteredLeaves = leaves?.filter(
    (leave) => leave.status === leaveStatus
  );

  const leaveTitle =
    leaveStatus === "Approved"
      ? "Approved Leave Detail"
      : leaveStatus === "Reject"
      ? "Rejected Leave Detail"
      : "Pending Leave Detail";

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {leaveTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
            <div className="body">
              <div className="col-form-label">
                <div className="row m-2">
                  <div className="col text-center">
                    <div className="card p-4 mb-4">
                      <h5 className="report-text gray-text mb-0">
                        Casual Leave:
                      </h5>
                      <h5 className="report-text mb-0">
                        {filteredLeaves.filter(
                          (leave) => leave.leaveType === "Casual Leave"
                        ).length || 0}
                      </h5>
                    </div>
                  </div>
                  <div className="col text-center">
                    <div className="card p-4 mb-4">
                      <h5 className="report-text gray-text mb-0">
                        Medical Leave:
                      </h5>
                      <h5 className="report-text mb-0">
                        {filteredLeaves.filter(
                          (leave) => leave.leaveType === "Medical Leave"
                        ).length || 0}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="row m-2">
                  <div className="table-responsive">
                    <table className="table" id="pc-dt-simple">
                      <thead>
                        <tr>
                          <th>Leave Type</th>
                          <th>Leave Date</th>
                          <th>Leave Days</th>
                          <th>Leave Reason</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeaves.map((leave, index) => (
                          <tr key={index}>
                            <td>{leave.leaveType}</td>
                            <td>
                              {leave.startDate} to {leave.endDate}
                            </td>
                            <td>{leave.totalDays}</td>
                            <td>{leave.reason}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonLeaveModal;

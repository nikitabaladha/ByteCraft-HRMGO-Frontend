import React, { useState, useEffect } from "react";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommonLeaveModal = ({ employee, onClose }) => {
  const { leaves, leaveStatus } = employee;
  const [leaveTypes, setLeaveTypes] = useState([]);

  const filteredLeaves = leaves?.filter(
    (leave) => leave.status === leaveStatus
  );

  console.log("filteredLeaves", filteredLeaves);

  const leaveTitle =
    leaveStatus === "Approved"
      ? "Approved Leave Detail"
      : leaveStatus === "Rejected"
      ? "Rejected Leave Detail"
      : leaveStatus === "Pending"
      ? "Pending Leave Detail"
      : "Invalid Leave Detail";

  useEffect(() => {
    const fetchAllLeaveType = async () => {
      try {
        const response = await getAPI("/leave-type-get-all", {}, true);
        if (!response.hasError && Array.isArray(response.data.data)) {
          setLeaveTypes(response.data.data);
          console.log("Leave type", response.data.data);
        } else {
          toast.error("Failed to load leave types.");
        }
      } catch (err) {
        toast.error("Error fetching leave type data.");
      }
    };
    fetchAllLeaveType();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalDialog = document.querySelector(".modal-dialog");

      if (modalDialog && !modalDialog.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      <div
        className="modal fade show"
        id="commonModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-modal="true"
        style={{ display: "block", backgroundColor: " rgba(0, 0, 0, 0.5)" }}
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
                  {leaveTypes.map((leaveType) => {
                    const count = filteredLeaves.filter(
                      (leave) => leave.leaveType === leaveType.leaveTypeName
                    ).length;

                    return (
                      <div className="col text-center" key={leaveType._id}>
                        <div className="card p-4 mb-4">
                          <h5 className="report-text gray-text mb-0">
                            {leaveType.leaveTypeName}:
                          </h5>
                          <h5 className="report-text mb-0">{count || 0}</h5>
                        </div>
                      </div>
                    );
                  })}
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

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CommonLeaveModal from "./CommonLeaveModal";

const LeaveTable = ({ leaveData }) => {
  const [isCommonLeaveModalOpen, setIsCommonLeaveModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenCommonLeaveModal = (employee, status) => {
    setSelectedEmployee({ ...employee, leaveStatus: status });
    setIsCommonLeaveModalOpen(true);
  };

  return (
    <>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee</th>
                    <th>Approved Leaves</th>
                    <th>Rejected Leaves</th>
                    <th>Pending Leaves</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveData.map((employee, index) => (
                    <tr key={index}>
                      <td>
                        <Link to="#" className="btn btn-outline-primary">
                          {employee.employeeId}
                        </Link>
                      </td>
                      <td>{employee.employeeName}</td>
                      <td>
                        <div className="btn btn-sm btn-info rounded">
                          {employee.approvedLeaves}
                          <Link
                            className="text-white"
                            onClick={() =>
                              handleOpenCommonLeaveModal(employee, "Approved")
                            }
                          >
                            View
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="btn btn-sm btn-danger rounded">
                          {employee.rejectedLeaves}
                          <Link
                            className="text-white"
                            onClick={() =>
                              handleOpenCommonLeaveModal(employee, "Reject")
                            }
                          >
                            View
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="m-view-btn btn btn-sm btn-warning rounded">
                          {employee.pendingLeaves}
                          <Link
                            className="text-white"
                            onClick={() =>
                              handleOpenCommonLeaveModal(employee, "Pending")
                            }
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal */}
      {isCommonLeaveModalOpen && selectedEmployee && (
        <CommonLeaveModal
          employee={selectedEmployee}
          onClose={() => setIsCommonLeaveModalOpen(false)}
        />
      )}
    </>
  );
};

export default LeaveTable;

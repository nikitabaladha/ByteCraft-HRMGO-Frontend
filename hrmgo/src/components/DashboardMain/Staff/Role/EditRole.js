import React, { useState, useEffect } from "react";
import putAPI from "../../../../api/putAPI";
import { toast } from "react-toastify";
import { useMemo } from "react";

const EditRole = ({ role, onClose, fetchRoles }) => {
  const modules = useMemo(() => [
    {
      name: "User",
      permissions: [
        { id: 1, name: "Manage" },
        { id: 2, name: "Create" },
        { id: 3, name: "Edit" },
        { id: 4, name: "Delete" },
      ],
    },
    {
      name: "Role",
      permissions: [
        { id: 1, name: "Manage" },
        { id: 2, name: "Create" },
        { id: 3, name: "Edit" },
        { id: 4, name: "Delete" },
      ],
    },
    {
      name: "Award",
      permissions: [
        { id: 1, name: "Manage" },
        { id: 2, name: "Create" },
        { id: 3, name: "Edit" },
        { id: 4, name: "Delete" },
      ],
    },
    {
      name: "Transfer",
      permissions: [
        { id: 1, name: "Manage" },
        { id: 2, name: "Create" },
        { id: 3, name: "Edit" },
        { id: 4, name: "Delete" },
      ],
    },
    {
        name: "Resignation",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Travel",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Promotion",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Complaint",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Contract",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Contract Type",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Warning",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Termination",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Department",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Designation",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Doucment Type",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Branch",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Award type",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
  
      {
        name: "Termination Type",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      }, {
        name: "Employee",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Payslip Type",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Allowance Option",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Loan Option",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Deduction Option",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Set Salary",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Allowance",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Commission",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Loan",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Saturation Deduction",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Other Payment",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Overtime",
        permissions: [
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Pay Slip",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Account List",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Payee",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Payer",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Income Type",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Expense Type",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Payment Type",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Deposit",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Expense",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Transfer Balance",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Event",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Announcement",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Leave Type",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Leave",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Meeting",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Ticket",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Attendance",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "TimeSheet",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Holiday",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Assets",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Document",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Employee Profile",
          permissions: [
          { id: 1, name: "Manage" },
        ],
      },
      {
        name: "Indicator",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
      {
        name: "Appraisal",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
      {
        name: "Competencies",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Company Policy",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Trainer",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
      {
        name: "Training",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
      {
        name: "Training Type",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Job Category",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Job Stage",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Job",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
      {
        name: "Job Application",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
          { id: 5, name: "Show" },
          { id: 6, name: "Move" },
        ],
      },
      {
        name: "Job OnBoard",
          permissions: [
          { id: 1, name: "Manage" },
        ],
      },
      {
        name: "Job Application Note",
          permissions: [
          { id: 4, name: "Delete" },
          { id: 7, name: "Add" },
        ],
      },
      {
        name: "Job Application Skill",
          permissions: [
          { id: 7, name: "Add" },
        ],
      },
      {
        name: "Interview Schedule",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Career",
          permissions: [
          { id: 1, name: "Manage" },
        ],
      },
      {
        name: "Report",
          permissions: [
          { id: 1, name: "Manage" },
        ],
      },
      {
        name: "PerformanceType",
          permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Edit" },
          { id: 4, name: "Delete" },
        ],
      },
      {
        name: "Zoommeeting",
        permissions: [
          { id: 1, name: "Manage" },
          { id: 2, name: "Create" },
          { id: 3, name: "Delete" },
          { id: 5, name: "Show" },
        ],
      },
  ], []);

  const [roleName, setRoleName] = useState(role.name || "");
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const initialPermissions = modules.reduce((acc, module) => {
      acc[module.name] = module.permissions.reduce((permAcc, perm) => {
        permAcc[perm.name] =
          role.permissions
            .find((p) => p.module === module.name)
            ?.actions.includes(perm.name) || false;
        return permAcc;
      }, {});
      return acc;
    }, {});
    setPermissions(initialPermissions);
  }, [modules, role.permissions]);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
  };

  const handlePermissionChange = (module, permission) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission],
      },
    }));
  };

//   const handleSelectAll = () => {
//     const newState = !selectAll;

//     setSelectAll(newState);

//     const updatedPermissions = Object.keys(permissions).reduce(
//       (acc, module) => {
//         acc[module] = Object.keys(permissions[module]).reduce(
//           (permAcc, perm) => {
//             permAcc[perm] = newState;

//             return permAcc;
//           },
//           {}
//         );

//         return acc;
//       },
//       {}
//     );

//     setPermissions(updatedPermissions);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPermissions = Object.keys(permissions).map((module) => ({
      module,
      actions: Object.keys(permissions[module]).filter(
        (action) => permissions[module][action]
      ),
    }));

    try {
      const response = await putAPI(`/update-role/${role._id}`, {
        name: roleName,
        permissions: formattedPermissions,
      });

      toast(response.data.message || "Role updated successfully!");
      onClose();
      fetchRoles();
    } catch (error) {
      console.error("Error updating Role:", error);
      toast(error.response?.data?.message || "Failed to update Role");
    }
  };

  return (
    <div>
    <div className="modal fade show" id="commonModal" tabIndex="-1" aria-hidden="true" style={{ display: "block" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Role</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  className="form-control"
                  placeholder="Enter Role Name"
                  value={roleName}
                  onChange={handleRoleNameChange}
                  required
                />
              </div>
  
              <div className="form-group">
                <h6 className="my-3">Assign Permissions to Roles</h6>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          onChange={() => {
                            const selectAll = !Object.keys(permissions).every((module) => 
                              Object.values(permissions[module]).every(Boolean)
                            );
                            const updatedPermissions = Object.keys(permissions).reduce((acc, module) => {
                              acc[module] = Object.keys(permissions[module]).reduce((permAcc, perm) => {
                                permAcc[perm] = selectAll;
                                return permAcc;
                              }, {});
                              return acc;
                            }, {});
                            setPermissions(updatedPermissions);
                          }}
                          checked={Object.keys(permissions).every((module) => 
                            Object.values(permissions[module]).every(Boolean)
                          )}
                        />
                      </th>
                      <th>Module</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(permissions).map((module) => (
                      <tr key={module}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={Object.values(permissions[module]).every(Boolean)}
                            onChange={() => {
                              const allChecked = !Object.values(permissions[module]).every(Boolean);
                              setPermissions((prev) => ({
                                ...prev,
                                [module]: Object.keys(prev[module]).reduce((acc, perm) => {
                                  acc[perm] = allChecked;
                                  return acc;
                                }, {}),
                              }));
                            }}
                          />
                        </td>
                        <td>{module}</td>
                        <td>
                          <div className="row">
                            {Object.keys(permissions[module]).map((perm) => (
                              <div
                                className="col-md-3 custom-control custom-checkbox"
                                key={perm}
                              >
                                <input
                                  className="form-check-input"
                                  id={`${module}-${perm}`}
                                  type="checkbox"
                                  checked={permissions[module][perm]}
                                  onChange={() => handlePermissionChange(module, perm)}
                                />
                                <label
                                  htmlFor={`${module}-${perm}`}
                                  className="form-label"
                                >
                                  {perm}
                                </label>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
  
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
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
    </div>
  </div>
  
  );
};

export default EditRole;

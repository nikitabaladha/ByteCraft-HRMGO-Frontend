import React, { useState } from "react";
import postAPI from "../../../../api/postAPI";
import { toast } from "react-toastify";

const CreateRole = ({ onClose, fetchRoles,  }) => {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  const modules = [
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
  ];

  const handleRoleNameChange = (e) => setRoleName(e.target.value);

  const handlePermissionChange = (module, permissionId) => {
    setPermissions((prev) => {
      const updated = { ...prev };

      if (!updated[module]) {
        updated[module] = new Set();
      } else {
        updated[module] = new Set(updated[module]); // Ensure immutability
      }

      if (updated[module].has(permissionId)) {
        updated[module].delete(permissionId); // Uncheck the permission
      } else {
        updated[module].add(permissionId); // Check the permission
      }

      return updated;
    });
  };

  const handleModuleCheckboxChange = (module) => {
    setPermissions((prev) => {
      const updated = { ...prev };

      const modulePermissions = modules.find(
        (m) => m.name === module
      ).permissions;
      const allPermissionIds = new Set(modulePermissions.map((p) => p.id));

      if (
        updated[module] &&
        modulePermissions.every((p) => updated[module].has(p.id))
      ) {
        updated[module] = new Set(); // Uncheck all permissions
      } else {
        updated[module] = allPermissionIds; // Check all permissions
      }

      return updated;
    });
  };

  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);

    if (!selectAll) {
      const allPermissions = {};
      modules.forEach((module) => {
        allPermissions[module.name] = new Set(
          module.permissions.map((permission) => permission.id)
        );
      });
      setPermissions(allPermissions);
    } else {
      setPermissions({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedPermissions = Object.entries(permissions).map(
      ([module, actionIds]) => ({
        module,
        actions: modules
          .find((mod) => mod.name === module)
          ?.permissions.filter((perm) => actionIds.has(perm.id))
          .map((perm) => perm.name),
      })
    );

    const payload = {
      name: roleName,
      permissions: formattedPermissions,
    };

    try {
      const response = await postAPI("/create-role", payload);
      toast("Role created successfully!");
      console.log("Role created successfully!", response.data);

      setRoleName("");
      setPermissions({});
      setSelectAll(false);
      onClose()
      fetchRoles()
    } catch (error) {
      console.error("Error creating role:", error);
      alert("Failed to create role. Please try again.");
    }
  };

  return (
    <div className="modal fade show" style={{ display: "block" }} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Role</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label htmlFor="name" className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  required
                  placeholder="Enter Role Name"
                  name="name"
                  type="text"
                  id="name"
                  value={roleName}
                  onChange={handleRoleNameChange}
                />
              </div>
              <div className="form-group">
                <h6 className="my-3">Assign Permission to Roles</h6>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Module</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((module) => (
                      <tr key={module.name}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={
                              permissions[module.name]?.size ===
                              module.permissions.length
                            }
                            onChange={() =>
                              handleModuleCheckboxChange(module.name)
                            }
                          />
                        </td>
                        <td>{module.name}</td>
                        <td>
                          <div className="row">
                            {module.permissions.map((permission) => (
                              <div className="col-md-3" key={permission.id}>
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`permission${permission.id}`}
                                  checked={
                                    permissions[module.name]?.has(
                                      permission.id
                                    ) || false
                                  }
                                  onChange={() =>
                                    handlePermissionChange(
                                      module.name,
                                      permission.id
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`permission${permission.id}`}
                                  className="form-label"
                                >
                                  {permission.name}
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRole;
// yee too sahi chall raha hai

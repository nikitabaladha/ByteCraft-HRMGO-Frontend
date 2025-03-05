import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { FiPlus } from "react-icons/fi";
import CreateRole from './CreateRole';

const RoleHeader = ({fetchRoles}) => {
    const [showModal, setShowModal] = useState(false);

  const handleCreateClick = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRoles();
    setShowModal(false);
  };
  return (
    <>
    <div className="page-header">
      <div className="page-block">
        <div className="row align-items-center">
          {/* Header Title Section */}
          <div className="col-auto">
            <div className="page-header-title">
              <h4 className="m-b-10">Manage Roles</h4>
            </div>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/dashboard">Home</Link>
              </li>
              <li className="breadcrumb-item">Role</li>
            </ul>
          </div>
          {/* Button Section */}
          <div className="col">
            <div className="float-end">
            <Link
                 
                  onClick={handleCreateClick}
                  data-title="Create New Employee"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  {/* <FiPlus /> */}
                  <i className="ti ti-plus"></i>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {showModal && (
        <CreateRole onClose={handleCloseModal} onSubmit={handleSubmit} fetchRoles={fetchRoles}  />
      )}
    </>
  );
};

export default RoleHeader;

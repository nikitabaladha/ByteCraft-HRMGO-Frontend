import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { FiUserCheck } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import UserCreate from './UserCreate';

const UserHeader = ({fetchUsers}) => {
    const [showModal, setShowModal] = useState(false);

const handleCreateClick = () => {
  setShowModal(true); // Show the modal
};

const handleCloseModal = () => {
  setShowModal(false); // Hide the modal
};

const handleSubmit = (event) => {
  event.preventDefault();
  fetchUsers();
  setShowModal(false);
};
  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Users</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Users</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <Link
                  href="#"
                  onClick={handleCreateClick}
                  data-size="md"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Create New User"
                  className="btn btn-sm btn-primary"
                >
                  <FiPlus/>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
        <UserCreate onClose={handleCloseModal} onSubmit={handleSubmit} fetchUsers={fetchUsers} />
      )}
      </div>   
  );
};

export default UserHeader;

import React, { useState } from "react";
// import { TiPlus } from "react-icons/ti";
import AccountCreateModal from "./AccountCreateModal.js";

const AccountListHeader = ({ fetchAccounts }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAccounts();
    setModalOpen(false);
  };

  return (
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Account</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Home</a>
                </li>
                <li className="breadcrumb-item">Account</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={openModal}
                  title="Create"
                >
                  {/* <TiPlus />  */}
                  <i className="ti ti-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

      <AccountCreateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        fetchAccounts={fetchAccounts}
      />
    </div>
  );
};

export default AccountListHeader;


import React from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import CreateAwardModal from "./CreateAwardModal";

const AwardHeader = ({ addAward }) => {
  const [isCreateAwardModalOpen, setIsCreateAwardModalOpen] = useState(false);

  const openModal = () => {
    setIsCreateAwardModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateAwardModalOpen(false);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Award</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Award</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  data-ajax-popup="true"
                  data-title="Create New Award"
                  data-size="lg"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                  onClick={openModal}
                >
                  <FaPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateAwardModalOpen && (
        <CreateAwardModal onClose={closeModal} addAward={addAward} />
      )}
    </>
  );
};

export default AwardHeader;

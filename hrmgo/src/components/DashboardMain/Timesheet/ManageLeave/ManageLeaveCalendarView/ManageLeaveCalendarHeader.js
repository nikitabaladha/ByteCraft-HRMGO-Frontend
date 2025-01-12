import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CreateModal from "../CreateModal";

import { FaPlus } from "react-icons/fa";
import { TbListCheck } from "react-icons/tb";

const ManageLeaveCalendarHeader = ({ addLeave }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const navigateToManageLeave = (event) => {
    event.preventDefault();
    navigate("/dashboard/time-sheet/manage-leave");
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Leave Calender</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Leave</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="List View"
                  onClick={navigateToManageLeave}
                >
                  <TbListCheck />
                </Link>
                <Link
                  data-ajax-popup="true"
                  data-title="Create New Holiday"
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

      <div className="mb-4"></div>

      {isCreateModalOpen && (
        <CreateModal onClose={closeModal} addLeave={addLeave} />
      )}
    </>
  );
};

export default ManageLeaveCalendarHeader;

import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CreateHolidayModal from "../CreateHolidayModal";

import { FaPlus } from "react-icons/fa";
import { TbListCheck } from "react-icons/tb";

const HolidayCalendarHeader = () => {
  const [isCreateHolidayModalOpen, setIsCreateHolidayModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsCreateHolidayModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateHolidayModalOpen(false);
  };

  const navigateToHoliday = (event) => {
    event.preventDefault();
    navigate("/dashboard/hr-admin-setup/holiday");
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Holiday</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Holidays List</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="List View"
                  onClick={navigateToHoliday}
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

      {isCreateHolidayModalOpen && <CreateHolidayModal onClose={closeModal} />}
    </>
  );
};

export default HolidayCalendarHeader;

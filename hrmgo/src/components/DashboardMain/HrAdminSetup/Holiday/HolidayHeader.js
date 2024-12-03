import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CreateHolidayModal from "./CreateHolidayModal";

import { FaPlus } from "react-icons/fa";
import { TbFileExport } from "react-icons/tb";
import { TbFileImport } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

const HolidayHeader = () => {
  const [isCreateHolidayModalOpen, setIsCreateHolidayModalOpen] =
    useState(false);

  const openModal = () => {
    setIsCreateHolidayModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateHolidayModalOpen(false);
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
                <li className="breadcrumb-item">Holiday List</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport />
                </Link>

                <Link
                  data-ajax-popup="true"
                  data-title="Import Holiday CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Import"
                >
                  <TbFileImport />
                </Link>
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
                >
                  <CiCalendarDate />
                </Link>
                <Link
                  data-ajax-popup="true"
                  data-title="Create New Holiday"
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
      {/* added extra div for some space */}
      <div className="mb-4"></div>

      {isCreateHolidayModalOpen && <CreateHolidayModal onClose={closeModal} />}
    </>
  );
};

export default HolidayHeader;

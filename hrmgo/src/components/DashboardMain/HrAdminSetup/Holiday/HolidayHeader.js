import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateHolidayModal from "./CreateHolidayModal";
import HolidayImportModal from "./HolidayImport";
import * as XLSX from "xlsx";

import { FaPlus } from "react-icons/fa";
import { TbFileExport } from "react-icons/tb";
import { TbFileImport } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";

const HolidayHeader = ({ holidays, addHoliday }) => {
  const [isCreateHolidayModalOpen, setIsCreateHolidayModalOpen] =
    useState(false);
  const [isImportHolidayModalOpen, setIsImportHolidayModalOpen] =
    useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsCreateHolidayModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateHolidayModalOpen(false);
  };

  const openImportModal = () => {
    setIsImportHolidayModalOpen(true);
  };

  const closeImportModal = () => {
    setIsImportHolidayModalOpen(false);
  };

  const navigateToCalendar = (event) => {
    event.preventDefault();
    navigate("/dashboard/hr-admin-setup/holiday/calendar");
  };

  const exportHolidayData = () => {
    const formattedHolidays = holidays.map((holiday) => {
      return {
        Occasion: holiday.occasion,
        "Start Date": new Date(holiday.startDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        "End Date": new Date(holiday.endDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedHolidays);
    XLSX.utils.book_append_sheet(wb, ws, "Holidays");
    XLSX.writeFile(wb, "holiday_data.xlsx");
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
                  className="btn btn-sm btn-primary me-2"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                  onClick={exportHolidayData}
                >
                  <TbFileExport />
                </Link>

                <Link
                  data-ajax-popup="true"
                  data-title="Import Holiday CSV file"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary me-2"
                  data-bs-original-title="Import"
                  onClick={openImportModal}
                >
                  <TbFileImport />
                </Link>
                <Link
                  className="btn btn-sm btn-primary me-2"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
                  onClick={navigateToCalendar}
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

      <div className="mb-4"></div>

      {isCreateHolidayModalOpen && (
        <CreateHolidayModal onClose={closeModal} addHoliday={addHoliday} />
      )}
      {isImportHolidayModalOpen && (
        <HolidayImportModal onClose={closeImportModal} />
      )}
    </>
  );
};

export default HolidayHeader;

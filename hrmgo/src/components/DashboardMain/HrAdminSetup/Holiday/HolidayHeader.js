import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateHolidayModal from "./CreateHolidayModal";
import HolidayImportModal from "./HolidayImport";
import * as XLSX from "xlsx";

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
                  <Link to="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item text-dark">Holidays List</li>
              </ul>
            </div>
            <div className="col">
            <div className="d-flex flex-row flex-sm-row align-items-center gap-2 float-end">
               
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                  onClick={exportHolidayData}
                >
                  {/* <TbFileExport /> */}
                  <i className="ti ti-file-export text-white"></i>
                </Link>
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
                  onClick={navigateToCalendar}
                >
                  {/* <CiCalendarDate /> */}
                  <i className="ti ti-calendar text-white"></i>
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
                  {/* <FaPlus /> */}
                  <i className="ti ti-plus text-white"></i>
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

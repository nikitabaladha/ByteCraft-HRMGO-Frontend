import React from "react";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import CreateModal from "./CreateModal";
import * as XLSX from "xlsx";
import getAPI from "../../../../api/getAPI";

const ManageLeaveHeader = ({ addLeave }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState([]);

  const navigate = useNavigate();

  const navigateToCalendar = (event) => {
    event.preventDefault();
    navigate("/dashboard/time-sheet/manage-leave/calendar");
  };

  useEffect(() => {
    const fetchMangeLeaveData = async () => {
      try {
        const response = await getAPI(`/manage-leave-get-all`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          const filteredData = response.data.data.map((item) => ({
            employeeName: item.employeeName,
            leaveType: item.leaveType,
            appliedOn: item.appliedOn,
            startDate: item.startDate,
            endDate: item.endDate,
            totalDays: item.totalDays,
            reason: item.reason,
            status: item.status,
          }));
          setLeaveData(filteredData);
          console.log("Filtered Leave Data fetched successfully", filteredData);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching leave Data:", err);
      }
    };

    fetchMangeLeaveData();
  }, []);

  const openModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleExport = () => {
    if (leaveData.length === 0) {
      console.error("No data to export");
      return;
    }

    const formattedData = leaveData.map((item) => {
      const formattedItem = {};
      Object.keys(item).forEach((key) => {
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        formattedItem[formattedKey] = item[key];
      });
      return formattedItem;
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);

    XLSX.utils.book_append_sheet(wb, ws, "Leave Data");

    XLSX.writeFile(wb, "leave_data.xlsx");
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Leave</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">Leave </li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  onClick={handleExport}
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport />
                </Link>
                <Link
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
                  onClick={navigateToCalendar}
                >
                  <CiCalendarDate />
                </Link>
                <Link
                  onClick={openModal}
                  data-ajax-popup="true"
                  data-title="Create New Leave"
                  data-size="lg"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FiPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateModal onClose={closeModal} addLeave={addLeave} />
      )}
    </>
  );
};

export default ManageLeaveHeader;

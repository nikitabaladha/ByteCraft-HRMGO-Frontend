import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbFileExport } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import CreateModal from "./CreateModal";

const ManageLeaveHeader = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
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
                  to="/export/leave"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Export"
                >
                  <TbFileExport />
                </Link>
                <Link
                  to="/calender/leave"
                  className="btn btn-sm btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-original-title="Calendar View"
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

      {isCreateModalOpen && <CreateModal onClose={closeModal} />}
    </>
  );
};

export default ManageLeaveHeader;

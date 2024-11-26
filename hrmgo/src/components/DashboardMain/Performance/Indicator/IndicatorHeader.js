// HRMGO\hrmgo\src\components\DashboardMain\Indicator\Indicator\IndicatorHeader.js
import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import IndicatorCreateModal from "./IndicatorCreateModal";

const IndicatorHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">Manage Indicator</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="">Home</Link>
                </li>
                <li className="breadcrumb-item">Indicator</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <Link
                  onClick={openModal}
                  data-ajax-popup="true"
                  data-size="lg"
                  data-title="Create New
                  Indicator"
                  data-bs-toggle="tooltip"
                  title=""
                  className="btn
                  btn-sm btn-primary"
                  data-bs-original-title="Create"
                >
                  <FaPlus />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <IndicatorCreateModal closeModal={closeModal} />}
    </>
  );
};

export default IndicatorHeader;

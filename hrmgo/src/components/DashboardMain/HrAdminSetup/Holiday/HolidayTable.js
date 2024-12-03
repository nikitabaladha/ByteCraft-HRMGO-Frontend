import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import UpdateHolidayModal from "./UpdateHolidayModal";
import ConfirmationDialog from "./ConfirmationDialog";

const HolidayTable = ({ holidays, selectedHoliday, setSelectedHoliday }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (holiday) => {
    setSelectedHoliday(holiday);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (holiday) => {
    setSelectedHoliday(holiday);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedHoliday(null);
  };

  return (
    <>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th>Occasion</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th width="200px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map((holiday) => (
                    <tr key={holiday.id}>
                      <td>{holiday.occasion}</td>
                      <td>{formatDate(holiday.startDate)}</td>
                      <td>{formatDate(holiday.endDate)}</td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-info me-2">
                              <Link
                                className="mx-3 btn btn-sm align-items-center"
                                onClick={() => handleUpdate(holiday)}
                              >
                                <span className="text-white">
                                  <TbPencil />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-danger">
                              <Link
                                href="#"
                                className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                onClick={() => openDeleteDialog(holiday)}
                              >
                                <span className="text-white">
                                  <FaRegTrashAlt />
                                </span>
                              </Link>
                            </div>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isUpdateModalOpen && selectedHoliday && (
        <UpdateHolidayModal
          holiday={selectedHoliday}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {isDeleteDialogOpen && selectedHoliday && (
        <ConfirmationDialog
          holiday={selectedHoliday}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default HolidayTable;

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

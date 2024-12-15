import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateResignationModal from "./UpdateResignationModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const ResignationTable = ({
  resignations,
  setResignations,
  selectedResignation,
  setSelectedResignation,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const handleUpdate = (resignation) => {
    setSelectedResignation(resignation);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (resignation) => {
    setSelectedResignation(resignation);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedResignation(null);
  };

  const handleDeleteConfirmed = (id) => {
    setResignations((prevResignations) =>
      prevResignations.filter((resignation) => resignation.id !== id)
    );
  };

  return (
    <>
      {" "}
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <table className="table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Resignation Date</th>
                      <th>Last Working Day</th>
                      <th>Reason</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resignations.map((resignation) => (
                      <tr key={resignation.id}>
                        <td>{resignation.employeeName}</td>
                        <td>{formatDate(resignation.resignationDate)}</td>
                        <td>{formatDate(resignation.lastWorkingDay)}</td>
                        <td>{resignation.reason}</td>
                        <td className="Action">
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-info me-2">
                                <Link
                                  className="mx-3 btn btn-sm  align-items-center"
                                  data-size="lg"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title=""
                                  data-title="Edit Resignation"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(resignation)}
                                >
                                  <span className="text-white">
                                    <TbPencil />
                                  </span>
                                </Link>
                              </div>
                              <div className="action-btn bg-danger">
                                <form
                                  method="POST"
                                  acceptCharset="UTF-8"
                                  id={`delete-form-${resignation.id}`}
                                  onSubmit={(e) => e.preventDefault()}
                                >
                                  <input
                                    name="_method"
                                    type="hidden"
                                    defaultValue="DELETE"
                                  />
                                  <Link
                                    href="#"
                                    className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Delete"
                                    aria-label="Delete"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openDeleteDialog(resignation);
                                    }}
                                  >
                                    <span className="text-white">
                                      <FaRegTrashAlt />
                                    </span>
                                  </Link>
                                </form>
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
      </div>
      {isUpdateModalOpen && setResignations && (
        <UpdateResignationModal
          resignation={selectedResignation}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedResignation && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="resignation"
          id={selectedResignation.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ResignationTable;

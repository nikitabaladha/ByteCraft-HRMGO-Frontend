import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateWarningModal from "./UpdateWarningModal";

import { formatDate } from "../../../../Js/custom";
import ConfirmationDialog from "../../ConfirmationDialog";

const WarningTable = ({
  warnings,
  setWarnings,
  selectedWarning,
  setSelectedWarning,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (warning) => {
    setSelectedWarning(warning);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (warning) => {
    setSelectedWarning(warning);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedWarning(null);
  };

  const handleDeleteConfirmed = (id) => {
    setWarnings((prevWarnings) =>
      prevWarnings.filter((warning) => warning.id !== id)
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <table className="table" id="pc-dt-simple">
                  <thead>
                    <tr>
                      <th>Warning By</th>
                      <th>Warning To</th>
                      <th>Subject</th>
                      <th>Warning Date</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warnings.map((warning) => (
                      <tr key={warning.id}>
                        <td>{warning.warningBy}</td>
                        <td>{warning.warningTo}</td>
                        <td>{warning.subject}</td>
                        <td>{formatDate(warning.warningDate)}</td>
                        <td>{warning.description}</td>
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
                                  data-title="Edit Warning"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(warning)}
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
                                  id={`delete-form-${warning.id}`}
                                  onSubmit={(e) => e.preventDefault()}
                                >
                                  <input
                                    name="_method"
                                    type="hidden"
                                    defaultValue="DELETE"
                                  />
                                  <Link
                                    className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Delete"
                                    aria-label="Delete"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      openDeleteDialog(warning);
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
      {isUpdateModalOpen && setWarnings && (
        <UpdateWarningModal
          warning={selectedWarning}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedWarning && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="warning"
          id={selectedWarning.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default WarningTable;

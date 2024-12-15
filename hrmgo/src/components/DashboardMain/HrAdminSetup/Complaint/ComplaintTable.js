import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdateComplaintModal from "./UpdateComplaintModal";
import ConfirmationDialog from "../../ConfirmationDialog";

import { formatDate } from "../../../../Js/custom";

const ComplaintTable = ({
  complaints,
  selectedComplaint,
  setSelectedComplaint,
  setComplaints,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (complaint) => {
    setSelectedComplaint(complaint);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (complaint) => {
    setSelectedComplaint(complaint);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedComplaint(null);
  };

  const handleDeleteConfirmed = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint.id !== id)
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
                      <th>Complaint From</th>
                      <th>Complaint Against</th>
                      <th>Title</th>
                      <th>Complaint Date</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td>{complaint.complaintFrom}</td>
                        <td>{complaint.complaintAgainst}</td>
                        <td>{complaint.title}</td>
                        <td>{formatDate(complaint.complaintDate)}</td>
                        <td>{complaint.description}</td>
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
                                  data-title="Edit Complaint"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(complaint)}
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
                                  id={`delete-form-${complaint.id}`}
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
                                      openDeleteDialog(complaint);
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
      {isUpdateModalOpen && setComplaints && (
        <UpdateComplaintModal
          complaint={selectedComplaint}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedComplaint && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="complaint"
          id={selectedComplaint.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default ComplaintTable;

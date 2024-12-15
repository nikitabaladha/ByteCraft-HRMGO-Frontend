import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import { formatDate } from "../../../../Js/custom";
import UpdateAnnouncementModal from "./UpdateAnnouncementModal";
import ConfirmationDialog from "../../ConfirmationDialog";

const AnnouncementTable = ({
  announcements,
  selectedAnnouncement,
  setSelectedAnnouncement,
  setAnnouncements,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAnnouncement(null);
  };

  const handleDeleteConfirmed = (id) => {
    setAnnouncements((prevAnnouncements) =>
      prevAnnouncements.filter((announcement) => announcement.id !== id)
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
                      <th>Title</th>
                      <th>Start date</th>
                      <th>End Date</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((announcement) => (
                      <tr key={announcement.id}>
                        <td>{announcement.title}</td>
                        <td>{formatDate(announcement.startDate)}</td>
                        <td>{formatDate(announcement.endDate)}</td>

                        <td>{announcement.description}</td>
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
                                  data-title="Edit Announcement"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(announcement)}
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
                                  id={`delete-form-${announcement.id}`}
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
                                      openDeleteDialog(announcement);
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
      {isUpdateModalOpen && selectedAnnouncement && (
        <UpdateAnnouncementModal
          announcement={selectedAnnouncement}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="announcement"
          id={selectedAnnouncement.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default AnnouncementTable;

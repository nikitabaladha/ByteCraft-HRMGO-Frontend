import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";

import UpdatePromotionModal from "./UpdatePromotionModal";
import ConfirmationDialog from "../../ConfirmationDialog";
import { formatDate } from "../../../../Js/custom";

const PromotionTable = ({
  promotions,
  setPromotions,
  selectedPromotion,
  setSelectedPromotion,
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdate = (promotion) => {
    setSelectedPromotion(promotion);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (promotion) => {
    setSelectedPromotion(promotion);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedPromotion(null);
  };

  const handleDeleteConfirmed = (id) => {
    setPromotions((prevPromotions) =>
      prevPromotions.filter((promotion) => promotion.id !== id)
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
                      <th>Employee Name</th>
                      <th>Designation</th>
                      <th>Promotion Title</th>
                      <th>Promotion Date</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map((promotion) => (
                      <tr key={promotion.id}>
                        <td>{promotion.employeeName}</td>
                        <td>{promotion.designationName}</td>
                        <td>{promotion.promotionTitle}</td>
                        <td>{formatDate(promotion.promotionDate)}</td>
                        <td>{promotion.description}</td>
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
                                  data-title="Edit Promotion"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(promotion)}
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
                                  id={`delete-form-${promotion.id}`}
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
                                      openDeleteDialog(promotion);
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
      {isUpdateModalOpen && setPromotions && (
        <UpdatePromotionModal
          promotion={selectedPromotion}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedPromotion && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          deleteType="promotion"
          id={selectedPromotion.id}
          onDeleted={handleDeleteConfirmed}
        />
      )}
    </>
  );
};

export default PromotionTable;

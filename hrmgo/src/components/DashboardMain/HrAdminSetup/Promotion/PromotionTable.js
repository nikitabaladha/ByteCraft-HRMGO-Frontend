import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import UpdatePromotionModal from "./UpdatePromotionModal";
import ConfirmationDialog from "./ConfirmationDialog";

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPromotionData = async () => {
      try {
        const response = await getAPI(`/Promotion`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setPromotions(response.data.data);
          console.log(
            "Promotion Data fetched successfully",
            response.data.data
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Promotion Data:", err);
      }
    };

    fetchPromotionData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

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
                                    href="#"
                                    className="mx-3 btn btn-sm  align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title=""
                                    data-bs-original-title="Delete"
                                    aria-label="Delete"
                                    onClick={() => openDeleteDialog(promotion)}
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
          promotion={selectedPromotion}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default PromotionTable;

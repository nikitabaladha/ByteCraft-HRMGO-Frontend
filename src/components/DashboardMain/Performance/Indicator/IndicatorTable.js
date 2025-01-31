import { Link } from "react-router-dom";
import { TiEyeOutline } from "react-icons/ti";
import { LuPencil } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI.js";
import moment from "moment";
import IndicatorDetailModal from "./IndicatorDetailModal.js";
import IndicatorUpdateModal from "./IndicatorUpdateModal.js";
import ConfirmationDialog from "./ConfirmationDialog.js";
const IndicatorTable = () => {
  const [indicators, setIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  // State to control modal visibility
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isIndicatorUpdateModalOpen, setIsIndicatorUpdateModalOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [indicatorIdToDelete, setIndicatorIdToDelete] = useState(null);
  // Function to open the modal
  const openModal = async (indicator) => {
    try {
      // Fetching the indicator details based on its ID
      const response = await getAPI(`/indicator/${indicator.id}`, {}, true);

      if (!response.hasError && response.data.data) {
        // Set the specific indicator data
        console.log("Indicator by ID: ", response.data.data);
        setSelectedIndicator(response.data.data); // Set the data to selectedIndicator
        setIsDetailModalOpen(true);
      } else {
        console.error("Error fetching indicator detail");
      }
    } catch (err) {
      console.error("Error fetching Indicator Detail:", err);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsIndicatorUpdateModalOpen(false);
  };

  const openDeleteDialog = (id) => {
    setIndicatorIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setIndicatorIdToDelete(null);
  };

  const handleDeleteSuccess = (id) => {
    setIndicators((prev) => prev.filter((indicator) => indicator.id !== id));
    setIsDeleteDialogOpen(false);
  };

  const handleUpdate = (indicator) => {
    console.log("handleUpdate called");
    setSelectedIndicator(indicator); // Store the indicator data
    setIsIndicatorUpdateModalOpen(true); // Open the update modal
  };

  const handleUpdateSuccess = (updatedIndicator) => {
    // Update the indicators list with the updated indicator
    setIndicators((prev) =>
      prev.map((indicator) =>
        indicator.id === updatedIndicator.id ? updatedIndicator : indicator
      )
    );
    setIsIndicatorUpdateModalOpen(false);
  };

  useEffect(() => {
    const fetchIndicatorData = async () => {
      try {
        const response = await getAPI("/indicator", {}, true);

        if (!response.hasError && Array.isArray(response.data.data)) {
          const data = response.data.data;

          console.log("Indicator API called", data);

          setIndicators(
            data.map((item) => ({
              branch: item.branch,
              department: item.department,
              designation: item.designation,
              rating: item.overAllRating,
              addedBy: item.addedBy,
              createdAt: moment(item.createdAt).format("MMM DD, YYYY"),
              id: item.id,
              competencies: item.competencies,
            }))
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Indicator Data:", err);
      }
    };

    fetchIndicatorData();
  }, []);

  // Function to render the dynamic stars based on the rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="text-warning fas fa-star" />);
    }
    if (halfStar) {
      stars.push(
        <i key="half" className="text-warning fas fa-star-half-alt" />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fas fa-star" />);
    }

    return (
      <>
        {stars}
        <span className="theme-text-color">({rating})</span>
      </>
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
                      <th>Branch</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Overall Rating</th>
                      <th>Added By</th>
                      <th>Created At</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {indicators.map((indicator) => (
                      <tr key={indicator.id}>
                        <td>{indicator.branch}</td>
                        <td>{indicator.department}</td>
                        <td>{indicator.designation}</td>
                        <td>{renderStars(indicator.rating)}</td>
                        <td>{indicator.addedBy}</td>
                        <td>{indicator.createdAt}</td>
                        <td className="Action">
                          <div className="dt-buttons">
                            <span>
                              <div className="action-btn bg-warning me-2">
                                <Link
                                  onClick={() => openModal(indicator)}
                                  className="mx-3 btn btn-sm align-items-center"
                                  data-size="lg"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title="Indicator Detail"
                                  data-bs-original-title="View"
                                >
                                  <span className="text-white">
                                    <TiEyeOutline />
                                  </span>
                                </Link>
                              </div>
                              <div className="action-btn bg-info me-2">
                                <Link
                                  className="mx-3 btn btn-sm align-items-center"
                                  data-size="lg"
                                  data-ajax-popup="true"
                                  data-bs-toggle="tooltip"
                                  title="Edit Indicator"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(indicator)}
                                >
                                  <span className="text-white">
                                    <LuPencil />
                                  </span>
                                </Link>
                              </div>
                              <div className="action-btn bg-danger">
                                <form
                                  method="POST"
                                  acceptCharset="UTF-8"
                                  id={`delete-form-${indicator.id}`}
                                >
                                  <input
                                    name="_method"
                                    type="hidden"
                                    defaultValue="DELETE"
                                  />
                                  <input
                                    name="_token"
                                    type="hidden"
                                    defaultValue="bv9JuUGnlZvo4e2tk0j8suLlMwPqxJ5lEkHaMTor"
                                  />
                                  <Link
                                    to="#"
                                    className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                    data-bs-toggle="tooltip"
                                    title="Delete"
                                    data-bs-original-title="Delete"
                                    aria-label="Delete"
                                    onClick={() =>
                                      openDeleteDialog(indicator.id)
                                    }
                                  >
                                    <span className="text-white">
                                      <LuTrash2 />
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
      {isDetailModalOpen && (
        <IndicatorDetailModal
          closeModal={closeModal}
          indicator={selectedIndicator}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          onClose={handleDeleteCancel}
          indicatorId={indicatorIdToDelete}
          onDeleted={handleDeleteSuccess}
        />
      )}
      {/* Update Modal */}
      {isIndicatorUpdateModalOpen && (
        <IndicatorUpdateModal
          closeModal={closeModal}
          indicator={selectedIndicator}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </>
  );
};

export default IndicatorTable;

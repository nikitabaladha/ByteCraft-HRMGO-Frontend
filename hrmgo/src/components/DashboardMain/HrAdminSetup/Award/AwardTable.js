import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import UpdateAwardModal from "./UpdateAwardModal";
import ConfirmationDialog from "./ConfirmationDialog";

const AwardTable = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        const response = await getAPI(
          `/award?limit=${entriesPerPage}&page=${currentPage}&search=${searchTerm}`,
          {},
          true,
          true
        );

        if (!response.hasError && response.data) {
          console.log("API Response:", response.data);

          const awardsData = response.data.data?.awards || [];
          const totalCount = response.data.data?.totalCount || 0;

          console.log("awardsData:", awardsData);

          setAwards(awardsData);
          setTotalEntries(totalCount);
        } else {
          console.error("Invalid response format or error in response");
          setAwards([]);
        }
      } catch (err) {
        console.error("Error fetching Award Data:", err);
        setAwards([]);
      }
    };

    fetchAwardData();
  }, [entriesPerPage, currentPage, searchTerm]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const handleEntriesChange = (e) => {
    setEntriesPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleUpdate = (award) => {
    setSelectedAward(award);
    setIsUpdateModalOpen(true);
  };

  const openDeleteDialog = (award) => {
    setSelectedAward(award);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAward(null);
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-header card-body table-border-style">
              <div className="table-responsive">
                <div className="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns">
                  <div className="dataTable-top">
                    <div className="row">
                      {" "}
                      <div className="dataTable-dropdown col-md-8">
                        <label>
                          <select
                            className="dataTable-selector"
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                          >
                            {[5, 10, 15, 20, 25, totalEntries].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>{" "}
                          entries per page
                        </label>
                      </div>
                      <div className="dataTable-search col-md-4">
                        <input
                          className="dataTable-input"
                          placeholder="Search..."
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dataTable-container">
                    <table className="table dataTable-table" id="pc-dt-simple">
                      <thead>
                        <tr>
                          <th>Employee</th>
                          <th>Award Type</th>
                          <th>Date</th>
                          <th>Gift</th>
                          <th>Description</th>
                          <th width="200px">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {awards.length > 0 ? (
                          awards.map((award) => (
                            <tr key={award.id}>
                              <td>{award.employeeName}</td>
                              <td>{award.awardType}</td>
                              <td>{formatDate(award.date)}</td>
                              <td>{award.gift}</td>
                              <td>{award.description}</td>
                              <td className="Action">
                                <div className="dt-buttons">
                                  <span>
                                    <div className="action-btn bg-info me-2">
                                      <Link
                                        className="mx-3 btn btn-sm align-items-center"
                                        onClick={() => handleUpdate(award)}
                                      >
                                        <span className="text-white">
                                          <TbPencil />
                                        </span>
                                      </Link>
                                    </div>
                                    <div className="action-btn bg-danger">
                                      <Link
                                        className="mx-3 btn btn-sm align-items-center bs-pass-para"
                                        onClick={() => openDeleteDialog(award)}
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
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center">
                              No awards found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="dataTable-bottom">
                    <div className="dataTable-info">
                      Showing{" "}
                      {Math.min(
                        (currentPage - 1) * entriesPerPage + 1,
                        totalEntries
                      )}{" "}
                      to {Math.min(currentPage * entriesPerPage, totalEntries)}{" "}
                      of {totalEntries} entries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isUpdateModalOpen && (
        <UpdateAwardModal
          award={selectedAward}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {isDeleteDialogOpen && (
        <ConfirmationDialog
          award={selectedAward}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
};

export default AwardTable;

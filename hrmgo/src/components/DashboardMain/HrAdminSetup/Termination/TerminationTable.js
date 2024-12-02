import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import getAPI from "../../../../api/getAPI";
import UpdateTerminationModal from "./UpdateTerminationModal";
import ConfirmationDialog from "./ConfirmationDialog";
import { FaComment } from "react-icons/fa";
import TerminationDescriptionModal from "./TerminationDescriptionModal";

const TerminationTable = () => {
  const [terminations, setTerminations] = useState([]);
  const [selectedTermination, setSelectedTermination] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  useEffect(() => {
    const fetchTerminationData = async () => {
      try {
        const response = await getAPI(`/termination`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setTerminations(response.data.data);
          console.log("terminations", terminations);
          console.log(
            "Termination Data fetched successfully",
            response.data.data
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Termination Data:", err);
      }
    };

    fetchTerminationData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  const handleUpdate = (termination) => {
    setSelectedTermination(termination);
    setIsUpdateModalOpen(true);
  };

  const handleDescription = (termination) => {
    setSelectedTermination(termination);
    setIsDescriptionModalOpen(true);
  };

  const openDeleteDialog = (termination) => {
    console.log("open Delete Dialog pass", termination);
    setSelectedTermination(termination);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedTermination(null);
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
                      <th>Employee Name</th>
                      <th>Termination Type</th>
                      <th>Notice Date</th>
                      <th>Termination Date</th>
                      <th>Description</th>
                      <th width="200px">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terminations.map((termination) => (
                      <tr key={termination.id}>
                        <td>{termination.employeeName}</td>
                        <td>{termination.terminationType}</td>
                        <td>{formatDate(termination.noticeDate)}</td>
                        <td>{formatDate(termination.terminationDate)}</td>

                        <div className="dt-buttons">
                          <div className="action-btn bg-warning">
                            <Link
                              className="mx-3 btn btn-sm  align-items-center"
                              data-ajax-popup="true"
                              data-bs-toggle="tooltip"
                              title=""
                              data-title="Desciption"
                              data-bs-original-title="Desciption"
                              aria-label="Desciption"
                              onClick={() => handleDescription(termination)}
                            >
                              <span className="text-white">
                                <FaComment className="icon_desc fa fa-comment" />
                              </span>
                            </Link>
                          </div>
                        </div>

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
                                  data-title="Edit Termination"
                                  data-bs-original-title="Edit"
                                  onClick={() => handleUpdate(termination)}
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
                                  id={`delete-form-${termination.id}`}
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
                                    onClick={() =>
                                      openDeleteDialog(termination)
                                    }
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
      {isUpdateModalOpen && setTerminations && (
        <UpdateTerminationModal
          termination={selectedTermination}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
      {/* Confirmation Dialog */}
      {isDeleteDialogOpen && selectedTermination && (
        <ConfirmationDialog
          termination={selectedTermination}
          onCancel={handleDeleteCancel}
        />
      )}

      {isDescriptionModalOpen && (
        <TerminationDescriptionModal
          termination={selectedTermination}
          onClose={() => setIsDescriptionModalOpen(false)}
        />
      )}
    </>
  );
};

export default TerminationTable;

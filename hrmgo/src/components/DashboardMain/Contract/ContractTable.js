import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbCopy } from "react-icons/tb";
import { TiEyeOutline } from "react-icons/ti";
import { TbPencil } from "react-icons/tb";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmationDialog from "./ConfirmationDialog";
import UpdateContractModal from "./UpdateContractModal";
import CopyContractModal from "./CopyContractModal";

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const ContractTable = ({ contracts }) => {
  const navigate = useNavigate();

  const navigateToContractDetail = (event, contract) => {
    event.preventDefault();
    navigate(`/dashboard/contract/${contract.id}`, { state: contract });
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [selectedContracts, setSelectedContracts] = useState(null);

  const openDeleteDialog = (contract) => {
    setSelectedContracts(contract);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedContracts(null);
  };

  const handleUpdate = (contract) => {
    setSelectedContracts(contract);
    setIsUpdateModalOpen(true);
  };

  const handleCopyContract = (contract) => {
    setSelectedContracts(contract);
    setIsCopyModalOpen(true);
  };

  const statusColors = {
    Accept: "bg-primary",
    Decline: "bg-danger",
    Pending: "bg-warning",
  };

  return (
    <>
      <div className="col-md-12">
        <div className="card table-card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table mb-0 pc-dt-simple" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th width="60px">#</th>
                    <th>Employee Name</th>
                    <th>Subject</th>
                    <th>Value</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th width="250px">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((contract, index) => (
                    <tr key={index}>
                      <td className="Id">
                        <Link to="" className="btn btn-outline-primary">
                          {contract.contractId}
                        </Link>
                      </td>
                      <td>{contract.employeeName}</td>
                      <td>{contract.subject}</td>
                      <td>₹{contract.value}</td>
                      <td>{contract.contractType}</td>
                      <td>{formatDate(contract.startDate)}</td>
                      <td>{formatDate(contract.endDate)}</td>
                      <td>
                        <span
                          className={`status_badge badge ${
                            statusColors[contract.status]
                          } p-2 px-3`}
                        >
                          {contract.status}
                        </span>
                      </td>
                      <td className="Action">
                        <div className="dt-buttons">
                          <span>
                            <div className="action-btn bg-primary me-2">
                              <Link
                                to=""
                                className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Duplicate"
                                onClick={() => handleCopyContract(contract)}
                              >
                                <span className="text-white">
                                  <TbCopy />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-warning me-2">
                              <Link
                                to=""
                                className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="View"
                                onClick={(e) =>
                                  navigateToContractDetail(e, contract)
                                }
                              >
                                <span className="text-white">
                                  <TiEyeOutline />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-info me-2">
                              <Link
                                className="mx-3 btn btn-sm d-inline-flex align-items-center"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Edit"
                                onClick={() => handleUpdate(contract)}
                              >
                                <span className="text-white">
                                  <TbPencil />
                                </span>
                              </Link>
                            </div>
                            <div className="action-btn bg-danger">
                              <Link
                                className="mx-3 btn btn-sm d-inline-flex align-items-center bs-pass-para"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                                onClick={() => openDeleteDialog(contract)}
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

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          contracts={selectedContracts}
          onCancel={handleDeleteCancel}
        />
      )}

      {isUpdateModalOpen && (
        <UpdateContractModal
          contracts={selectedContracts}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}

      {isCopyModalOpen && (
        <CopyContractModal
          contracts={selectedContracts}
          onClose={() => setIsCopyModalOpen(false)}
        />
      )}
    </>
  );
};

export default ContractTable;

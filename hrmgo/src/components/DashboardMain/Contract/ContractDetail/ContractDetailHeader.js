import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMailOutline, MdOutlineFileDownload } from "react-icons/md";
import { TbCopy, TbWritingSign } from "react-icons/tb";
import { TiEyeOutline } from "react-icons/ti";
import CopyContractModal from "../CopyContractModal";

const ContractDetailHeader = ({ contractData }) => {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const handleCopyContract = (event) => {
    event.preventDefault();

    setIsCopyModalOpen(true);
  };

  const handleDownload = (event) => {
    event.preventDefault(); // Prevent default if linked to an anchor tag
  };

  const handlePreview = (event) => {
    event.preventDefault();
  };

  const handleSignature = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">{contractData?.subject || "N/A"}</h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/contract">Contract</Link>
                </li>
                <li className="breadcrumb-item active">Contract Detail</li>
              </ul>
            </div>
            <div className="col">
              <div className="float-end">
                <div className="d-flex">
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    title="Send Email"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MdMailOutline />
                  </Link>
                  <button
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    title="Duplicate"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopyContract(e);
                    }}
                  >
                    <TbCopy />
                  </button>

                  <Link
                    to="#"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    title="Download"
                    onClick={handleDownload}
                  >
                    <MdOutlineFileDownload />
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    title="Preview"
                    onClick={handlePreview}
                  >
                    <TiEyeOutline />
                  </Link>
                  <Link
                    to="#"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    title="Signature"
                    onClick={handleSignature}
                  >
                    <TbWritingSign />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCopyModalOpen && (
        <CopyContractModal
          contracts={contractData}
          onClose={() => setIsCopyModalOpen(false)}
        />
      )}
    </>
  );
};

export default ContractDetailHeader;

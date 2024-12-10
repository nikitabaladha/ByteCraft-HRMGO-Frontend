import React from "react";
import { Link } from "react-router-dom";
import { MdMailOutline } from "react-icons/md";
import { TbCopy } from "react-icons/tb";
import { MdOutlineFileDownload } from "react-icons/md";
import { TiEyeOutline } from "react-icons/ti";
import { TbWritingSign } from "react-icons/tb";
import { useState } from "react";
import CopyContractModal from "../CopyContractModal";

const ContractDetailHeader = ({ contractData }) => {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [selectedContracts, setSelectedContracts] = useState(null);

  const handleCopyContract = (contractData) => {
    setSelectedContracts(contractData);
    setIsCopyModalOpen(true);
  };
  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-auto">
              <div className="page-header-title">
                <h4 className="m-b-10">{contractData.subject || "N/A"} </h4>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/hrmgo/dashboard">Home</Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <Link to="/hrmgo/contract">Contract</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page" />
                Contract Detail
              </ul>
            </div>
            <div className="col">
              <div className="float-end ">
                <div className="col-md-12 text-end d-flex ">
                  <Link
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-original-title="Send Email"
                  >
                    <MdMailOutline className="text-white" />
                  </Link>
                  <Link
                    data-size="lg"
                    data-ajax-popup="true"
                    data-title="Duplicate"
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    data-bs-original-title="Duplicate"
                    aria-label="Duplicate"
                    onClick={() => handleCopyContract(contractData)}
                  >
                    <TbCopy className="text-white" />
                  </Link>
                  <Link
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title=""
                    target="_blanks"
                    data-bs-original-title="Download"
                    aria-label="Download"
                  >
                    <MdOutlineFileDownload className="text-white" />
                  </Link>
                  <Link
                    target="_blank"
                    className="btn btn-sm btn-primary btn-iconn m-2"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Preview"
                  >
                    <i className="ti ti-eye" />

                    <TiEyeOutline />
                  </Link>
                  <Link
                    className="btn btn-sm btn-primary btn-icon m-2"
                    data-url="https://demo.workdo.io/hrmgo/signature/1"
                    data-ajax-popup="true"
                    data-title="Signature"
                    data-size="md"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-original-title="Signature"
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
          contractData={selectedContracts}
          onClose={() => setIsCopyModalOpen(false)}
        />
      )}
    </>
  );
};

export default ContractDetailHeader;

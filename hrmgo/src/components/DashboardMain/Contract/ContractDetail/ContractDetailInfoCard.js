import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { LuMousePointerClick } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa";
const ContractDetailInfoCard = ({
  commentCount,
  noteCount,
  attachmentCount,
}) => {
  return (
    <>
      {" "}
      <div className="col-xl-7" id="general">
        <div className="row">
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-primary">
                  <LuUserPlus />
                </div>
                <h6 className="mb-3 mt-4">Attachment</h6>
                <h3 className="mb-0">{attachmentCount}</h3>
                <h3 className="mb-0" />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-info">
                  <LuMousePointerClick />
                </div>
                <h6 className="mb-3 mt-4">Comment</h6>
                <h3 className="mb-0">{commentCount}</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="card">
              <div className="card-body" style={{ minHeight: 205 }}>
                <div className="badge theme-avtar bg-warning">
                  <FaRegFile />
                </div>
                <h6 className="mb-3 mt-4 ">Notes</h6>
                <h3 className="mb-0">{noteCount}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetailInfoCard;

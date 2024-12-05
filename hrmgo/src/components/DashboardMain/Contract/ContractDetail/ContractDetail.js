import React from "react";
import ContractDetailHeader from "./ContractDetailHeader";
import ContractDetailSidebar from "./ContractDetailSidebar";
import ContractDetailInfoCard from "./ContractDetailInfoCard";
import ContractDetailCard from "./ContractDetailCard";
import ContractDetailDescription from "./ContractDetailDescription";
import ContractDetailAttachment from "./ContractDetailAttachment";
import ContractDetailComment from "./ContractDetailComment";
import ContractDetailNotes from "./ContractDetailNotes";

const ContractDetail = () => {
  return (
    <>
      <ContractDetailHeader />
      <div className="row">
        <div className="">
          <div className="col-xl-12">
            <div className="col-sm-12">
              <div className="row">
                {/* Sidebar */}
                <ContractDetailSidebar />
                <div className="col-xl-9">
                  <div id="general">
                    <div className="row">
                      {/* cards */}
                      <ContractDetailInfoCard />
                      {/* contract detail */}
                      <ContractDetailCard />
                    </div>

                    {/* Description */}
                    <ContractDetailDescription />
                  </div>

                  {/* Attachment */}
                  <ContractDetailAttachment />

                  {/* Comment */}
                  <ContractDetailComment />

                  {/* Notes */}
                  <ContractDetailNotes />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetail;

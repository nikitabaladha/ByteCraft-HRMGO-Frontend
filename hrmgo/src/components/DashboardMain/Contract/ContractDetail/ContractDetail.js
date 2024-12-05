import React from "react";
import ContractDetailHeader from "./ContractDetailHeader";
import ContractDetailSidebar from "./ContractDetailSidebar";
import ContractDetailInfoCard from "./ContractDetailInfoCard";
import ContractDetailCard from "./ContractDetailCard";
import ContractDetailDescription from "./ContractDetailDescription";
import ContractDetailAttachment from "./ContractDetailAttachment";
import ContractDetailComment from "./ContractDetailComment";
import ContractDetailNotes from "./ContractDetailNotes";
import { useLocation, useParams } from "react-router-dom";

const ContractDetail = ({ contract }) => {
  const location = useLocation();
  const { id } = useParams();

  // Use `contract` from props or fallback to state if available
  const contractData = contract || location.state;

  if (!contractData) {
    return <p>Loading contract details...</p>;
  }

  return (
    <>
      {" "}
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

                      {/* I want to pass contract data in contract detail card */}
                      <ContractDetailCard contractData={contractData} />
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

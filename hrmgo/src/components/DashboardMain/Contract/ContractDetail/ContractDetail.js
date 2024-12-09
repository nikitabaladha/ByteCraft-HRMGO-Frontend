import React, { useState, useEffect } from "react";
import ContractDetailHeader from "./ContractDetailHeader";
import ContractDetailSidebar from "./ContractDetailSidebar";
import ContractDetailInfoCard from "./ContractDetailInfoCard";
import ContractDetailCard from "./ContractDetailCard";
import ContractDetailDescription from "./ContractDetailDescription";
import ContractDetailAttachment from "./ContractDetailAttachment";
import ContractDetailComment from "./ContractDetailComment";
import ContractDetailNotes from "./ContractDetailNotes";
import { useLocation, useParams } from "react-router-dom";
import getAPI from "../../../../api/getAPI";

const ContractDetail = ({ contract }) => {
  const location = useLocation();
  const { id } = useParams();

  const contractData = contract || location.state;

  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState([]);

  // Fetch contract comments
  const fetchContractCommentData = async () => {
    try {
      const response = await getAPI(
        `/contract-comment?contractId=${id}`,
        {},
        true,
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setComments(response.data.data);
        console.log("Contract comments:", response.data.data);
      } else {
        console.error(
          "Invalid response format or error in response for comments",
          response
        );
      }
    } catch (err) {
      console.error("Error fetching Contract comment Data:", err);
    }
  };

  // Fetch contract notes
  const fetchContractNoteData = async () => {
    try {
      const response = await getAPI(
        `/contract-note?contractId=${id}`,
        {},
        true,
        true
      );

      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setNotes(response.data.data);
        console.log("Contract notes:", response.data.data);
      } else {
        console.error(
          "Invalid response format or error in response for notes",
          response
        );
      }
    } catch (err) {
      console.error("Error fetching Contract note Data:", err);
    }
  };

  // Use effects to fetch data when component mounts
  useEffect(() => {
    fetchContractCommentData();
    fetchContractNoteData();
  }, [id]);

  if (!contractData) {
    return <p>Loading contract details...</p>;
  }

  return (
    <>
      <ContractDetailHeader contractData={contractData} />
      <div className="row">
        <div className="col-xl-12">
          <div className="col-sm-12">
            <div className="row">
              {/* Sidebar */}
              <ContractDetailSidebar />
              <div className="col-xl-9">
                <div id="general">
                  <div className="row">
                    {/* cards */}
                    <ContractDetailInfoCard
                      commentCount={comments.length}
                      noteCount={notes.length}
                    />
                    {/* contract detail */}
                    <ContractDetailCard contractData={contractData} />
                  </div>

                  {/* Description */}
                  <ContractDetailDescription contractData={contractData} />
                </div>
                {/* Attachment */}
                <ContractDetailAttachment />
                {/* Comment */}
                <ContractDetailComment
                  comments={comments}
                  setComments={setComments}
                />
                {/* Notes */}
                <ContractDetailNotes notes={notes} setNotes={setNotes} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetail;

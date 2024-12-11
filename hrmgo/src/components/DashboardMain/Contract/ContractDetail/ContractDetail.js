import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import getAPI from "../../../../api/getAPI";
import ContractDetailHeader from "./ContractDetailHeader";
import ContractDetailInfoCard from "./ContractDetailInfoCard";
import ContractDetailCard from "./ContractDetailCard";
import ContractDetailDescription from "./ContractDetailDescription";
import ContractDetailAttachment from "./ContractDetailAttachment";
import ContractDetailComment from "./ContractDetailComment";
import ContractDetailNotes from "./ContractDetailNotes";
import ContractDetailSidebar from "./ContractDetailSidebar";

const ContractDetail = ({ contract }) => {
  const location = useLocation();
  const { id } = useParams();

  const contractData = contract || location.state;

  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState([]);

  const fetchContractAttachmentData = async () => {
    try {
      const response = await getAPI(
        `/contract-attachment?contractId=${id}`,
        {},
        true,
        true
      );
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setAttachments(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching Contract attachment Data:", err);
    }
  };

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
      }
    } catch (err) {
      console.error("Error fetching Contract comment Data:", err);
    }
  };

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
      }
    } catch (err) {
      console.error("Error fetching Contract note Data:", err);
    }
  };

  useEffect(() => {
    fetchContractCommentData();
    fetchContractNoteData();
    fetchContractAttachmentData();
  }, [id]);

  const handleScrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
              {/* Sidebar section */}

              <ContractDetailSidebar
                handleScrollToSection={handleScrollToSection}
              />

              {/* Main content section */}
              <div className="col-xl-9">
                <div id="general">
                  <div className="row">
                    <ContractDetailInfoCard
                      commentCount={comments.length}
                      noteCount={notes.length}
                      attachmentCount={attachments.length}
                    />
                    <ContractDetailCard contractData={contractData} />
                  </div>
                  <ContractDetailDescription contractData={contractData} />
                </div>
                {/* i want attachment count but its  */}
                <ContractDetailAttachment
                  attachments={attachments}
                  setAttachments={setAttachments}
                  sectionId="attachments"
                />
                <ContractDetailComment
                  comments={comments}
                  setComments={setComments}
                  sectionId="comments"
                />
                <ContractDetailNotes
                  notes={notes}
                  setNotes={setNotes}
                  sectionId="notes"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetail;

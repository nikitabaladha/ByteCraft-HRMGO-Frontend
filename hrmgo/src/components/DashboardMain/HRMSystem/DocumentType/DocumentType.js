import React from "react";
import DocumentTypeHeader from "./DocumentTypeHeader"; 
import DocumentTypeTable from "./DocumentTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [documentTypes, setDocumentTypes] = useState([]);

      const fetchDocumentTypes = async () => {
        try {
          const response = await getAPI("/document-type-get-all", true);
          if (!response.hasError) {
            setDocumentTypes(response.data.data);
           
          } else {
            toast.error(`Failed to fetch document types: ${response.message}`);
          }
        } catch (error) {
          toast.error("An error occurred while fetching document types.");
        }
      };

      useEffect(() => {
  
      fetchDocumentTypes();
    }, []);
  return (
    <>
      <DocumentTypeHeader fetchDocumentTypes={fetchDocumentTypes}/>
      <DocumentTypeTable documentTypes={documentTypes} setDocumentTypes={setDocumentTypes} fetchDocumentTypes={fetchDocumentTypes}/>
    </>
  );
};

export default HRMSystem;

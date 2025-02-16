import React from "react";
import ContractTypeHeader from "./ContractTypeHeader";
import ContractTypeTable from "./ContractTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
  const [contractTypes, setContractTypes] = useState([]);

 
    const fetchContractTypes = async () => {
      try {
        const response = await getAPI("/contract-type-get-all", true);
        if (!response.hasError) {
          setContractTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch contract types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching contract types.");
      }
    };

    useEffect(() => {

    fetchContractTypes();
  }, []);
  return (
    <>
      <ContractTypeHeader fetchContractTypes={fetchContractTypes}/>
      <ContractTypeTable contractTypes={contractTypes} setContractTypes={setContractTypes} fetchContractTypes={fetchContractTypes}/>
    </>
  );
};

export default HRMSystem;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContractHeader from "./ContractHeader";
import ContractReport from "./ContractReport";
import ContractTable from "./ContractTable";
import getAPI from "../../../api/getAPI";

import ContractDetail from "./ContractDetail/ContractDetail";

const Contract = () => {
  const { id } = useParams();
  const [contracts, setContracts] = useState([]);

  const fetchContractData = async () => {
    try {
      const response = await getAPI(`/contract`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setContracts(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Contract Data:", err);
    }
  };

  useEffect(() => {
    fetchContractData();
  }, []);

  // Find the contract details for the current ID (if available)
  const selectedContract = id
    ? contracts.find((contract) => contract.id === parseInt(id))
    : null;

  return (
    <>
      {id ? ( // If there's an ID in the route, render the detail component
        <ContractDetail contract={selectedContract} />
      ) : (
        <>
          <ContractHeader />
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <ContractReport />
                <ContractTable
                  contracts={contracts}
                  fetchContractData={fetchContractData}
                  setContracts={setContracts}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Contract;

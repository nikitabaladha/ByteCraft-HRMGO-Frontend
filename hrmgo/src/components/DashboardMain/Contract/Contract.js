import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ContractHeader from "./ContractHeader";
import ContractReport from "./ContractReport";
import ContractTable from "./ContractTable";
import getAPI from "../../../api/getAPI";

import ContractDetail from "./ContractDetail/ContractDetail";

const Contract = () => {
  const location = useLocation();
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

  // Check
  const isContractViewRoute =
    location.pathname === "/dashboard/contract/contract-detail";

  return (
    <>
      {isContractViewRoute ? (
        <ContractDetail />
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
                />
              </div>
            </div>
          </div>
          />
        </>
      )}
    </>
  );
};

export default Contract;

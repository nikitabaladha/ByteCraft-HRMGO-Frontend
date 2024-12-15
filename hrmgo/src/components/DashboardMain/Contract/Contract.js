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
  const [totalValue, setTotalValue] = useState(0);
  const [totalValueOfThisMonth, setTotalValueOfThisMonth] = useState(0);
  const [totalValueOfThisWeek, setTotalValueOfThisWeek] = useState(0);
  const [last30DaysValue, setLast30DaysValue] = useState(0);

  const fetchContractData = async () => {
    try {
      const response = await getAPI(`/contract`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setContracts(response.data.data);
        setTotalValue(response.data.totalValue);
        setTotalValueOfThisMonth(response.data.totalValueOfThisMonth);
        setTotalValueOfThisWeek(response.data.totalValueOfThisWeek);
        setLast30DaysValue(response.data.last30DaysValue);
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

  const addContract = (newContract) => {
    setContracts((prevContracts) => [...prevContracts, newContract]);
  };

  const updateContract = (newUpdatedContract) => {
    setContracts((prevContracts) =>
      prevContracts.map((contract) =>
        contract.id === newUpdatedContract.id ? newUpdatedContract : contract
      )
    );
  };

  const selectedContract = id
    ? contracts.find((contract) => contract.id === parseInt(id))
    : null;

  return (
    <>
      {id ? (
        <ContractDetail contract={selectedContract} />
      ) : (
        <>
          <ContractHeader addContract={addContract} />
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                <ContractReport
                  totalValue={totalValue}
                  totalValueOfThisMonth={totalValueOfThisMonth}
                  totalValueOfThisWeek={totalValueOfThisWeek}
                  last30DaysValue={last30DaysValue}
                />
                <ContractTable
                  contracts={contracts}
                  fetchContractData={fetchContractData}
                  setContracts={setContracts}
                  updateContract={updateContract}
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

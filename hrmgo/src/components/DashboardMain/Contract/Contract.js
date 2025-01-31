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
  const [selectedContract, setSelectedContract] = useState(null);
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
    if (newContract.contracts) setContracts(newContract.contracts);
    setTotalValue(newContract.totalValue);
    setTotalValueOfThisMonth(newContract.totalValueOfThisMonth);
    setTotalValueOfThisWeek(newContract.totalValueOfThisWeek);
    setLast30DaysValue(newContract.last30DaysValue);
  };

  const copyContract = (newContract) => {
    if (newContract.contracts) setContracts(newContract.contracts);
    setTotalValue(newContract.totalValue);
    setTotalValueOfThisMonth(newContract.totalValueOfThisMonth);
    setTotalValueOfThisWeek(newContract.totalValueOfThisWeek);
    setLast30DaysValue(newContract.last30DaysValue);
  };

  const updateContract = (newUpdatedContract) => {
    if (newUpdatedContract.contract) setContracts(newUpdatedContract.contract);
    setTotalValue(newUpdatedContract.totalValue);
    setTotalValueOfThisMonth(newUpdatedContract.totalValueOfThisMonth);
    setTotalValueOfThisWeek(newUpdatedContract.totalValueOfThisWeek);
    setLast30DaysValue(newUpdatedContract.last30DaysValue);
  };

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
                  selectedContract={selectedContract}
                  setSelectedContract={setSelectedContract}
                  setContracts={setContracts}
                  updateContract={updateContract}
                  addContract={addContract}
                  copyContract={copyContract}
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

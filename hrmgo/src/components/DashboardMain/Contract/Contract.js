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
        console.log("total value", response.data.totalValue);
        console.log(
          "total value of this month",
          response.data.totalValueOfThisMonth
        );
        console.log(
          "total value of this week",
          response.data.totalValueOfThisWeek
        );
        console.log(
          "total value of last 30 days",
          response.data.last30DaysValue
        );
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
      {id ? (
        <ContractDetail contract={selectedContract} />
      ) : (
        <>
          <ContractHeader />
          <div className="row">
            <div className="col-xl-12">
              <div className="row">
                {/* i want to pass totalValue, totalValueOfThisMonth, totalValueOfThisWeek, And totalValue ofLast30 days to contractReport */}
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

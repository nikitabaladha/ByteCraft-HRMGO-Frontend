import React from "react";
import PayersHeader from "./PayersHeader";
import PayersTable from "./PayersTable";
import getAPI from "../../../../api/getAPI";
// import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

const Payers = () => {
  const [payers, setPayers] = useState([]);

      const fetchPayers = async () => {
        try {
          const response = await getAPI(`/getall_Payer`, {}, true);
          setPayers(response.data.data);
        } catch (err) {
          console.log("Failed to fetch payers");
        }
      };
  
      useEffect(() => {
      fetchPayers();
    }, []);

  return (
    <>
      <PayersHeader fetchPayers={fetchPayers}/>
      <PayersTable payers={payers} setPayers={setPayers} fetchPayers={fetchPayers}/>
    </>
  );
};

export default Payers;

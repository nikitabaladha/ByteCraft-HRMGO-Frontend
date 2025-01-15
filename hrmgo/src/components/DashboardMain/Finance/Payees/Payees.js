import React, { useEffect, useState } from "react"
import PayeesHeader from "./PayeesHeader";
import PayeesTable from "./PayeesTable";
import getAPI  from "../../../../api/getAPI";


const Payees = () => {
  const [payees, setPayees] = useState([]);
  
    const fetchPayees = async () => {
      try {
        const response = await getAPI(`/getall_Payee`, {}, true);
        setPayees(response.data.data);
      } catch (err) {
        console.log("Failed to fetch payees");
      }
    };

    useEffect(() => {
    fetchPayees();
  }, []);
  return (
    <>

      <PayeesHeader fetchPayees={fetchPayees}  />
      <PayeesTable payees={payees} setPayees={setPayees} fetchPayees={fetchPayees}  />
 
    </>
  );
};

export default Payees;
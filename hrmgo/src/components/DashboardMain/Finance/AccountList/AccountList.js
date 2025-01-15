import React, { useEffect, useState } from "react";
import AccountListHeader from "./AccountListHeader";
import AccountListTable from "./AccountListTable";
import getAPI  from "../../../../api/getAPI";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);

  
    const fetchAccounts = async () => {
      try {
        const response = await getAPI(`/AccountList-get-all`, {}, true);
        setAccounts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch accounts.", error);
      }
    };
    useEffect(() => {   
    fetchAccounts();
  }, []);


  return (
    <>
      <AccountListHeader    fetchAccounts={fetchAccounts}   />
      <AccountListTable accounts={accounts} setAccounts={setAccounts} fetchAccounts={fetchAccounts} />
    </>
  );
};

export default AccountList;

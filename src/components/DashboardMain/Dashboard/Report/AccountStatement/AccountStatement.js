//components/DashboardMain/Report/IncomeVsExpense/IncomeVsExpense.js

import React from "react";
import AccountStatementHeader from "./AccountStatementHeader";
import AccountStatementSearchForm from "./AccountStatementSearchForm";
import AccountStatementReport from "./AccountStatementReport";
import AccountStatementTable from "./AccountStatementTable";

const AccountStatement = () => {
  return (
    <>
      <AccountStatementHeader />
      <div class="row">
        <AccountStatementSearchForm />
        <AccountStatementReport />
        <AccountStatementTable />
      </div>
    </>
  );
};

export default AccountStatement;

import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { TbRefresh } from "react-icons/tb";
import getAPI from "../../../../../api/getAPI";
import { toast } from "react-toastify";

const AccountStatementSearchForm = ({
  onSearch,
  onReset,
  startMonth,
  endMonth,
  accountName,
  type,
}) => {
  const [accounts, setAccounts] = useState([]);
  const [localStartMonth, setLocalStartMonth] = useState(startMonth || "");
  const [localEndMonth, setLocalEndMonth] = useState(endMonth || "");
  const [localAccountName, setLocalAccountName] = useState(accountName || "");
  const [localType, setLocalType] = useState(type || "income");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAPI(`/acoountname-get-all`, {}, true);
        setAccounts(response.data.data);
      } catch (err) {
        console.error(err);
        console.log("Failed to fetch accounts.");
      }
    };

    fetchAccounts();

    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    if (!startMonth) setLocalStartMonth(currentMonth);
    if (!endMonth) setLocalEndMonth(currentMonth);
  }, [startMonth, endMonth]);

  const handleSearch = async () => {
    if (!localStartMonth || !localEndMonth) {
      toast.error("Please select both start and end months.");
      return;
    }

    onSearch(localStartMonth, localEndMonth, localAccountName, localType);
  };

  const handleReset = () => {
    const now = new Date();
    const currentMonth = now.toISOString().slice(0, 7);
    onReset();
    setLocalStartMonth(currentMonth);
    setLocalEndMonth(currentMonth);
    setLocalAccountName("");
    setLocalType("income");
  };

  return (
    <div className="col-sm-12 col-lg-12 col-xl-12 col-md-12">
      <div className="mt-2">
        <div className="card">
          <div className="card-body">
            <form method="GET" acceptCharset="UTF-8" id="report_acc_filter">
              <div className="d-flex align-items-center justify-content-end">
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 month">
                  <div className="btn-box">
                    <label htmlFor="start_month" className="form-label">
                      Start Month
                    </label>
                    <input
                      className="month-btn form-control"
                      name="start_month"
                      type="month"
                      value={localStartMonth}
                      onChange={(e) => setLocalStartMonth(e.target.value)}
                      id="start_month"
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2 month">
                  <div className="btn-box">
                    <label htmlFor="end_month" className="form-label">
                      End Month
                    </label>
                    <input
                      className="month-btn form-control"
                      name="end_month"
                      type="month"
                      value={localEndMonth}
                      onChange={(e) => setLocalEndMonth(e.target.value)}
                      id="end_month"
                    />
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <div className="btn-box">
                    <label htmlFor="account" className="form-label">
                      Account
                    </label>
                    <select
                      className="form-control select"
                      id="account"
                      value={localAccountName}
                      onChange={(e) => setLocalAccountName(e.target.value)}
                    >
                      <option value="">All</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.account_name}>
                          {account.account_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 col-12 mx-2">
                  <div className="btn-box">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <select
                      className="form-control select"
                      id="type"
                      value={localType}
                      onChange={(e) => setLocalType(e.target.value)}
                    >
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
                <div className="col-auto float-end ms-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    onClick={handleSearch}
                  >
                    <span className="btn-inner--icon">
                      <IoIosSearch />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleReset}
                  >
                    <span className="btn-inner--icon">
                      <TbRefresh className="text-white-off" />
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountStatementSearchForm;

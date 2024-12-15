import React from "react";

const data = [
  { account: "Benjamin Adams", date: "Oct 28, 2023", amount: "$1,000.00" },
  { account: "Benjamin Adams", date: "Sep 26, 2023", amount: "$500.00" },
  { account: "Chisom Latifat", date: "Dec 12, 2023", amount: "$12,000.00" },
  { account: "Earl Hane MD", date: "Nov 10, 2022", amount: "$500.00" },
  { account: "Benjamin Adams", date: "Sep 25, 2024", amount: "$100.00" },
];

const AccountStatementTable = () => {
  return (
    <>
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header card-body table-border-style">
            <div className="table-responsive">
              <table className="table" id="pc-dt-simple">
                <thead>
                  <tr>
                    <th>Account</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.account}</td>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatementTable;

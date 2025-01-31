// components/DashboardMain/Overview/Overview.js

import React from "react";

const SetSalaryHeader = () => {
  return (
    <>
      <div class="page-header">
        <div class="page-block">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="page-header-title">
                <h4 class="m-b-10">Manage Employee Salary</h4>
              </div>
              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="https://demo.workdo.io/hrmgo/dashboard">Home</a>
                </li>
                <li class="breadcrumb-item">Employee Salary</li>
              </ul>
            </div>
            <div class="col">
              <div class="float-end "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetSalaryHeader;

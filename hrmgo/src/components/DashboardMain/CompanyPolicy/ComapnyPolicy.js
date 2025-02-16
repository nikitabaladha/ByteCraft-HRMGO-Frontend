// components/DashboardMain/Overview/Overview.js

import React from "react";
import CompanyPolicyHeader from "./CompanyPolicyHeader";
import CompanyPolicytable from "./ComapnyPolicyTable";
import getAPI from "../../../api/getAPI";
import { toast } from "react-toastify";
import {useEffect, useState } from "react";


const Event = () => {
  const [companyPolicies, setCompanyPolicies] = useState([]);

      const fetchCompanyPolicies = async () => {
        try {
          const response = await getAPI('/getallcompany_policy', {}, true);
          if (response.data && !response.data.hasError) {
            setCompanyPolicies(response.data.companyPolicies);
          } else {
            toast.error("Failed to fetch company policies.");
          }
        } catch (error) {
          console.error("Error fetching company policies:", error);
          toast.error("An error occurred while fetching company policies.");
        }
      };
  
      useEffect(() => {
      fetchCompanyPolicies();
    }, []);
  return (
    <>
      <CompanyPolicyHeader fetchCompanyPolicies={fetchCompanyPolicies} />
      <CompanyPolicytable companyPolicies={companyPolicies} setCompanyPolicies={setCompanyPolicies} fetchCompanyPolicies={fetchCompanyPolicies} />
    </>
  );
};

export default Event;

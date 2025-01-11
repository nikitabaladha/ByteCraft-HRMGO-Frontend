import React, { useEffect, useState } from "react";
import AppraisalHeader from "./AppraisalHeader";
import AppraisalTable from "./AppraisalTable";

import getAPI from "../../../../api/getAPI";
const Appraisal = () => {
  const [appraisals, setAppraisals] = useState([]);
  const [selectedAppraisal, setSelectedAppraisal] = useState(null);
  const fetchAppraisals = async () => {
    try {
      const response = await getAPI("/appraisal", {}, true);
      if (!response.hasError && Array.isArray(response.data.data)) {
        setAppraisals(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching Appraisal Data:", err);
    }
  };

  useEffect(() => {
    fetchAppraisals();
  }, []);

  const addAppraisal = (newAppraisal) => {
    setAppraisals((prevAppraisals) => [...prevAppraisals, newAppraisal]);
  };

  const updateAppraisal = (newUpdatedAppraisal) => {
    setAppraisals((prevAppraisals) =>
      prevAppraisals.map((appraisal) =>
        appraisal.id === newUpdatedAppraisal.id
          ? newUpdatedAppraisal
          : appraisal
      )
    );
  };

  return (
    <>
      <AppraisalHeader addAppraisal={addAppraisal} />

      <AppraisalTable
        appraisals={appraisals}
        setAppraisals={setAppraisals}
        selectedAppraisal={selectedAppraisal}
        setSelectedAppraisal={setSelectedAppraisal}
        updateAppraisal={updateAppraisal}
      />
    </>
  );
};

export default Appraisal;

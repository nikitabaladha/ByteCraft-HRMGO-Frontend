import React from "react";
import ComplaintHeader from "./ComplaintHeader";
import ComplaintTable from "./ComplaintTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Complaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await getAPI(`/complaint`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setComplaints(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Complaint Data:", err);
      }
    };

    fetchComplaintData();
  }, []);

  return (
    <>
      <ComplaintHeader />
      <ComplaintTable
        complaints={complaints}
        selectedComplaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
        setComplaints={setComplaints}
      />
    </>
  );
};

export default Complaint;

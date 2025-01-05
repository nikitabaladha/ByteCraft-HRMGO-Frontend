import React from "react";
import ResignationHeader from "./ResignationHeader";
import ResignationTable from "./ResignationTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Resignation = () => {
  const [resignations, setResignations] = useState([]);
  const [selectedResignation, setSelectedResignation] = useState(null);

  useEffect(() => {
    const fetchResignationData = async () => {
      try {
        const response = await getAPI(`/resignation`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setResignations(response.data.data);

          console.log(
            "Resignation Data fetched successfully",
            response.data.data
          );
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Resignation Data:", err);
      }
    };

    fetchResignationData();
  }, []);

  const addResignation = (newResignation) => {
    setResignations((prevResignations) => [
      ...prevResignations,
      newResignation,
    ]);
  };

  const updateResignation = (newUpdatedResignation) => {
    setResignations((prevResignations) =>
      prevResignations.map((resignation) =>
        resignation.id === newUpdatedResignation.id
          ? newUpdatedResignation
          : resignation
      )
    );
  };

  return (
    <>
      <ResignationHeader addResignation={addResignation} />

      <ResignationTable
        resignations={resignations}
        setResignations={setResignations}
        selectedResignation={selectedResignation}
        setSelectedResignation={setSelectedResignation}
        updateResignation={updateResignation}
      />
    </>
  );
};

export default Resignation;

// import React from "react";
// import AwardHeader from "./AwardHeader";
// import AwardTable from "./AwardTable";
// import getAPI from "../../../../api/getAPI";
// import { useState, useEffect } from "react";

// const Award = () => {
//   const [awards, setAwards] = useState([]);
//   const [selectedAward, setSelectedAward] = useState(null);

//   useEffect(() => {
//     const fetchAwardData = async () => {
//       try {
//         const response = await getAPI(`/award`, {}, true);
//         if (
//           !response.hasError &&
//           response.data &&
//           Array.isArray(response.data.data)
//         ) {
//           setAwards(response.data.data);
//           console.log("Award Data fetched successfully", response.data.data);
//         } else {
//           console.error("Invalid response format or error in response");
//         }
//       } catch (err) {
//         console.error("Error fetching Award Data:", err);
//       }
//     };

//     fetchAwardData();
//   }, []);

//   const addAward = (newAward) => {
//     setAwards((prevAwards) => [...prevAwards, newAward]);
//   };

//   const updateAward = (newUpdatedAward) => {
//     setAwards((prevAwards) =>
//       prevAwards.map((award) =>
//         award.id === newUpdatedAward.id ? newUpdatedAward : award
//       )
//     );
//   };

//   return (
//     <>
//       <AwardHeader addAward={addAward} />

//       <AwardTable
//         awards={awards}
//         setAwards={setAwards}
//         selectedAward={selectedAward}
//         setSelectedAward={setSelectedAward}
//         updateAward={updateAward}
//       />
//     </>
//   );
// };

// export default Award;

import React, { useState, useEffect } from "react";
import AwardHeader from "./AwardHeader";
import AwardTable from "./AwardTable";
import getAPI from "../../../../api/getAPI";

const Award = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    const fetchAwardData = async () => {
      try {
        const response = await getAPI(`/award`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setAwards(response.data.data);
          console.log("Award Data fetched successfully", response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Award Data:", err);
      }
    };

    fetchAwardData(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  const addAward = (newAward) => {
    setAwards((prevAwards) => [...prevAwards, newAward]); // Add the new award to the state
  };

  const updateAward = (newUpdatedAward) => {
    setAwards((prevAwards) =>
      prevAwards.map((award) =>
        award.id === newUpdatedAward.id ? newUpdatedAward : award
      )
    ); // Update the award in the state
  };

  return (
    <>
      <AwardHeader addAward={addAward} />
      <AwardTable
        awards={awards}
        setAwards={setAwards}
        selectedAward={selectedAward}
        setSelectedAward={setSelectedAward}
        updateAward={updateAward}
      />
    </>
  );
};

export default Award;

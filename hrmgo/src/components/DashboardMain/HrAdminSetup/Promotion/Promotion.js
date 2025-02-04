import React from "react";
import PromotionHeader from "./PromotionHeader";
import PromotionTable from "./PromotionTable";
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from "react";

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  useEffect(() => {
    const fetchPromotionData = async () => {
      try {
        const response = await getAPI(`/promotion`, {}, true);
        if (
          !response.hasError &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setPromotions(response.data.data);
        } else {
          console.error("Invalid response format or error in response");
        }
      } catch (err) {
        console.error("Error fetching Promotion Data:", err);
      }
    };

    fetchPromotionData();
  }, []);

  const addPromotion = (newPromotion) => {
    setPromotions((prevPromotions) => [...prevPromotions, newPromotion]);
  };

  const updatePromotion = (newUpdatedPromotion) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((promotion) =>
        promotion.id === newUpdatedPromotion.id
          ? newUpdatedPromotion
          : promotion
      )
    );
  };

  return (
    <>
      <PromotionHeader addPromotion={addPromotion} />

      <PromotionTable
        promotions={promotions}
        setPromotions={setPromotions}
        selectedPromotion={selectedPromotion}
        setSelectedPromotion={setSelectedPromotion}
        updatePromotion={updatePromotion}
      />
    </>
  );
};

export default Promotion;

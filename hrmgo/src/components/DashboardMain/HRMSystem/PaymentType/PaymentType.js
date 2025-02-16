import React from "react";
import PaymentTypeHeader from "./PaymentTypeHeader";
import PaymentTypeTable from "./PaymentTypeTable";
import getAPI from "../../../../api/getAPI";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const HRMSystem = () => {
   const [paymentTypes, setPaymentTypes] = useState([]);

    const fetchPaymentTypes = async () => {
      try {
        const response = await getAPI("/payment-type-get-all", true);
        if (!response.hasError) {
          setPaymentTypes(response.data.data);
        } else {
          toast.error(`Failed to fetch payment types: ${response.message}`);
        }
      } catch (error) {
        toast.error("An error occurred while fetching payment types.");
      }
    };

    useEffect(() => {
    fetchPaymentTypes();
  }, []);

  return (
    <>
      <PaymentTypeHeader fetchPaymentTypes={fetchPaymentTypes} />
      <PaymentTypeTable paymentTypes={paymentTypes} setPaymentTypes={setPaymentTypes} fetchPaymentTypes={fetchPaymentTypes}  />
    </>
  );
};

export default HRMSystem;

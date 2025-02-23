// components/DashboardMain/Overview/Overview.js

import React from "react";
import TicketHeader from "./TicketHeader";
import TicketTable from "./TicketTable";
import { useState, useEffect } from "react";
import getAPI from "../../../api/getAPI";

const Ticket = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [chartSeries, setChartSeries] = useState([0, 0, 0]); 
    const [chartOptions, setChartOptions] = useState({
      chart: {
        type: "donut", // Change from 'pie' to 'donut'
      },
      labels: ["Open", "On Hold", "Closed"],
      responsive: [
        {
          breakpoint: 400,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      plotOptions: {
        pie: {
          donut: {
            size: '70%', // Adjust the size of the donut (ring) here
          },
        },
      },
      dataLabels: {
        enabled: false,  // Disable data labels to prevent showing percentages
      },
  
      colors: ["#6ED943", "#FFA21D", "#FF3A6E"],
  
    });
  

  const updateChartData = (tickets) => {
    const open = tickets.filter((ticket) => ticket.status === "open").length;
    const onHold = tickets.filter((ticket) => ticket.status === "onhold").length;
    const close = tickets.filter((ticket) => ticket.status === "close").length;
    setChartSeries([open, onHold, close]);

   
    setChartOptions(prevOptions => ({
      ...prevOptions,
      labels: ["open", "onhold", "close"], 
    }));
  };

  
      // Fetch ticket data on component mount
      const fetchTickets = async () => {
        try {
          const response = await getAPI("/ticket-getall", {}, true); 
          setTickets(response.data.tickets); 
          setLoading(false); 
          updateChartData(response.data.tickets);
        } catch (err) {
          setError("Failed to fetch tickets"); 
          setLoading(false);
        }
      };
      useEffect(() => { 
      fetchTickets(); 
    }); 
  
  return (
    <>
      <TicketHeader />
      <TicketTable tickets={tickets} setTickets={setTickets} loading={loading} error={error} setLoading={setLoading} setError={setError} chartSeries={chartSeries} setChartSeries={setChartSeries} chartOptions={chartOptions} setChartOptions={setChartOptions}/>
    </>
  );
};

export default Ticket;

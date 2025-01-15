import React from 'react'
import TrainerHeader from './TrainerHeader'
import TrainerTable from './TrainerTable'
import getAPI from "../../../../api/getAPI";
import { useState, useEffect } from 'react';

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const response = await getAPI(`/trainee-get-all`, {}, true);
      setTrainers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch Trainers.", error);
    }
  };
  useEffect(() => {   
  fetchTrainers();
}, []);
  return (
    <div>
      <TrainerHeader fetchTrainers={fetchTrainers}/>
      <TrainerTable trainers={trainers} setTrainers={setTrainers} fetchTrainers={fetchTrainers}/>
    </div>
  )
}

export default Trainer

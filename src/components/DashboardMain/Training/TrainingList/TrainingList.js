import React from 'react'
import TrainingListHeader from './TrainingListHeader'
import TrainingListTable from './TrainingListTable'
import { useState, useEffect } from 'react'
import getAPI from '../../../../api/getAPI'

const TrainingList = () => {
  const [trainings, setTrainings] = useState([]);
  const fetchTrainings = async () => {
    try {
      const response = await getAPI(`/training-list-get-all`, {}, true);
      setTrainings(response.data.data);
    } catch (error) {
      console.error("Failed to fetch Trainings.", error);
    }
  };
  useEffect(() => {   
  fetchTrainings();
}, []);

  return (
    <div>
      <TrainingListHeader fetchTrainings={fetchTrainings}/>
      <TrainingListTable trainings={trainings} setTrainings={setTrainings} fetchTrainings={fetchTrainings}/>
    </div>
  )
}

export default TrainingList

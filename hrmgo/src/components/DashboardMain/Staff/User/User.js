import React from 'react'
import UserHeader from './UserHeader'
import UserMainContent from './UserMainContent'
import { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI";

const User = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getAPI(`/get-all-users`, {}, true);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch Trainers.", error);
    }
  };
  useEffect(() => {   
  fetchUsers();
}, []);
  return (
    <div>
      <UserHeader fetchUsers={fetchUsers}/>
      <UserMainContent users={users} setUsers={setUsers} fetchUsers={fetchUsers}/>
    </div>
  )
}

export default User

import React from "react";
import RoleHeader from "./RoleHeader";
import RoleMainContent from "./RoleMainContent";
import { useEffect, useState } from "react";
import getAPI from "../../../../api/getAPI";

const StaffRole = () => {
  const [roles, setRoles] = useState([]);

  const fetchRoles = async () => {
    try {
      const response = await getAPI(`/get-all-roles`, {}, true);
      setRoles(response.data.data);
    } catch (error) {
      console.error("Failed to fetch Roles.", error);
    }
  };
  useEffect(() => {   
  fetchRoles();
}, []);

  return (
    <div>
      <RoleHeader fetchRoles={fetchRoles} />
      <RoleMainContent
        roles={roles}
        setRoles={setRoles}
        fetchRoles={fetchRoles}
      />
    </div>
  );
};

export default StaffRole;

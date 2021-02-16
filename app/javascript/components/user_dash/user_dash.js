import React, { useState, useEffect } from "react";
import Loading from "../loading";
import OrganizationsList from "./organizationsList";
import ProjectsList from "./projectsList";
import { useUserDashContext } from "./user_dash_context";
import { useGlobalContext } from "../app_context";

function UserDash() {
  const [loading, setLoading] = useState(true);
  const { uid } = useGlobalContext();
  const { setPositions, setProjects } = useUserDashContext();

  function userContentUrl(uid) {
    return `/dashboard/${uid}/main_content`;
  }

  async function fetchUserContent() {
    setLoading(true);
    try {
      const response = await fetch(userContentUrl(uid));
      const data = await response.json();
      setPositions(data.positions);
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUserContent();
  }, []);

  if (loading) {
    return (
      <div className="container text-white">
        <h1 className="title">My Dashboard</h1>
        <hr />
        {loading && <Loading />}
      </div>
    );
  } else {
    return (
      <div className="container text-white">
        <h1 className="title">My Dashboard</h1>
        <hr />
        <OrganizationsList />
        <ProjectsList />
      </div>
    );
  }
}

export default UserDash;

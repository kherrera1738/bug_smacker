import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import OrganizationsList from "./OrganizationsList";
import ProjectsList from "./ProjectsList";
import { useUserDashContext } from "./UserDashContext";
import { useGlobalContext } from "../AppContext";

function UserDash() {
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useGlobalContext();
  const { setPositions, setProjects } = useUserDashContext();

  function userContentUrl(uid) {
    return `/dashboard/${uid}/main_content`;
  }

  async function fetchUserContent() {
    setIsLoading(true);
    try {
      const response = await fetch(userContentUrl(uid));
      const data = await response.json();
      setPositions(data.positions);
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUserContent();
  }, []);

  return (
    <div className="container text-white">
      <h1 className="title">My Dashboard</h1>
      <hr />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <OrganizationsList />
          <ProjectsList />
        </div>
      )}
    </div>
  );
}

export default UserDash;
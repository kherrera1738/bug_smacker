import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import { useGlobalContext } from "../AppContext";
import ContentSection from "./ContentSection";

function UserDash() {
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useGlobalContext();
  const [projects, setProjects] = useState([]);
  const [positions, setPositions] = useState([]);
  const orgNameBar = useRef(null);

  function userContentUrl(uid) {
    return `/dashboard/${uid}/main_content`;
  }

  // Routine to add a new organization to user
  async function addOrg(e) {
    e.preventDefault();
    const orgName = orgNameBar.current.value;
    if (orgName) {
      const createUrl = "/organizations.json";
      const data = {
        name: orgName,
        owner_id: uid,
      };
      const requestObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(createUrl, requestObject);
        const newPosition = await response.json();
        setPositions([...positions, newPosition]);
      } catch (error) {
        console.log(error);
      }
    }
    orgNameBar.current.value = "";
  }

  // Get content for main dashboard
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
    <>
      <div className="container text-white">
        <h1 className="title">My Dashboard</h1>
        <hr />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ContentSection
          positions={positions}
          orgNameBar={orgNameBar}
          addOrg={addOrg}
          projects={projects}
        />
      )}
    </>
  );
}

export default UserDash;

import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import ProjectsSection from "./ProjectsSection";
import ProjNavBar from "./ProjNavBar";
import { useGlobalContext } from "../AppContext";

function ProjectDash({ pID, projName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projInfo, setProjInfo] = useState(null);
  const { trialMode } = useGlobalContext();

  // Get content from differet url if this is a trial page
  function orgContentUrl(pID) {
    return trialMode
      ? `/trials/project/content/${pID}`
      : `/projects/${pID}.json`;
  }

  // Get project content
  async function fetchProjContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(pID));
      const projInfo = await response.json();
      if (trialMode) {
        projInfo.tickets.forEach((ticket) => {
          ticket.url = ticket.url.replace("dashboard", "trials");
        });
      }
      setProjInfo(projInfo);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProjContent();
  }, []);

  return (
    <>
      <div className="container text-white">
        <h1 className="title">{projName}</h1>
        <hr />
        {!isLoading && (
          <ProjNavBar {...projInfo} pID={pID} trialMode={trialMode} />
        )}
      </div>
      {isLoading ? <Loading /> : <ProjectsSection {...projInfo} />}
    </>
  );
}

export default ProjectDash;

import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import StatsDashboard from "./StatsDashboard";
import OrgNavBar from "./OrgNavBar";
import ProjectsSection from "./ProjectsSection";
import { useGlobalContext } from "../AppContext";

function OrganizationDash({ orgID, orgName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [orgData, setOrgData] = useState(null);
  const projNameBar = useRef(null);
  const descriptionArea = useRef(null);
  const { uid, trialMode } = useGlobalContext();

  function orgContentUrl(orgID) {
    return `/organizations/${orgID}.json`;
  }

  // Routine to add a new project to data base and update projects table
  async function addProj(e) {
    e.preventDefault();
    const projName = projNameBar.current.value;
    const description = descriptionArea.current.value;
    if (orgID && projName && description) {
      const projectUrl = "/projects.json";
      const data = {
        name: projName,
        organization_id: orgID,
        description: description,
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
        if (trialMode) {
          var newProject = {
            name: projName,
            url: "",
          };
        } else {
          const response = await fetch(projectUrl, requestObject);
          var newProject = await response.json();
        }
        setOrgData({ ...orgData, projects: [...orgData.projects, newProject] });
      } catch (error) {
        console.log(error);
      }
    }
    projNameBar.current.value = "";
    descriptionArea.current.value = "";
  }

  // Fetch initial organization data
  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const orgData = await response.json();
      if (trialMode) {
        orgData.projects.forEach((project) => {
          project.url = project.url.replace("dashboard", "trials");
        });
      }
      setOrgData(orgData);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrgContent();
  }, []);

  return (
    <>
      <div className="container text-white">
        <h1 className="title">{orgName}</h1>
        <hr />
        {!isLoading && (
          <OrgNavBar
            trialMode={trialMode}
            editUrl={orgData.editUrl}
            rolesUrl={orgData.rolesUrl}
            uid={uid}
          />
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <StatsDashboard {...orgData.info} />
          <ProjectsSection
            orgData={orgData}
            projNameBar={projNameBar}
            descriptionArea={descriptionArea}
            addProj={addProj}
          />
        </div>
      )}
    </>
  );
}

export default OrganizationDash;

import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import StatsDashboard from "../StatsDashboard";
import ProjectsList from "../ProjectsList";

function OrganizationDash({ orgID, orgName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [orgInfo, setOrgInfo] = useState(null);

  function orgContentUrl(orgID) {
    return `/organizations/${orgID}.json`;
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const { info, projects } = await response.json();
      setOrgInfo(info);
      setProjects(projects);
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
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <StatsDashboard {...orgInfo} />
            <div className="row justify-content-center">
              <div className="text-white col-12 col-xl-10 col-xxl-8 mb-4">
                <ProjectsList projects={projects} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrganizationDash;

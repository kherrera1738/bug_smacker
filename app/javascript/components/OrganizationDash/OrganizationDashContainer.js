import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import StatsDashboard from "../StatsDashboard";
import SearchTable from "../SearchTable";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function OrganizationDash({ orgID, orgName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [orgInfo, setOrgInfo] = useState(null);
  const [rolesUrl, setRolesUrl] = useState("");
  const projectHeaders = [
    { name: "Name", val: "name" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Project" },
  ];

  function orgContentUrl(orgID) {
    return `/organizations/${orgID}.json`;
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const { info, projects, manageRolesUrl } = await response.json();
      setOrgInfo(info);
      setProjects(projects);
      setRolesUrl(manageRolesUrl);
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
          <ul className="nav">
            <li className="nav-item fs-4">
              <a href={rolesUrl} className="nav-link">
                <AiOutlineUsergroupAdd className="fs-2" />
                Manage User Roles
              </a>
            </li>
          </ul>
        )}

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
                {/* <ProjectsList projects={projects} /> */}
                <SearchTable
                  rows={projects}
                  headers={projectHeaders}
                  pageSize={5}
                  title={"Projects"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrganizationDash;

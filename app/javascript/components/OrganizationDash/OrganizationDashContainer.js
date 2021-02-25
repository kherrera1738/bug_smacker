import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import StatsDashboard from "../StatsDashboard";
import SearchTable from "../SearchTable";
import AddProjForm from "./AddProjForm";
import { useGlobalContext } from "../AppContext";
import { AiOutlineUsergroupAdd, AiOutlineEdit } from "react-icons/ai";

function OrganizationDash({ orgID, orgName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [orgInfo, setOrgInfo] = useState(null);
  const [rolesUrl, setRolesUrl] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const projNameBar = useRef(null);
  const descriptionArea = useRef(null);
  const { uid } = useGlobalContext();
  const projectHeaders = [
    { name: "Name", val: "name" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Project" },
  ];

  function orgContentUrl(orgID) {
    return `/organizations/${orgID}.json`;
  }

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
        const response = await fetch(projectUrl, requestObject);
        const newProject = await response.json();
        setProjects([...projects, newProject]);
      } catch (error) {
        console.log(error);
      }
    }
    projNameBar.current.value = "";
    descriptionArea.current.value = "";
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const { info, projects, manageRolesUrl, editUrl } = await response.json();
      setOrgInfo(info);
      setProjects(projects);
      setRolesUrl(manageRolesUrl);
      setEditUrl(editUrl);
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
          <>
            <ul className="nav">
              <li className="nav-item fs-4">
                <a href={rolesUrl} className="nav-link">
                  <AiOutlineUsergroupAdd className="fs-2" />
                  Manage User Roles
                </a>
              </li>
              <li className="nav-item fs-4">
                <a href={editUrl} className="nav-link">
                  <AiOutlineEdit className="fs-2" />
                  Edit Oganization Details
                </a>
              </li>
              <li className="nav-item fs-4">
                <a href={`/dashboard/${uid}`} className="nav-link">
                  Back To Main Dashboard
                </a>
              </li>
            </ul>
            <hr />
          </>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <StatsDashboard {...orgInfo} />
            <div className="row justify-content-center text-white mb-5">
              <div className="col-12 col-xl-7 col-xxl-5 mb-4">
                <SearchTable
                  rows={projects}
                  headers={projectHeaders}
                  pageSize={5}
                  title={"Projects"}
                />
              </div>
              <div className="col-12 col-xl-3">
                <AddProjForm
                  projNameBar={projNameBar}
                  descriptionArea={descriptionArea}
                  addProj={addProj}
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

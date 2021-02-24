import React, { useState, useEffect } from "react";
import Loading from "../Loading";
// import OrganizationsList from "../OrganizationsList";
// import ProjectsList from "../ProjectsList";
import { useGlobalContext } from "../AppContext";
import SearchTable from "../SearchTable";

function UserDash() {
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useGlobalContext();
  const [projects, setProjects] = useState([]);
  const [positions, setPositions] = useState([]);
  const projectHeaders = [
    { name: "Name", val: "name" },
    { name: "Organization", val: "organization" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Project" },
  ];
  const organizationHeaders = [
    { name: "Name", val: "organization" },
    { name: "Role", val: "role" },
    { name: "Owned", val: "owned" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Organization" },
  ];

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
          <div className="mb-5">
            <SearchTable
              rows={positions}
              headers={organizationHeaders}
              pageSize={5}
              title={"Organizations"}
            />
          </div>
          <div>
            <SearchTable
              rows={projects}
              headers={projectHeaders}
              pageSize={5}
              title={"Projects"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDash;

import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import { useGlobalContext } from "../AppContext";
import SearchTable from "../SearchTable";
import AddOrgForm from "./AddOrgForm";

function UserDash() {
  const [isLoading, setIsLoading] = useState(true);
  const { uid } = useGlobalContext();
  const [projects, setProjects] = useState([]);
  const [positions, setPositions] = useState([]);
  const orgNameBar = useRef(null);
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
        <div className="container-fluid">
          <div className="row justify-content-center text-white">
            <div className="col-12 col-xl-8 col-xxl-6 mb-5">
              <SearchTable
                rows={positions}
                headers={organizationHeaders}
                pageSize={5}
                title={"Organizations"}
              />
            </div>
            <div className="col-12 col-xl-2 mb-3">
              <AddOrgForm orgNameBar={orgNameBar} addOrg={addOrg} />
            </div>
          </div>
          <div className="row justify-content-center text-white">
            <div className="col-12 col-xl-10 col-xxl-8">
              <SearchTable
                rows={projects}
                headers={projectHeaders}
                pageSize={5}
                title={"Projects"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDash;

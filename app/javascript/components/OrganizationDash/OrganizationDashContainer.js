import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import Priorities from "./Priorities";
import TicketTypes from "./TicketTypes";
import Statuses from "./Statuses";
import Assigned from "./Assigned";
import ProjectsList from "./ProjectsList";
import { useOrganizationDashContext } from "./OrganizationDashContext";

function OrganizationDash() {
  const [isLoading, setIsLoading] = useState(true);

  const {
    orgID,
    orgName,
    setPriorities,
    setStatuses,
    setTicketTypes,
    setAssigned,
    setProjects,
  } = useOrganizationDashContext();

  function orgContentUrl(orgID) {
    return `/organizations/${orgID}.json`;
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const { orgInfo, projects } = await response.json();
      console.log(orgInfo);
      console.log(projects);
      setPriorities(orgInfo.priorities);
      setAssigned(orgInfo.assigned);
      setStatuses(orgInfo.statuses);
      setTicketTypes(orgInfo.types);
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
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Priorities />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <TicketTypes />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Statuses />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Assigned />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="text-white col-12 col-xl-10 col-xxl-8 mb-4">
                <ProjectsList />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default OrganizationDash;

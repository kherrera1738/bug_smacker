import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import SearchTable from "../SearchTable";
import { useGlobalContext } from "../AppContext";
import {
  AiOutlineUsergroupAdd,
  AiOutlineEdit,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

function ProjectDash({ pID, projName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [teamMembers, setTeamMembers] = useState(null);
  const [description, setDescription] = useState("");
  const [teamUrl, setTeamUrl] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [addTicketUrl, setAddTicketUrl] = useState("");
  const { trialMode } = useGlobalContext();
  const ticketHeaders = [
    { name: "Title", val: "title" },
    { name: "Priority", val: "priority" },
    { name: "Status", val: "status" },
    { name: "Type", val: "type" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Ticket" },
  ];
  const roleHeaders = [
    { name: "Name", val: "name" },
    { name: "Email", val: "email" },
    { name: "Role", val: "role" },
  ];

  function orgContentUrl(pID) {
    return trialMode
      ? `/trials/project/content/${pID}`
      : `/projects/${pID}.json`;
  }

  async function fetchProjContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(pID));
      const {
        tickets,
        description,
        teamMembers,
        manageTeamUrl,
        organizationUrl,
        editUrl,
        addTicketUrl,
      } = await response.json();
      if (trialMode) {
        tickets.forEach((ticket) => {
          ticket.url = ticket.url.replace("dashboard", "trials");
        });
      }

      setTeamMembers(teamMembers);
      setTickets(tickets);
      setDescription(description);
      setTeamUrl(manageTeamUrl);
      setOrgUrl(organizationUrl);
      setEditUrl(editUrl);
      setAddTicketUrl(addTicketUrl);
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
          <>
            <ul className="nav">
              <li className="nav-item fs-4">
                <a
                  href={
                    trialMode ? `/trials/project/manage_team/${pID}` : teamUrl
                  }
                  className="nav-link"
                >
                  <AiOutlineUsergroupAdd className="fs-2" />
                  Manage Team
                </a>
              </li>
              <li className="nav-item fs-4">
                <a
                  href={trialMode ? `/trials/edit_project/${pID}` : editUrl}
                  className="nav-link"
                >
                  <AiOutlineEdit className="fs-2" />
                  Edit Project Details
                </a>
              </li>
              <li className="nav-item fs-4">
                <a
                  href={
                    trialMode
                      ? `/trials/project/${pID}/add_ticket`
                      : addTicketUrl
                  }
                  className="nav-link"
                >
                  <AiOutlineAppstoreAdd className="fs-2" />
                  Add Ticket
                </a>
              </li>
              <li className="nav-item fs-4">
                <a
                  href={trialMode ? "/trials/organization" : orgUrl}
                  className="nav-link"
                >
                  Back To Organization
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
          <div className="container-fluid">
            <div className="row text-white justify-content-center">
              <div className="col-12 col-xl-10 col-xxl-8 mb-4">
                <div className="ticket-card">
                  <div className="px-4 py-3 ticket-card-body">
                    <h3>Project Description</h3>
                    <hr />
                    <p className="fs-4 px-1 py-2">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row justify-content-center text-white">
              <div className="col-12 col-lg-7 col-xl-7 col-xxl-5 mb-4">
                <SearchTable
                  rows={tickets}
                  headers={ticketHeaders}
                  pageSize={10}
                  title={"Tickets"}
                />
              </div>
              <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 mb-4">
                <SearchTable
                  rows={teamMembers}
                  headers={roleHeaders}
                  pageSize={10}
                  title={"Team Members"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectDash;

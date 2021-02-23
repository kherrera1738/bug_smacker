import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import TicketsList from "../TicketsList";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

function ProjectDash({ pID, projName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [teamMembers, setTeamMembers] = useState(null);
  const [description, setDescription] = useState("");
  const [teamUrl, setTeamUrl] = useState("");

  function orgContentUrl(pID) {
    return `/projects/${pID}.json`;
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
      } = await response.json();
      console.log(teamMembers);
      setTeamMembers(teamMembers);
      setTickets(tickets);
      setDescription(description);
      setTeamUrl(manageTeamUrl);
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
          <ul className="nav">
            <li className="nav-item fs-4">
              <a href={teamUrl} className="nav-link">
                <AiOutlineUsergroupAdd className="fs-2" />
                Manage Team
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
          <div className="container-fluid">
            <div className="row text-white justify-content-center">
              <div className="col-12 col-xl-10 col-xxl-8 mb-4">
                <div className="ticket-card">
                  <div className="px-4 py-3 ticket-card-body">
                    <h3>Ticket Description</h3>
                    <hr />
                    <p className="fs-4 px-1 py-2">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-7 col-xl-7 col-xxl-5 mb-4">
                <TicketsList tickets={tickets} />
              </div>
              <div className="col-12 col-lg-4 col-xl-3 col-xxl-3 mb-4">
                <table className="table table-hover table-dark fs-3">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member, index) => {
                      return (
                        <tr key={index}>
                          <td className="fs-4">{member.name}</td>
                          <td className="fs-4">{member.email}</td>
                          <td className="fs-4">{member.role}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProjectDash;

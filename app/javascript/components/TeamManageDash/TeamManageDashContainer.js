import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import TeamMemberForm from "./TeamMemberForm";
import SearchTable from "../SearchTable";

function RoleManageDash({ projID, orgID, trialMode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [positions, setPositions] = useState([]);
  const userBar = useRef(null);
  const rolesHeaders = [
    { name: "Name", val: "name" },
    { name: "Role", val: "role" },
  ];

  // Get team member/positions content from different url is this is a trial page
  function teamMembersUrl(projID) {
    return trialMode
      ? `/trials/project/manage_team/${projID}/team_members`
      : `/team_members/project/${projID}`;
  }

  function positionsUrl(orgID) {
    return trialMode
      ? `/trials/project/manage_team/${orgID}/positions`
      : `/positions/organization/${orgID}`;
  }

  // Routine to add member to project
  async function addMember(e) {
    e.preventDefault();
    const uid = parseInt(userBar.current.value);
    if (projID && uid) {
      // Change url if this is a trial page so changes do not save
      const teamUrl = trialMode
        ? "/trials/team_members.json"
        : "/team_members.json";
      const data = {
        user_id: uid,
        project_id: projID,
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
        const response = await fetch(teamUrl, requestObject);
        const newTeamMember = await response.json();
        setTeamMembers([...teamMembers, newTeamMember]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      // Get current team members
      var response = await fetch(teamMembersUrl(projID));
      const currentTeamMembers = await response.json();
      setTeamMembers(currentTeamMembers);

      // Get all positions
      response = await fetch(positionsUrl(orgID));
      const positions = await response.json();
      setPositions(positions);
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
        <h1 className="title">Manage Team Members</h1>
        <hr />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row text-white justify-content-center">
              <div className="col-12 col-lg-5 col-xl-4 col-xxl-3 mb-3 mr-5">
                <TeamMemberForm
                  positions={positions}
                  userBar={userBar}
                  addMember={addMember}
                />
              </div>
              <div className="col-12 col-lg-7 col-xl-6 col-xxl-5 my-5 ml-5">
                <SearchTable
                  rows={teamMembers}
                  headers={rolesHeaders}
                  pageSize={10}
                  title={"Project Roles"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RoleManageDash;

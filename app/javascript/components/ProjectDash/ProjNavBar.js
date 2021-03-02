import React from "react";
import {
  AiOutlineUsergroupAdd,
  AiOutlineEdit,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";

function ProjNavBar({
  pID,
  teamUrl,
  editUrl,
  addTicketUrl,
  orgUrl,
  trialMode,
}) {
  return (
    <>
      <ul className="nav">
        <li className="nav-item fs-4">
          <a
            href={trialMode ? `/trials/project/manage_team/${pID}` : teamUrl}
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
              trialMode ? `/trials/project/${pID}/add_ticket` : addTicketUrl
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
  );
}

export default ProjNavBar;

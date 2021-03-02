import React from "react";
import { AiOutlineEdit } from "react-icons/ai";

function TicketNavBar({ editUrl, projUrl, tid, pid, trialMode }) {
  return (
    <>
      <ul className="nav">
        <li className="nav-item fs-4">
          <a
            href={trialMode ? `/trials/ticket/${tid}/edit` : editUrl}
            className="nav-link"
          >
            <AiOutlineEdit className="fs-2" />
            Edit Ticket Details
          </a>
        </li>
        <li className="nav-item fs-4">
          <a
            href={trialMode ? `/trials/project/${pid}` : projUrl}
            className="nav-link"
          >
            Back To Project
          </a>
        </li>
      </ul>
      <hr />
    </>
  );
}

export default TicketNavBar;

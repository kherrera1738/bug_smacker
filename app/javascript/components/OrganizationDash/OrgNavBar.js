import React from "react";
import { AiOutlineUsergroupAdd, AiOutlineEdit } from "react-icons/ai";

function OrgNavBar({ rolesUrl, editUrl, uid, trialMode }) {
  return (
    <>
      <ul className="nav">
        <li className="nav-item fs-4">
          <a
            href={trialMode ? "/trials/manage_roles" : rolesUrl}
            className="nav-link"
          >
            <AiOutlineUsergroupAdd className="fs-2" />
            Manage User Roles
          </a>
        </li>
        <li className="nav-item fs-4">
          <a
            href={trialMode ? "/trials/edit_organization" : editUrl}
            className="nav-link"
          >
            <AiOutlineEdit className="fs-2" />
            Edit Oganization Details
          </a>
        </li>
        <li className="nav-item fs-4">
          {trialMode ? (
            <a href={"/pages/home"} className="nav-link">
              Back To Home
            </a>
          ) : (
            <a href={`/dashboard/${uid}`} className="nav-link">
              Back To Main Dashboard
            </a>
          )}
        </li>
      </ul>
      <hr />
    </>
  );
}

export default OrgNavBar;

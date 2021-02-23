import React from "react";

function TeamMember({ name, role }) {
  return (
    <>
      <tr>
        <td className="fs-4">{name}</td>
        <td className="fs-4">{role}</td>
      </tr>
    </>
  );
}

export default TeamMember;

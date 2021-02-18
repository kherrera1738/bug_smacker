import React from "react";

function Organization({ role, organization, url, owned }) {
  return (
    <tr>
      <td className="fs-4">
        <a href={url}>{organization}</a>
      </td>
      <td className="fs-4">{role}</td>
      <td className="fs-4">{owned.toString()}</td>
      <td className="fs-4">
        <a href={url}>View Organization</a>
      </td>
    </tr>
  );
}

export default Organization;

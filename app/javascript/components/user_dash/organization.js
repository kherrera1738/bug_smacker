import React from "react";

function Organization({ position }) {
  const { role, organization, url, owned } = position;
  return (
    <tr>
      <td>
        <a href={url}>{organization}</a>
      </td>
      <td>{role}</td>
      <td>{owned.toString()}</td>
    </tr>
  );
}

export default Organization;

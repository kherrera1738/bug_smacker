import React from "react";

function Project({ project }) {
  const { name, organization, url } = project;
  return (
    <tr>
      <td>
        <a href={url}>{name}</a>
      </td>
      <td>{organization}</td>
      <td>
        <a href={url}>View Project</a>
      </td>
    </tr>
  );
}

export default Project;

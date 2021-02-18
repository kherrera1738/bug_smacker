import React from "react";

function Project({ project }) {
  const { name, organization, url } = project;
  return (
    <tr>
      <td className="fs-4">
        <a href={url}>{name}</a>
      </td>
      <td className="fs-4">{organization}</td>
      <td className="fs-4">
        <a href={url}>View Project</a>
      </td>
    </tr>
  );
}

export default Project;

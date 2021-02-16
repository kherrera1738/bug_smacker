import React from "react";
import Project from "./Project";
import { useUserDashContext } from "./UserDashContext";

function ProjectsList() {
  const { projects } = useUserDashContext();
  return (
    <table className="table table-hover table-dark fs-3">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Organization</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project, index) => {
          return <Project project={project} key={index} />;
        })}
      </tbody>
    </table>
  );
}

export default ProjectsList;

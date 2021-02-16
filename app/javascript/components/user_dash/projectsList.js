import React from "react";
import Project from "./project";
import { useUserDashContext } from "./user_dash_context";

function ProjectsList() {
  const { projects } = useUserDashContext();
  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Organization</th>
          <th>Visit</th>
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

import React, { useState } from "react";
import ProjectDash from "./ProjectDashContainer";
import { AppProvider } from "../AppContext";
import { ProjectDashProvider } from "./ProjectDashContext";

function ProjectDashboard({ uid }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <ProjectDashProvider>
          <ProjectDash />
        </ProjectDashProvider>
      </AppProvider>
    </React.StrictMode>
  );
}

export default ProjectDashboard;

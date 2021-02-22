import React from "react";
import ProjectDash from "./ProjectDashContainer";
import { AppProvider } from "../AppContext";

function ProjectDashboard({ uid, pID, projName }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <ProjectDash pID={pID} projName={projName} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default ProjectDashboard;

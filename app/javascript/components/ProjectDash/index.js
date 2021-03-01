import React from "react";
import ProjectDash from "./ProjectDashContainer";
import { AppProvider } from "../AppContext";

function ProjectDashboard({ uid, pID, projName, trialMode = false }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid} trialMode={trialMode}>
        <ProjectDash pID={pID} projName={projName} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default ProjectDashboard;

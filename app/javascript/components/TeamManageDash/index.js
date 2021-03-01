import React from "react";
import { AppProvider } from "../AppContext";
import TeamManageDash from "./TeamManageDashContainer.js";

function TeamManageDashboard({ uid, projID, orgID, trialMode = false }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <TeamManageDash projID={projID} orgID={orgID} trialMode={trialMode} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default TeamManageDashboard;

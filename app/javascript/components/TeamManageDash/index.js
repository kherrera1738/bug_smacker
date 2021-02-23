import React from "react";
import { AppProvider } from "../AppContext";
import TeamManageDash from "./TeamManageDashContainer.js";

function TeamManageDashboard({ uid, projID, orgID }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <TeamManageDash projID={projID} orgID={orgID} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default TeamManageDashboard;

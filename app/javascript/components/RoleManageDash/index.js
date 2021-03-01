import React from "react";
import { AppProvider } from "../AppContext";
import RolesManageDash from "./RolesManageDashContainer";

function RoleManageDashboard({ uid, orgID, trialMode = false }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid} trialMode={trialMode}>
        <RolesManageDash orgID={orgID} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default RoleManageDashboard;

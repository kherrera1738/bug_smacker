import React from "react";
import OrganizationDash from "./OrganizationDashContainer";
import { AppProvider } from "../AppContext";

function OrganizationDashboard({ uid, orgID, orgName, trialMode = false }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid} trialMode={trialMode}>
        <OrganizationDash orgID={orgID} orgName={orgName} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default OrganizationDashboard;

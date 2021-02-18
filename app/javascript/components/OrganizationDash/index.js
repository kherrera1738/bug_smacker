import React from "react";
import OrganizationDash from "./OrganizationDashContainer";
import { AppProvider } from "../AppContext";

function OrganizationDashboard({ uid, orgID, orgName }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <OrganizationDash orgID={orgID} orgName={orgName} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default OrganizationDashboard;

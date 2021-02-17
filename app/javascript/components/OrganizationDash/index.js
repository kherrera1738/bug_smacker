import React, { useState } from "react";
import OrganizationDash from "./OrganizationDashContainer";
import { AppProvider } from "../AppContext";
import { OrganizationDashProvider } from "./OrganizationDashContext";

function OrganizationDashboard({ uid, orgID, orgName }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <OrganizationDashProvider orgID={orgID} orgName={orgName}>
          <OrganizationDash />
        </OrganizationDashProvider>
      </AppProvider>
    </React.StrictMode>
  );
}

export default OrganizationDashboard;

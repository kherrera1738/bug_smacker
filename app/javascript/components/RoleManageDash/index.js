import React from "react";
import { AppProvider } from "../AppContext";
import RolesManageDash from "./RolesManageDashContainer";

function RoleManageDashboard({ uid, orgID }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <RolesManageDash orgID={orgID} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default RoleManageDashboard;

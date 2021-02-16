import React from "react";
import UserDash from "./UserDashContainer";
import { AppProvider } from "../AppContext";
import { UserDashProvider } from "./UserDashContext";

function Dashboard({ uid }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <UserDashProvider>
          <UserDash />
        </UserDashProvider>
      </AppProvider>
    </React.StrictMode>
  );
}

export default Dashboard;

import React from "react";
import UserDash from "./UserDashContainer";
import { AppProvider } from "../AppContext";

function Dashboard({ uid }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <UserDash />
      </AppProvider>
    </React.StrictMode>
  );
}

export default Dashboard;

import React from "react";
import ReactDOM from "react-dom";
import UserDash from "../components/user_dash/user_dash";
import { AppProvider } from "../components/app_context";
import { UserDashProvider } from "../components/user_dash/user_dash_context";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  ReactDOM.render(
    <React.StrictMode>
      <AppProvider uid={main.dataset.id}>
        <UserDashProvider>
          <UserDash />
        </UserDashProvider>
      </AppProvider>
    </React.StrictMode>,
    main.appendChild(document.createElement("div"))
  );
});

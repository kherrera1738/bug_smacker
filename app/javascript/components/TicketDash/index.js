import React from "react";
import { AppProvider } from "../AppContext";
import TicketDash from "./TicketDashContainer";

function TicketDashboard({ uid, tid, ticketTitle }) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <TicketDash tid={tid} ticketTitle={ticketTitle} />
      </AppProvider>
    </React.StrictMode>
  );
}

export default TicketDashboard;

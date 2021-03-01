import React from "react";
import { AppProvider } from "../AppContext";
import TicketDash from "./TicketDashContainer";

function TicketDashboard({
  uid,
  tid,
  ticketTitle,
  trialMode = false,
  pid = null,
}) {
  return (
    <React.StrictMode>
      <AppProvider uid={uid}>
        <TicketDash
          tid={tid}
          ticketTitle={ticketTitle}
          trialMode={trialMode}
          pid={pid}
        />
      </AppProvider>
    </React.StrictMode>
  );
}

export default TicketDashboard;

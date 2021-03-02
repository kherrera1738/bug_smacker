import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import TicketNavBar from "./TicketNavBar";
import TicketSection from "./TicketSection";

function TicketDash({ tid, ticketTitle, trialMode, pid }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketInfo, setTicketInfo] = useState(null);

  // Change url if this is a trial page
  function ticketContentUrl(tid) {
    return trialMode
      ? `/trials/ticket/content/${tid}.json`
      : `/tickets/${tid}.json`;
  }

  // Routine to get ticket data
  async function fetchTicketContent() {
    setIsLoading(true);
    try {
      const response = await fetch(ticketContentUrl(tid));
      const data = await response.json();
      setTicketInfo(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTicketContent();
  }, []);

  return (
    <>
      <div className="container text-white">
        <h1 className="title">{ticketTitle}</h1>
        <hr />
        {!isLoading && (
          <TicketNavBar
            {...ticketInfo}
            tid={tid}
            pid={pid}
            trialMode={trialMode}
          />
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <TicketSection
          ticketInfo={ticketInfo}
          tid={tid}
          trialMode={trialMode}
        />
      )}
    </>
  );
}

export default TicketDash;

import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import TicketDetails from "../TicketDetails";
import CommentsSection from "../CommentsSection";
import HistorySection from "../HistorySection";

function TicketDash({ tid, ticketTitle }) {
  const [isLoading, setIsLoading] = useState(true);
  const [ticketInfo, setTicketInfo] = useState(null);

  function ticketContentUrl(tid) {
    return `/tickets/${tid}.json`;
  }

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
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container-fluid">
          <div className="row text-white justify-content-center">
            <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
              <TicketDetails {...ticketInfo}></TicketDetails>
            </div>
            <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
              <HistorySection histories={ticketInfo.histories} />
            </div>
          </div>
          <div className="row text-white justify-content-center">
            <div className="col-12 col-xl-10 col-xxl-8 mb-4">
              <CommentsSection comments={ticketInfo.comments} tid={tid} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketDash;

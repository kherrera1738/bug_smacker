import React from "react";
import TicketDetails from "./TicketDetails";
import CommentsSection from "./CommentsSection";
import SearchTable from "../SearchTable";

function TicketSection({ ticketInfo, tid, trialMode }) {
  const historyHeaders = [
    { name: "Property", val: "changeType" },
    { name: "Old Value", val: "oldVal" },
    { name: "New Value", val: "newVal" },
    { name: "Date Changed", val: "changeDate" },
  ];

  return (
    <div className="container-fluid">
      <div className="row text-white justify-content-center">
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <TicketDetails {...ticketInfo}></TicketDetails>
        </div>
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <SearchTable
            rows={ticketInfo.histories}
            headers={historyHeaders}
            pageSize={4}
            title={"Ticket History"}
          />
        </div>
      </div>
      <div className="row text-white justify-content-center">
        <div className="col-12 col-xl-10 col-xxl-8">
          <CommentsSection
            comments={ticketInfo.comments}
            tid={tid}
            trialMode={trialMode}
          />
        </div>
      </div>
    </div>
  );
}

export default TicketSection;

import React from "react";
import Ticket from "./Ticket";

function TicketsList({ tickets }) {
  return (
    <table className="table table-hover table-dark fs-3">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Priotity</th>
          <th scope="col">Status</th>
          <th scope="col">Type</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket, index) => {
          return <Ticket {...ticket} key={index} />;
        })}
      </tbody>
    </table>
  );
}

export default TicketsList;

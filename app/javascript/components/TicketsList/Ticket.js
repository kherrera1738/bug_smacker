import React from "react";

function Ticket({ title, priority, status, type, url }) {
  return (
    <tr>
      <td className="fs-4">
        <a href={url}>{title}</a>
      </td>
      <td className="fs-4">{priority}</td>
      <td className="fs-4">{status}</td>
      <td className="fs-4">{type}</td>
      <td className="fs-4">
        <a href={url}>View Ticket</a>
      </td>
    </tr>
  );
}

export default Ticket;

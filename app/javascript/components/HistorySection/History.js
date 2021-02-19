import React from "react";

function History({ changeType, oldVal, newVal, changeDate }) {
  return (
    <tr>
      <td className="fs-4">{changeType}</td>
      <td className="fs-4">{oldVal}</td>
      <td className="fs-4">{newVal}</td>
      <td className="fs-4">{changeDate}</td>
    </tr>
  );
}

export default History;

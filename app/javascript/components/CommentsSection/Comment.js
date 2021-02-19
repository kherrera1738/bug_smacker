import React from "react";

function Comment({ madeBy, content, createdAt }) {
  return (
    <tr>
      <td className="fs-4">{madeBy}</td>
      <td className="fs-4">{content}</td>
      <td className="fs-4">{createdAt}</td>
    </tr>
  );
}

export default Comment;

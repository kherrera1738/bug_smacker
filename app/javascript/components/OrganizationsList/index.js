import React from "react";
import Organization from "./Organization";

function OrganizationsList({ positions }) {
  return (
    <table className="table table-dark table-hover fs-3">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Owned</th>
          <th scope="col">View</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((position, index) => {
          return <Organization position={position} key={index} />;
        })}
      </tbody>
    </table>
  );
}

export default OrganizationsList;

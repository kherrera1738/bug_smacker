import React from "react";
import Organization from "./organization";
import { useUserDashContext } from "./user_dash_context";

function OrganizationsList() {
  const { positions } = useUserDashContext();

  return (
    <table className="table table-dark table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Owned</th>
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

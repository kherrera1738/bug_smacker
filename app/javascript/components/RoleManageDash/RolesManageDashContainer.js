import React, { useState, useEffect, useRef } from "react";
import Loading from "../Loading";
import PositionForm from "./PositionForm";
import PositionsList from "./PositionList";

function RoleManageDash({ orgID }) {
  const [isLoading, setIsLoading] = useState(true);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);
  const userBar = useRef(null);
  const roleBar = useRef(null);

  function positionsUrl(orgID) {
    return `/positions/organization/${orgID}`;
  }

  async function addRole(e) {
    e.preventDefault();
    const role = roleBar.current.value;
    const uid = parseInt(userBar.current.value);
    if (orgID && role && uid) {
      const posUrl = "/positions.json";
      const data = {
        role: role,
        filled_by_id: uid,
        organization_id: orgID,
      };
      const requestObject = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch(posUrl, requestObject);
        const newPosition = await response.json();
        setPositions([...positions, newPosition]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function fetchOrgContent() {
    setIsLoading(true);
    try {
      // Get current positions
      var response = await fetch(positionsUrl(orgID));
      const currentPositions = await response.json();
      setPositions(currentPositions);

      // Get all users
      response = await fetch("/users/all");
      const users = await response.json();
      setUsers(users);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchOrgContent();
  }, []);

  return (
    <>
      <div className="container text-white">
        <h1 className="title">Manage Roles</h1>
        <hr />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="container-fluid">
            <div className="row text-white justify-content-center">
              <div className="col-12 col-lg-5 col-xl-4 col-xxl-3 mb-3 mr-5">
                <PositionForm
                  users={users}
                  userBar={userBar}
                  roleBar={roleBar}
                  addRole={addRole}
                />
              </div>
              <div className="col-12 col-lg-7 col-xl-6 col-xxl-5 my-5 ml-5">
                <PositionsList positions={positions} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RoleManageDash;
import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import StatsDashboard from "../StatsDashboard";
import TicketsList from "../TicketsList";

function ProjectDash({ pID, projName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [projInfo, setProjInfo] = useState(null);

  function orgContentUrl(pID) {
    return `/projects/${pID}.json`;
  }

  async function fetchProjContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(pID));
      const { info, tickets } = await response.json();
      setProjInfo(info);
      setTickets(tickets);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProjContent();
  }, []);

  return (
    <>
      <div className="container text-white">
        <h1 className="title">{projName}</h1>
        <hr />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <StatsDashboard {...projInfo} />
            <div className="row justify-content-center">
              <div className="text-white col-12 col-xl-10 col-xxl-8 mb-4">
                <TicketsList tickets={tickets} />
              </div>
            </div>
          </div>
        </>
      )}
      {/* <Loading /> */}
    </>
  );
}

export default ProjectDash;

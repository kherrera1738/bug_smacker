import React, { useState, useEffect } from "react";
import Loading from "../Loading";

function ProjectDash({ projID, projName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [projInfo, setProjInfo] = useState(null);

  function orgContentUrl(prijID) {
    return `/projects/${projID}.json`;
  }

  async function fetchProjContent() {
    setIsLoading(true);
    try {
      const response = await fetch(orgContentUrl(orgID));
      const { info, tickets } = await response.json();
      console.log(info);
      console.log(tickets);
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
        <h1 className="title">ProjectName</h1>
        <hr />
      </div>
      {/* {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Priorities />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <TicketTypes />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Statuses />
              </div>
              <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
                <Assigned />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="text-white col-12 col-xl-10 col-xxl-8 mb-4">
                <ProjectsList />
              </div>
            </div>
          </div>
        </>
      )} */}
      <Loading />
    </>
  );
}

export default ProjectDash;

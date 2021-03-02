import React from "react";
import SearchTable from "../SearchTable";

function ProjectsSection({ description, tickets, teamMembers }) {
  const ticketHeaders = [
    { name: "Title", val: "title" },
    { name: "Priority", val: "priority" },
    { name: "Status", val: "status" },
    { name: "Type", val: "type" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Ticket" },
  ];
  const roleHeaders = [
    { name: "Name", val: "name" },
    { name: "Email", val: "email" },
    { name: "Role", val: "role" },
  ];

  return (
    <div className="container-fluid">
      <div className="row text-white justify-content-center">
        <div className="col-12 col-xl-10 col-xxl-8 mb-4 ticket-card">
          <div className="px-4 py-3 ticket-card-body">
            <h3>Project Description</h3>
            <hr />
            <p className="fs-4 px-1 py-2">{description}</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center text-white">
        <div className="col-12 col-lg-7 col-xl-6 col-xxl-5 mb-4">
          <SearchTable
            rows={tickets}
            headers={ticketHeaders}
            pageSize={10}
            title={"Tickets"}
          />
        </div>
        <div className="col-12 col-lg-4 col-xl-4 col-xxl-3 mb-4">
          <SearchTable
            rows={teamMembers}
            headers={roleHeaders}
            pageSize={10}
            title={"Team Members"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectsSection;

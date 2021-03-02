import React from "react";

function TicketDetails({
  title,
  created_at,
  description,
  assignedDev,
  submittedBy,
  priority,
  project,
  status,
  ticket_type,
  updated_at,
}) {
  return (
    <div className="ticket-card">
      <h1 className="px-3 py-3 my-0">Ticket Details</h1>
      <div className="px-4 py-3 ticket-card-body">
        <div className="row">
          <div className="col-6">
            <h3>Ticket Title</h3>
            <p className="fs-4 px-1 py-2">{title}</p>
          </div>
          <div className="col-6">
            <h3>Ticket Description</h3>
            <p className="fs-4 px-1 py-2">{description}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h3>Assigned Dev</h3>
            <p className="fs-4 px-1 py-2">{assignedDev}</p>
          </div>
          <div className="col-6">
            <h3>Submitter</h3>
            <p className="fs-4 px-1 py-2">{submittedBy}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h3>Project</h3>
            <p className="fs-4 px-1 py-2">{project}</p>
          </div>
          <div className="col-6">
            <h3>Priority</h3>
            <p className="fs-4 px-1 py-2">{priority}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h3>Status</h3>
            <p className="fs-4 px-1 py-2">{status}</p>
          </div>
          <div className="col-6">
            <h3>Type</h3>
            <p className="fs-4 px-1 py-2">{ticket_type}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h3>Created At</h3>
            <p className="fs-4 px-1 py-2">{created_at}</p>
          </div>
          <div className="col-6">
            <h3>Updated At</h3>
            <p className="fs-4 px-1 py-2">{updated_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;

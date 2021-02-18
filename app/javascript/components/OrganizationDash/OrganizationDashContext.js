import React, { useContext, useState } from "react";

const OrganizationDashContext = React.createContext();

const OrganizationDashProvider = ({ children, orgID, orgName }) => {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <OrganizationDashContext.Provider
      value={{
        orgID,
        orgName,
        priorities,
        setPriorities,
        statuses,
        setStatuses,
        ticketTypes,
        setTicketTypes,
        assigned,
        setAssigned,
        projects,
        setProjects,
      }}
    >
      {children}
    </OrganizationDashContext.Provider>
  );
};

export function useOrganizationDashContext() {
  return useContext(OrganizationDashContext);
}

export { OrganizationDashContext, OrganizationDashProvider };
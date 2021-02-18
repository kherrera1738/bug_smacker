import React, { useContext, useState } from "react";

const ProjectDashContext = React.createContext();

const ProjectDashProvider = ({ children }) => {
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <ProjectDashContext.Provider
      value={{
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
    </ProjectDashContext.Provider>
  );
};

export function useProjectDashContext() {
  return useContext(ProjectDashContext);
}

export { ProjectDashContext, ProjectDashProvider };

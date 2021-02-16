import React, { useContext, useState } from "react";

const UserDashContext = React.createContext();

const UserDashProvider = ({ children }) => {
  const [positions, setPositions] = useState([]);
  const [projects, setProjects] = useState([]);

  return (
    <UserDashContext.Provider
      value={{
        positions,
        setPositions,
        projects,
        setProjects,
      }}
    >
      {children}
    </UserDashContext.Provider>
  );
};

export function useUserDashContext() {
  return useContext(UserDashContext);
}

export { UserDashContext, UserDashProvider };

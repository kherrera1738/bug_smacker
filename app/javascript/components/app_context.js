import React, { useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children, uid }) => {
  return <AppContext.Provider value={{ uid }}>{children}</AppContext.Provider>;
};

export function useGlobalContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider };

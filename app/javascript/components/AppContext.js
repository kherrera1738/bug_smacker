import React, { useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children, uid, trialMode }) => {
  return (
    <AppContext.Provider value={{ uid, trialMode }}>
      {children}
    </AppContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(AppContext);
}

export { AppContext, AppProvider };

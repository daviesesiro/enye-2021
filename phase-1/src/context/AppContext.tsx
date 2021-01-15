import React, { useContext } from "react";
import { createContext } from "react";
import { useFetchProfiles } from "../utils/useFetchProfiles";
import { response } from "../types";

const AppContext = createContext<{
  isFetching?: boolean;
  data?: response | undefined;
  error?: any;
}>({ isFetching: true });

export const AppContextProvider: React.FC = ({ children }) => {
  //   const { data, isFetching, error } = useFetchProfiles();
  return (
    //   <AppContext.Provider value={{ data, isFetching, error }}>
    <AppContext.Provider value={{}}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

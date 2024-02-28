import { createContext, useEffect, useState } from "react";
import {makeRequest} from "../axios";
import {useQuery} from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await makeRequest.post("/auth/login",inputs);
      setCurrentUser(res.data);
    }catch (err){
      return err;
    }
  };


  return (
    <AuthContext.Provider value={{ currentUser, login, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

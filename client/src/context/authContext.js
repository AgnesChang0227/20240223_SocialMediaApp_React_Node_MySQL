import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {route} from "../routes/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    try {
      const res = await axios.post(route("/auth/login"), inputs, {
        //using cookie
        withCredentials: true
      });
      setCurrentUser(res.data)
    }catch (err){
      return err;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};

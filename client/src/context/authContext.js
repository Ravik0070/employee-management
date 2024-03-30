import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("employee") || null)
  );
  const login = async (inputs) => {
    try {
      const resp = await axios.post(
        "http://localhost:5000/api/auth/login",
        inputs
      );
      const { password, ...other } = resp.data;
      setCurrentUser(other);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
  const logout = async (inputs) => {
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("employee", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

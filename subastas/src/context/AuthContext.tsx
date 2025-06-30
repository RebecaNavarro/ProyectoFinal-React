import { createContext, useContext, useState, type ReactNode } from "react";
import { clearStorage, setStorage } from "../helpers/localStorage";
import type { User } from "../interfaces/userInterface";

interface AuthContextType {
  isAdmin: boolean;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = (user: User) => {
    setStorage("user", user);
    setStorage("token", user.token);
    setIsAdmin(user.role === "admin");
    setIsAuth(true);
  };

  const logout = () => {
    clearStorage();
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

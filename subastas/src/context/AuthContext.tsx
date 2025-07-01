import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAuthStore } from "../store/authStore";

interface AuthContextType {
  isAdmin: boolean;
  isAuth: boolean;
  login: (loginIsAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const {user, resetAuth} = useAuthStore( state => state)

  useEffect(() => {
    if(user && user.role)
      login(user.role === "admin")
  }, [user]);

  const login = (loginIsAdmin: boolean) => {
    setIsAuth(true);
    setIsAdmin(loginIsAdmin);
  };

  const logout = () => {
    resetAuth();
    setIsAdmin(false);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

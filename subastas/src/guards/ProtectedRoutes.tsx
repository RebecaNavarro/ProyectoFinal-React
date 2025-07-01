import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return <>{isAuth ? children : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
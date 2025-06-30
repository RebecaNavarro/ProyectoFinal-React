import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import ProtectedRoutes from "../guards/ProtectedRoutes";
import { Layout } from "../layout/Layout";
import { useAuth } from "../context/AuthContext";
import Auctions from "../pages/Auctions";
import UserManagement from "../pages/UserManagement";
import ProductsManagement from "../pages/ProductsManagement";

export const AppRoutes = () => {

    const { isAuth, isAdmin } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={ 
                        !isAuth ?
                        <Login /> : <Navigate to="/Auctions" replace={true} />
                    } />
                <Route
                    path="/"
                    element={
                        <ProtectedRoutes>
                            <Layout />
                        </ProtectedRoutes>
                    }
                >
                    <Route path="/Auctions" element={ isAuth ? <Auctions /> : <Navigate to="/" />} />
                    <Route path="/UserManagement" element={
                        isAuth &&isAdmin ?
                            <UserManagement /> : <Navigate to="/" />
                    } />
                    <Route path="/ProductsManagement" element={
                        isAuth && isAdmin ?
                            <ProductsManagement /> : <Navigate to="/" />
                    } />
                </Route>
            </Routes>

        </BrowserRouter>
    );
}
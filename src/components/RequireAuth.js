import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import CustomerDashboard from "./CustomerDashboard";
import ForgotPassword from "./ForgotPassword";
import NewSignUp from "./NewSignUp";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        allowedRoles?.includes(auth?.role) 
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/" state={{ from: location }} replace/>
                : <Navigate to="/" state={{ from: location }} replace/>
    );

}

export default RequireAuth;
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";

const ProtectedRoute = ({ children }) => {
    let { user } = useAuth();
    if(!user){
        return <Navigate to="/" />;
    }
    return (children);
}

export default ProtectedRoute;
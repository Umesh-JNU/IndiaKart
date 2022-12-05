import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  console.log("isAdmin", isAdmin);
  console.log("children", children);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (isAuthenticated === false || (isAdmin && user.role !== "admin"))
      return <Navigate to={"/login"} />;

    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;

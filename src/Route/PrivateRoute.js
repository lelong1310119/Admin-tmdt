import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("login");

  return <>{token === null ? <Navigate to="/login" /> : children}</>;
};

export default PrivateRoute;
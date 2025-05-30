import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const user = localStorage.getItem("token");

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

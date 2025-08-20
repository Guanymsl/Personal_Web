import * as React from "react";
import { Navigate } from "react-router-dom";

function isAuthed() {
  return Boolean(localStorage.getItem("authToken"));
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthed()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoute;

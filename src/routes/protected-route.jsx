import { useAuth } from "@/context/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}

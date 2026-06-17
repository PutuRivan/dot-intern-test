import { useAuth } from "@/context/auth-context";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
}

import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const result = logout();
    toast.success(result.message);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-5">
      <div>
        <h1 className="text-2xl font-bold">Quiz App</h1>
        <h3>Welcome Back, {user.username}</h3>
      </div>
      <Button size="lg" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}

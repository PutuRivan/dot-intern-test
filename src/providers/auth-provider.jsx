import { AuthContext } from "@/context/auth-context";
import { loginSchema } from "@/libs/schema";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/libs/utils";
import React, { useState } from "react";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = ({ username, password }) => {
    setIsLoading(true);
    try {
      const validate = loginSchema.safeParse({ username, password });
      if (!validate.success) {
        const message = validate.error.message || "Invalid Input";
        throw new Error(message);
      }

      const userData = validate.data;

      // Cek User di Local Storage
      const usersData = getLocalStorage("users");
      const users = usersData ? JSON.parse(usersData) : [];

      const existingUser = users.find((u) => u.username === userData.username);

      if (existingUser) {
        // User Sudah Ada (Login)
        if (existingUser.password !== userData.password) {
          return {
            success: false,
            message: "Password salah",
          };
        }

        setLocalStorage("user", JSON.stringify(existingUser));
        setUser(existingUser);
        return {
          success: true,
          message: "Login Berhasil",
        };
      } else {
        // User baru (Register)
        users.push(userData);
        setLocalStorage("users", JSON.stringify(users));
        setLocalStorage("user", JSON.stringify(userData));
        setUser(userData);

        return {
          success: true,
          message: "Register Berhasil",
        };
      }
    } catch (error) {
      console.error("Login Error : ", error);
      throw new Error("Invalid Login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeLocalStorage("user");
    return {
      success: true,
      message: "Berhasil Logout",
    };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

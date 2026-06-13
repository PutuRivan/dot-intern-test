import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/auth/login-page";
import HomePage from "@/pages/dashboard/home-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
]);
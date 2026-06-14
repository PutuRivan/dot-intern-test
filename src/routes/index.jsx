import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/auth/login-page";
import HomePage from "@/pages/dashboard/home-page";
import QuizPage from "@/pages/dashboard/quiz-page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/quiz",
        element: <QuizPage />,
    },
]);

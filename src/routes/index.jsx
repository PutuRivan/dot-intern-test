import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/auth/login-page";
import HomePage from "@/pages/dashboard/home-page";
import QuizPage from "@/pages/dashboard/quiz-page";
import ProtectedRoute from "./protected-route";
import ResultPage from "@/pages/dashboard/result-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/quiz",
        element: <QuizPage />,
      },
    ],
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
]);

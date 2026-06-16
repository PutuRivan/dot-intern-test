import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes";
import { RouterProvider } from "react-router";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "./providers/auth-provider";
import QuizProvider from "./providers/quiz-provider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QuizProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-center" />
      </QuizProvider>
    </AuthProvider>
  </StrictMode>,
);

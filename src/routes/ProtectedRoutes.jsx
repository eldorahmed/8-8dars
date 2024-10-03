import { ThemeProvider } from "@/components/theme-provider";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, admin }) {
  if (admin) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

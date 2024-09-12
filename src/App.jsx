import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import RootLayout from "./layouts/RootLayout";
const App = () => {
  const admin = false;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element:admin? <Home />:<Navigate to="/login"/>,
        },
      ],
    },
    {
      path: "/login",
      element:admin?<Navigate to="/"/> : <Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
};

export default App;

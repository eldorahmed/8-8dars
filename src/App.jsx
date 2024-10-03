import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Home from "./pages/Home";
import Mainlayout from "./layout/Mainlayout";
import { useAppStore } from "./lib/zustand";
import Statistics from "./pages/Statistics";
import Admins from "./pages/Admins";

export default function App() {
  const admin = useAppStore((state) => state.admin);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <Mainlayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "admins",
          element: <Admins />,
        },
      ],
    },
    {
      path: "/login",
      element: admin ? <Navigate to={"/"} /> : <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Health from "./pages/HealthCheck";
import "./app.css";
import NotFound from "./pages/NotFound";

// Define a NotFound component

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "health",
        element: <Health />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

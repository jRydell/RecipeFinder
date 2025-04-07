import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import "./App.css";
import NotFound from "./pages/NotFound";

import Login from "./pages/Login";
import Categories from "./pages/Categories";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./components/RecipeDetails";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";

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
        path: "recipe/:id",
        element: <RecipeDetails />,
      },

      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my-recipes",
        element: (
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import "./App.css";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import MyRecipes from "./pages/MyRecipes";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoutes";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Recipe from "./pages/Recipe";
import Layout from "./components/layout/Layout";
import Search from "./pages/Search";

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
        path: "recipe/:mealId",
        element: <Recipe />,
      },
      {
        path: "/search",
        element: <Search />,
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
      {
        path: "about",
        element: <About />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

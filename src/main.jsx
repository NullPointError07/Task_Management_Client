import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Pages
import Home from "./Components/Home.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import TaskDetails from "./Pages/TaskDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "dashboard/:id",
        element: <TaskDetails></TaskDetails>,
        loader: ({ params }) =>
          fetch(
            `https://task-manager-server-amber-six.vercel.app/dashboard/${params.id}`
          ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
